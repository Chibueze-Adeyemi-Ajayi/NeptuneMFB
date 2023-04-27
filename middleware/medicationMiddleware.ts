import { log } from "console";
import { Request, Response } from "express";
import { MedicationModel } from "../models/medicationModel";
import { validateMedicationdata } from "../validator/validator";

export class mediacationMiddleware {
    // check if the medication doesn't exist
    async validateMedication (req:Request, res:Response, next:any) : Promise<void> {
        try {
            // validate medication data input
            var validate = validateMedicationdata(req.body);
            if (validate.error) {
                res.status(403).json({
                    message: "Your medication data is invalid"
                });
                return;
            }
            var code = req.body.code; // find by code
            var medication = await MedicationModel.findOne({
                where: {code: code} // clause
            });
            const bool:boolean = medication ? true : false;
            // middleware response
            req.middleWareResponse = {status:bool}
            next();
        } catch (error) {
            log(error);  res.status(500).json({"message": "Internal server error"});
        }
    }
}