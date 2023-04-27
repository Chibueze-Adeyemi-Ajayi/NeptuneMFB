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
const console_1 = require("console");
const droneModel_1 = require("../models/droneModel");
// drone middleware class
class droneMiddleWare {
    // default middleware
    getRequest(req, res, next) {
        (0, console_1.log)("drone middleware");
        next();
    }
    // valiadete added drone to the database : Async middleware
    validateNewDrone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body;
            var serial_number = body.serial_number;
            // check if the serial hasn't been in use by another drone
            try {
                var drone = yield droneModel_1.Drone.findOne({
                    where: { serialnumber: serial_number }
                });
                if (drone)
                    req.middleWareResponse = { status: true };
                else
                    req.middleWareResponse = { status: false };
                next();
            }
            catch (error) {
                console.error(`Error while finding drone by serial number ${serial_number}:`, error);
                res.status(401).json({ "message": "Resource not found" });
                //return null;
            }
        });
    }
    // select all drones in a particular state
    getDronesByState(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const state = req.body.state;
                var drones = yield droneModel_1.Drone.findAll({
                    where: { state: state }
                });
                var status = drones.length > 0;
                req.middleWareResponse = { status: status, data: drones };
                next();
            }
            catch (error) {
                console.error(`Error while finding ${req.body.state} drone`, error);
                res.status(401).json({ "message": "Resource not found" });
            }
        });
    }
    // getting the drone by ID
    getDroneBySerialNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var serial_number = req.body.serial_number;
                const drone = yield droneModel_1.Drone.findOne({
                    where: { serialnumber: serial_number }
                });
                if (drone)
                    req.middleWareResponse = { status: true, other: drone };
                else
                    req.middleWareResponse = { status: false };
                next();
            }
            catch (error) {
                console.error(`Error while finding ${req.body.serial_number} drone`, error);
                res.status(401).json({ "message": "Resource not found" });
            }
        });
    }
}
exports.default = droneMiddleWare;
