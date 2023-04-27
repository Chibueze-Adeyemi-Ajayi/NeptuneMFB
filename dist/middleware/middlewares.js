"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchMiddleware_1 = require("./dispatchMiddleware");
const droneMiddleware_1 = __importDefault(require("./droneMiddleware"));
const medicationMiddleware_1 = require("./medicationMiddleware");
// all middleware instances created in this folder
exports.default = {
    "drone": new droneMiddleware_1.default(),
    "dispatch": new dispatchMiddleware_1.dispatchMiddleware(),
    "medication": new medicationMiddleware_1.mediacationMiddleware(), // mediacation middleware
};
