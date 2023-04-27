import { log } from "console";
import { Request, Response } from "express";
import { Drone } from "../models/droneModel";
import { validateDroneDetails, validateDroneSerialNumber, validateDroneStateData } from "../validator/validator";


interface DroneAddInterface {
    model:string, serial_number:string,
    weight_limit:number, battery_capacity:number,
    state:string
}

// drone middleware class
class droneMiddleWare {

    // default middleware
    public getRequest (req:Request, res:Response, next:any) : void {
        log("drone middleware");
        next();
    }

    // valiadete added drone to the database : Async middleware
    public async validateNewDrone (req:Request, res:Response, next:any) : Promise<void> {

        // validate the input data 
        const valid = validateDroneDetails(req.body);
        if (valid.error) {res.status(401).json({
            "message": "Invalid inputs"
        }); return}
        
        var body:DroneAddInterface = req.body;

        var serial_number = body.serial_number;
        // check if the serial hasn't been in use by another drone
        try {

           var drone = await Drone.findOne({
            where: {serialnumber : serial_number}
           });

           if (drone) req.middleWareResponse = {status:true}
           else req.middleWareResponse = { status : false}
           
           next(); 

          } catch (error) {
            console.error(`Error while finding drone by serial number ${serial_number}:`, error);
            res.status(401).json({"message": "Resource not found"});
            //return null;
          }

    }

    // select all drones in a particular state
    async getDronesByState (req:Request, res:Response, next:any) : Promise<void> {
        if (validateDroneStateData(req.body).error){
            res.status(403).json({
                "message": "Invalid inputs"
            });
            return;
        }
        try {
            
            const state:string = req.body.state;

            var drones = await Drone.findAll({
                where : {state : state}
            });

            var status = drones.length > 0;

            req.middleWareResponse = {status:status, data:drones}

            next(); 

        } catch (error) {
            console.error(`Error while finding ${req.body.state} drone`, error);
            res.status(401).json({"message": "Resource not found"});
        }
    }

    // getting the drone by ID
    async getDroneBySerialNumber(req:Request, res:Response, next:any) : Promise<void> {
        try {
            // validate serial number
            var validate = validateDroneSerialNumber(req.body);
            if (validate.error) {
                res.status(403).json({
                    "message": "Invalid inputs"
                });
                return
            }
            var serial_number = req.body.serial_number;
            const drone = await Drone.findOne({
                where : {serialnumber : serial_number}
            });
            if (drone) req.middleWareResponse = {status:true, other:drone}
            else req.middleWareResponse = { status : false}
            next();
        } catch (error) {
            console.error(`Error while finding ${req.body.serial_number} drone`, error);
            res.status(401).json({"message": "Resource not found"});
        }
    }

}

export default droneMiddleWare;