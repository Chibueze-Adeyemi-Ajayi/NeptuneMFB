import { Router } from 'express';
import middlewares from '../middleware/middlewares';
import controllers from '../controllers/controllers';

const droneRoute = Router();
// GET: default route
droneRoute.route('/').get(middlewares.drone.getRequest, controllers.drone.getFunction);
// POST: adding a drone to the database
droneRoute.route("/add").post(middlewares.drone.validateNewDrone, controllers.drone.addDrone);
// POST: loading a drone
droneRoute.route("/load").post(middlewares.dispatch.validateLoadingDrone, controllers.dispatch.loadDrone);
// POST: loaded drone medical items
droneRoute.route("/items").post(middlewares.drone.getDronesByState, controllers.drone.getDroneLoadItems);
// POST: list of drones per their current state
droneRoute.route("/list").post(middlewares.drone.getDronesByState, controllers.drone.getDroneByState);
// POST: checking a drone battery level
droneRoute.route("/battery").post(middlewares.drone.getDroneBySerialNumber, controllers.drone.getDroneBatteryLevel);

export default droneRoute; 
 