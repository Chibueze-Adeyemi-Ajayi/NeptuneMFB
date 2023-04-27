"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middleware/middlewares"));
const controllers_1 = __importDefault(require("../controllers/controllers"));
const medicationRoute = (0, express_1.Router)();
// adding mediacation to the route
medicationRoute.route("/add").post(middlewares_1.default.medication.validateMedication, controllers_1.default.medication.addMedication);
exports.default = medicationRoute;
