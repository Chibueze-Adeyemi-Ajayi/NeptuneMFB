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
const node_schedule_1 = require("node-schedule");
const droneBatteryHistoryModel_1 = require("../models/droneBatteryHistoryModel");
// Assumption is made here that there is a remote connection IOT
// with the dispatching loading thereby, returning it's current battery level
// and updating the battery level history
function dependentFunction(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        // select drones and update there batter
        const history = yield droneBatteryHistoryModel_1.History.findAll();
        for (const drone_data of history) {
            (0, console_1.log)(history);
            const historyid = drone_data.id;
            const serial_number = drone_data.drone_id;
            var battery_level = drone_data.battery_level;
            // the IOT call will be made to update the battery level
            // but here we asumme to reduce by 5
            battery_level -= 5;
            yield droneBatteryHistoryModel_1.History.update({ battery_level: battery_level }, {
                where: { id: historyid }
            });
        }
        callback();
    });
}
function periodicTask() {
    // Your periodic task logic here
    (0, console_1.log)("Periodic task");
}
// the task runs every 5 minutes
function startPeriodicTask() {
    ((0, node_schedule_1.scheduleJob)('*/5 * * * *', () => {
        dependentFunction(() => {
            periodicTask();
        });
    }))();
}
exports.default = startPeriodicTask;
