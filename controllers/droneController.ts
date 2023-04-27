import { log } from "console";
import { Request, Response } from "express"
import { Drone } from "../models/droneModel";
import { DroneState } from "../types/drone-states";
import { IDrone } from "../types/drone-structure";
import Dispatch from "../models/dispatchModel";
import { MedicationModel } from "../models/medicationModel";

interface DroneAddInterface {
    model:string, serial_number:string,
    weight_limit:number, battery_capacity:number,
    state:string
}

// drone controller class
export default class {
    // default get request
    getFunction = (req:Request, res:Response) : void => {
        res.json({"message": "OK"});
    }
    // adding drone to DB
     addDrone = async (req:Request, res:Response) : Promise<void> => { 
        // response from server checking if drone already exists
        var middleWareResponse = req.middleWareResponse;
        
        var body:DroneAddInterface = req.body;

        var model:string = body.model, serial_number = body.serial_number, state = body.state;
        var weight_limit:number = body.weight_limit, battery_capacity = body.battery_capacity; 
        
        // validating resul
        if (middleWareResponse.status) {
            res.status(403).json({
                "message": "A drone already exists with this serial number: " + serial_number
            });
        } else

        // ORM creating drone
        try {
            
            var action = await Drone.create({
                model: model, serialnumber: serial_number,
                state: DroneState.IDLE, weightLimit: weight_limit, 
                batteryCapacity: battery_capacity
            }); log(action)
    
            if (action) 
                res.status(200).json({
                    "message": "Drone added successfully"
                }); 
            else res.status(403).json({
                "message": "Unexpected error"
            });

        } catch (error) { log(error);   res.status(403).json({
            "message": "Unexpected error"
        }); }
    }
    // getting loaded drone goods info
    async getDroneLoadItems (req:Request, res:Response) : Promise<void> {
        try { 
            var body = req.body;
           
            if (req.middleWareResponse.status) { // drone found
                var drones:any = req.middleWareResponse.data; var result:any[] = [];
                for (const drone of drones) {
                    var serial_number: number = drone.serialnumber;
                    // get the load carried by a drone
                    const dispatch = await Dispatch.findOne({
                        where: {droneId: serial_number}
                    });
                    if (dispatch) { // successful dispatch
                        const loadId:number = dispatch.loadId;
                        // search for that particular load
                        const medication = await MedicationModel.findOne({
                            where: {id:loadId}
                        });
                        if (medication) {
                            result.push(medication)
                        } else {res.status(403).json({"message": "This drone is empty"}); return}
                    } else {res.status(403).json({"message": "This drone is idle, no load yet"}); return}
                }
                res.status(200).json({
                    "message": "Successful",
                    "data": result
                });
            } else { // drone missing
                res.status(404).json({"message": `No drone ${body.state} for now`});
            }
        } catch (error) { 
            log(error); res.status(500).json({"message": "Unexpected error"});
        }
    }
    // getting avaialble drones by state -> useful for getting IDLE, LOADING, LOADED drones
    async getDroneByState (req: Request, res: Response): Promise<void> {
        try {
            var body = req.body;
            if (req.middleWareResponse.status) { 
                res.status(200).json({
                    "message": "Successful",
                    "data": req.middleWareResponse.data
                }); return;
            } else { // drone missing
                res.status(404).json({"message": `No drone ${body.state} for now`});
            }
        } catch (error) {
            log(error); res.status(500).json({"message": "Unexpected error"});
        }
    }
    // get drone battery level 
    async getDroneBatteryLevel (req:Request, res: Response) : Promise<void> {
        try {
            if (req.middleWareResponse.status) {
                var data : IDrone = req.middleWareResponse.other;
                res.json({
                    "message" : "Battery Level: " + data.batteryCapacity,
                    "data" : data.batteryCapacity
                });
            } else {
                res.status(404).json({"message": `No drone ${req.body.serial_number} for now`});
            }
        } catch (error) {
            log(error); res.status(500).json({"message": "Unexpected error"});
        }
    }

}   