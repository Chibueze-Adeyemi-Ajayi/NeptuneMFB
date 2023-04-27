import { dispatchMiddleware } from "./dispatchMiddleware";
import droneMiddleWare from "./droneMiddleware";
import { mediacationMiddleware } from "./medicationMiddleware";

// all middleware instances created in this folder
export default {
   "drone": new droneMiddleWare(), // drone middleware
   "dispatch": new dispatchMiddleware(), // dispatch middleware
   "medication": new mediacationMiddleware(), // mediacation middleware
}