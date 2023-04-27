"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDroneSerialNumber = exports.validateMedicationdata = exports.validateLoadDroneData = exports.validateDroneStateData = exports.validateDroneDetails = void 0;
const joi_1 = __importDefault(require("joi"));
// Ths program uses JOI to validate the user input
// adding drone input validation
function validateDroneDetails(input) {
    const schema = joi_1.default.object({
        model: joi_1.default.string().required(),
        serial_number: joi_1.default.string().required(),
        weight_limit: joi_1.default.number().required(),
        battery_capacity: joi_1.default.number().required(),
        state: joi_1.default.string().required(),
    });
    return schema.validate(input);
}
exports.validateDroneDetails = validateDroneDetails;
// valdidating drone state data
function validateDroneStateData(input) {
    const schema = joi_1.default.object({
        state: joi_1.default.string().required()
    });
    return schema.validate(input);
}
exports.validateDroneStateData = validateDroneStateData;
// validating drone loading data
function validateLoadDroneData(input) {
    const schema = joi_1.default.object({
        serial_number: joi_1.default.string().required(),
        load_id: joi_1.default.number().required()
    });
    return schema.validate(input);
}
exports.validateLoadDroneData = validateLoadDroneData;
// validating medication data
function validateMedicationdata(input) {
    const schema = joi_1.default.object({
        "name": joi_1.default.string().required(), "weight": joi_1.default.number().required(),
        "code": joi_1.default.string().required(), "image": joi_1.default.string().required()
    });
    return schema.validate(input);
}
exports.validateMedicationdata = validateMedicationdata;
// validate drone serial number
function validateDroneSerialNumber(input) {
    const schema = joi_1.default.object({
        serial_number: joi_1.default.string().required().min(5)
    });
    return schema.validate(input);
}
exports.validateDroneSerialNumber = validateDroneSerialNumber;
