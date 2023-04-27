"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middleware/middlewares"));
const controllers_1 = __importDefault(require("../controllers/controllers"));
const droneRoute = (0, express_1.Router)();
// GET: default route
droneRoute.route('/').get(middlewares_1.default.drone.getRequest, controllers_1.default.drone.getFunction);
// POST: adding a drone to the database
droneRoute.route("/add").post(middlewares_1.default.drone.validateNewDrone, controllers_1.default.drone.addDrone);
// POST: loading a drone
droneRoute.route("/load").post(middlewares_1.default.dispatch.validateLoadingDrone, controllers_1.default.dispatch.loadDrone);
// POST: loaded drone medical items
droneRoute.route("/items").post(middlewares_1.default.drone.getDronesByState, controllers_1.default.drone.getDroneLoadItems);
// POST: list of drones per their current state
droneRoute.route("/list").post(middlewares_1.default.drone.getDronesByState, controllers_1.default.drone.getDroneByState);
// POST: checking a drone battery level
droneRoute.route("/battery").post(middlewares_1.default.drone.getDroneBySerialNumber, controllers_1.default.drone.getDroneBatteryLevel);
exports.default = droneRoute;
