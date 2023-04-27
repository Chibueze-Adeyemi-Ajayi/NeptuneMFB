import { log } from "console";
import { Request, Response } from "express";
import { Drone } from "../models/droneModel";
import { Op } from "sequelize";
import { isArray } from "util";
import { DroneState } from "../types/drone-states";

interface DroneAddInterface {
    model:string, serial_number:string,
    weight_limit:number, battery_capacity:number,
    state:string
}

export class dispatchMiddleware {

    // valiadete drone to load drone to the database : Async middleware
    public async validateLoadingDrone (req:Request, res:Response, next:any) : Promise<void> {

        var body:DroneAddInterface = req.body;

        var model:string = body.model, serial_number = body.serial_number, state = body.state;
        var weight_limit:number = body.weight_limit, battery_capacity = body.battery_capacity; 
        
        // check if the drone exists, it's idle, battery is > 25%;
        try {

           var drone = await Drone.findAll({
             where: {
                serialnumber: serial_number,
                batteryCapacity: { [Op.gt]: 25 },
                state: DroneState.IDLE
             }
           });
            
           if (isArray(drone)) {
                if (drone.length > 0) { req.middleWareResponse = { status : true} }
                else req.middleWareResponse = { status : false}
           } else req.middleWareResponse = { status : false}
            
           next(); 

          } catch (error) {
            console.error(`Error while finding drone by serial number ${serial_number}:`, error);
            res.status(401).json({"maessage": "Resource not found"});
            //return null;
          }

    
    }
}