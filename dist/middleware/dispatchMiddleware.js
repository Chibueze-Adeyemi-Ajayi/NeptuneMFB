"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchMiddleware = void 0;
const droneModel_1 = require("../models/droneModel");
const sequelize_1 = require("sequelize");
const util_1 = require("util");
const drone_states_1 = require("../types/drone-states");
const validator_1 = require("../validator/validator");
class dispatchMiddleware {
    // valiadete drone to load drone to the database : Async middleware
    validateLoadingDrone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body;
            // validation
            var validator = (0, validator_1.validateLoadDroneData)(body);
            if (validator.error) {
                res.status(403).json({ "maessage": "Your data are invalid" });
                return;
            }
            var serial_number = body.serial_number;
            // check if the drone exists, it's idle, battery is > 25%;
            try {
                var drone = yield droneModel_1.Drone.findAll({
                    where: {
                        serialnumber: serial_number,
                        batteryCapacity: { [sequelize_1.Op.gt]: 25 },
                        state: drone_states_1.DroneState.IDLE
                    }
                });
                if ((0, util_1.isArray)(drone)) {
                    if (drone.length > 0) {
                        req.middleWareResponse = { status: true };
                    }
                    else
                        req.middleWareResponse = { status: false };
                }
                else
                    req.middleWareResponse = { status: false };
                next();
            }
            catch (error) {
                console.error(`Error while finding drone by serial number ${serial_number}:`, error);
                res.status(401).json({ "maessage": "Resource not found" });
                //return null;
            }
        });
    }
}
exports.dispatchMiddleware = dispatchMiddleware;
