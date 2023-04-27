import { Request, Response } from "express";
import { MedicationModel } from "../models/medicationModel";
import { Op } from "sequelize";
import Dispatch from "../models/dispatchModel";
import { log } from "console";
import { Drone } from "../models/droneModel";
import { DroneState } from "../types/drone-states";
import { History } from "../models/droneBatteryHistoryModel";

interface DroneAddInterface {
    model:string, serial_number:string,
    weight_limit:number, battery_capacity:number,
    state:string, load_id:number
}

// load a drone and check if the drone's load is < 500g provided middleware condition is met
export class dispatchController {

    public async loadDrone (req:Request, res:Response) : Promise <void> {
        
        var body:DroneAddInterface = req.body;

        var serial_number:string = body.serial_number, load_id:number = body.load_id;
        
        // if drone condition is met
        if (req.middleWareResponse.status) {

            // checking load condition if it exists
            const medication = await MedicationModel.findOne({
                where: {id: load_id}
            });

            if (!medication) res.status(404).json({message:"Medication load not found"});
            else { // check if load is less than 500g
                const medication_weight = await MedicationModel.findAll({
                    where: {
                        id: load_id, weight: {[Op.lt]: 500}
                    }
                });

                if (medication_weight.length > 0) { // load the drone

                    var drone_id: string = serial_number;

                    // set up the dispatch
                    try {

                        const dispatch = await Dispatch.create({ // create dispatch
                            loadId: body.load_id, droneId: drone_id
                        });

                        if (dispatch) { // load drone

                            const updateDrone = await Drone.update( 
                                { state: DroneState.LOADED },
                                { where: { serialnumber: drone_id } }
                              );

                                // feedback
                              if (updateDrone) {
                                // add drone to history so it can be tracked as currently flying drone - this section assist in upadting battery level of flying drones from our cron job
                                // get the drone
                                var drone = await Drone.findOne({ where: {serialnumber : drone_id} });
                                // default as 100% as loading
                                var history = await History.create({ drone_id: drone_id, battery_level: 100 });
                                res.status(200).json({message: "Drone loaded successfully"});
                              }
                              else res.status(400).json({message: "Unable to load drone"});

                        } else res.status(500).json({message:"Unexpected error, loading drone"});

                    } catch (error) {
                        log(error); res.status(500).json({message:"Unexpected error"});
                    }

                    // update the drone status

                } else // load is above 500 gram
                res.status(403).json({message:"Medication load not exceeds 500g"});
            }

        } else res.status(404).json({message: "Requested drone not available for the dispatch"});
 

    }

}