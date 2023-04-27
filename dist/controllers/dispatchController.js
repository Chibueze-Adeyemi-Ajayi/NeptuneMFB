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
exports.dispatchController = void 0;
const medicationModel_1 = require("../models/medicationModel");
const sequelize_1 = require("sequelize");
const dispatchModel_1 = __importDefault(require("../models/dispatchModel"));
const console_1 = require("console");
const droneModel_1 = require("../models/droneModel");
const drone_states_1 = require("../types/drone-states");
const droneBatteryHistoryModel_1 = require("../models/droneBatteryHistoryModel");
// load a drone and check if the drone's load is < 500g provided middleware condition is met
class dispatchController {
    loadDrone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body;
            var serial_number = body.serial_number, load_id = body.load_id;
            // if drone condition is met
            if (req.middleWareResponse.status) {
                // checking load condition if it exists
                const medication = yield medicationModel_1.MedicationModel.findOne({
                    where: { id: load_id }
                });
                if (!medication)
                    res.status(404).json({ message: "Medication load not found" });
                else { // check if load is less than 500g
                    const medication_weight = yield medicationModel_1.MedicationModel.findAll({
                        where: {
                            id: load_id, weight: { [sequelize_1.Op.lt]: 500 }
                        }
                    });
                    if (medication_weight.length > 0) { // load the drone
                        var drone_id = serial_number;
                        // set up the dispatch
                        try {
                            const dispatch = yield dispatchModel_1.default.create({
                                loadId: body.load_id, droneId: drone_id
                            });
                            if (dispatch) { // load drone
                                const updateDrone = yield droneModel_1.Drone.update({ state: drone_states_1.DroneState.LOADED }, { where: { serialnumber: drone_id } });
                                // feedback
                                if (updateDrone) {
                                    // add drone to history so it can be tracked as currently flying drone - this section assist in upadting battery level of flying drones from our cron job
                                    // get the drone
                                    var drone = yield droneModel_1.Drone.findOne({ where: { serialnumber: drone_id } });
                                    // default as 100% as loading
                                    var history = yield droneBatteryHistoryModel_1.History.create({ drone_id: drone_id, battery_level: 100 });
                                    res.status(200).json({ message: "Drone loaded successfully" });
                                }
                                else
                                    res.status(400).json({ message: "Unable to load drone" });
                            }
                            else
                                res.status(500).json({ message: "Unexpected error, loading drone" });
                        }
                        catch (error) {
                            (0, console_1.log)(error);
                            res.status(500).json({ message: "Unexpected error" });
                        }
                        // update the drone status
                    }
                    else // load is above 500 gram
                        res.status(403).json({ message: "Medication load not exceeds 500g" });
                }
            }
            else
                res.status(404).json({ message: "Requested drone not available for the dispatch" });
        });
    }
}
exports.dispatchController = dispatchController;
