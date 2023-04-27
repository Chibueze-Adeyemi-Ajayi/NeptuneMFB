"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchController_1 = require("./dispatchController");
const droneController_1 = __importDefault(require("./droneController"));
const medicationController_1 = require("./medicationController");
// all controller class instances created in this folder
exports.default = {
    "drone": new droneController_1.default(),
    "dispatch": new dispatchController_1.dispatchController(),
    "medication": new medicationController_1.medicationController(), //medication controller 
};
