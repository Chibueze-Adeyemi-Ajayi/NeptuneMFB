import { log } from "console";
import { Request, Response } from "express";
import { MedicationModel } from "../models/medicationModel";

export class medicationController {
    // adding a medication
    async addMedication (req:Request, res:Response) : Promise<void> {
        try {
            // response from middleware auth
            const response = req.middleWareResponse.status;
            const body = req.body; 
            if (response) res.status(403).json({message:"The medication already exists."});
            
            else { // add medication
                const medication = await MedicationModel.create({
                    name: body.name, weight: body.weight,
                    image: body.image, code: body.code
                });
                if (medication) res.status(200).json({"message": "Medication has been added as load successfully."});
                else res.status(400).json({"message": "Unable to add medical load."});
            }

        } catch (error) {
            log(error);  res.status(500).json({"message": "Internal server error"});
        }
    }
}