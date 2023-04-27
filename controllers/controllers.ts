import { dispatchController } from "./dispatchController";
import droneController from "./droneController";
import { medicationController } from "./medicationController";

// all controller class instances created in this folder
export default {
    "drone": new droneController(), // drone controller
    "dispatch": new dispatchController(), // dispatch controller
    "medication": new medicationController(), //medication controller 
}