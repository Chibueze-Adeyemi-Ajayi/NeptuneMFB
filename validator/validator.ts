import Joi from "joi";
import { IDroneInput, IMedication } from "../types/drone-structure";

// Ths program uses JOI to validate the user input

// adding drone input validation
export function validateDroneDetails (input : IDroneInput) : any {
    const schema = Joi.object({
        model:Joi.string().required(),
        serial_number:Joi.string().required(),
        weight_limit:Joi.number().required(),
        battery_capacity:Joi.number().required(),
        state:Joi.string().required(),
    });
    return schema.validate(input);
}

// valdidating drone state data
export function validateDroneStateData (input : {state:string}) : any {
    const schema = Joi.object({
        state:Joi.string().required()
    });
    return schema.validate(input)
}

// validating drone loading data
export function validateLoadDroneData (input : {"serial_number": string, "load_id": number}) : any {
    const schema = Joi.object({
        serial_number: Joi.string().required(), 
        load_id: Joi.number().required()
    });
    return schema.validate(input)
}

// validating medication data
export function validateMedicationdata (input : IMedication) : any {
    const schema = Joi.object({
        "name": Joi.string().required(), "weight": Joi.number().required(),
        "code": Joi.string().required(), "image": Joi.string().required()
    });
    return schema.validate(input);
}

// validate drone serial number
export function validateDroneSerialNumber (input : {serial_number : string}) : any {
    const schema = Joi.object({
        serial_number: Joi.string().required().min(5)
    })
    return schema.validate(input);
}