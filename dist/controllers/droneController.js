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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const droneModel_1 = require("../models/droneModel");
const drone_states_1 = require("../types/drone-states");
const dispatchModel_1 = __importDefault(require("../models/dispatchModel"));
const medicationModel_1 = require("../models/medicationModel");
// drone controller class
class default_1 {
    constructor() {
        // default get request
        this.getFunction = (req, res) => {
            res.json({ "message": "OK" });
        };
        // adding drone to DB
        this.addDrone = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // response from server checking if drone already exists
            var middleWareResponse = req.middleWareResponse;
            var body = req.body;
            var model = body.model, serial_number = body.serial_number, state = body.state;
            var weight_limit = body.weight_limit, battery_capacity = body.battery_capacity;
            // validating resul
            if (middleWareResponse.status) {
                res.status(403).json({
                    "message": "A drone already exists with this serial number: " + serial_number
                });
            }
            else
                // ORM creating drone
                try {
                    var action = yield droneModel_1.Drone.create({
                        model: model, serialnumber: serial_number,
                        state: drone_states_1.DroneState.IDLE, weightLimit: weight_limit,
                        batteryCapacity: battery_capacity
                    });
                    (0, console_1.log)(action);
                    if (action)
                        res.status(200).json({
                            "message": "Drone added successfully"
                        });
                    else
                        res.status(403).json({
                            "message": "Unexpected error"
                        });
                }
                catch (error) {
                    (0, console_1.log)(error);
                    res.status(403).json({
                        "message": "Unexpected error"
                    });
                }
        });
    }
    // getting loaded drone goods info
    getDroneLoadItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var body = req.body;
                if (req.middleWareResponse.status) { // drone found
                    var drones = req.middleWareResponse.data;
                    var result = [];
                    for (const drone of drones) {
                        var serial_number = drone.serialnumber;
                        // get the load carried by a drone
                        const dispatch = yield dispatchModel_1.default.findOne({
                            where: { droneId: serial_number }
                        });
                        if (dispatch) { // successful dispatch
                            const loadId = dispatch.loadId;
                            // search for that particular load
                            const medication = yield medicationModel_1.MedicationModel.findOne({
                                where: { id: loadId }
                            });
                            if (medication) {
                                result.push(medication);
                            }
                            else
                                res.status(403).json({ "message": "Unexpected error, finding the load" });
                        }
                        else
                            res.status(403).json({ "message": "Unexpected error, finding the dispatch" });
                    }
                    res.status(200).json({
                        "message": "Successful",
                        "data": result
                    });
                }
                else { // drone missing
                    res.status(404).json({ "message": `No drone ${body.state} for now` });
                }
            }
            catch (error) {
                (0, console_1.log)(error);
                res.status(500).json({ "message": "Unexpected error" });
            }
        });
    }
    // getting avaialble drones by state -> useful for getting IDLE, LOADING, LOADED drones
    getDroneByState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var body = req.body;
                if (req.middleWareResponse.status) {
                    res.status(200).json({
                        "message": "Successful",
                        "data": req.middleWareResponse.data
                    });
                }
                else { // drone missing
                    res.status(404).json({ "message": `No drone ${body.state} for now` });
                }
            }
            catch (error) {
                (0, console_1.log)(error);
                res.status(500).json({ "message": "Unexpected error" });
            }
        });
    }
    // get drone battery level 
    getDroneBatteryLevel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.middleWareResponse.status) {
                    var data = req.middleWareResponse.other;
                    res.json({
                        "message": "Battery Level: " + data,
                        "data": data.batteryCapacity
                    });
                }
                else {
                    res.status(404).json({ "message": `No drone ${req.body.serial_number} for now` });
                }
            }
            catch (error) {
                (0, console_1.log)(error);
                res.status(500).json({ "message": "Unexpected error" });
            }
        });
    }
}
exports.default = default_1;
