"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
// Callback function that will be executed every 5 minutes
function periodicTask() {
    console.log('This task runs every 5 minutes');
}
// Function that executes the periodic task and returns a Promise
function callbackTask() {
    return new Promise((resolve, reject) => {
        // Run the periodic task
        periodicTask();
        // Resolve the Promise
        resolve();
    });
}
// Wrapper function that includes both functions and chains them together
function startPeriodicTask() {
    // Schedule the periodic task to run every 5 minutes
    const job = node_schedule_1.default.scheduleJob('*/5 * * * *', () => {
        // Call the callback function and handle any errors
        callbackTask().catch((err) => {
            console.error(err);
        });
    });
}
// Call the wrapper function to start the periodic task
startPeriodicTask();
