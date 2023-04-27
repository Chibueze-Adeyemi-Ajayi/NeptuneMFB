import { Router } from "express";
import middlewares from "../middleware/middlewares";
import controllers from "../controllers/controllers";

const medicationRoute = Router();

// adding mediacation to the route

medicationRoute.route("/add").post(middlewares.medication.validateMedication, controllers.medication.addMedication);

export default medicationRoute;