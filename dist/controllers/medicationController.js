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
exports.medicationController = void 0;
const console_1 = require("console");
const medicationModel_1 = require("../models/medicationModel");
class medicationController {
    // adding a medication
    addMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // response from middleware auth
                const response = req.middleWareResponse.status;
                const body = req.body;
                if (response)
                    res.status(403).json({ message: "The medication already exists." });
                else { // add medication
                    const medication = yield medicationModel_1.MedicationModel.create({
                        name: body.name, weight: body.weight,
                        image: body.image, code: body.code
                    });
                    if (medication)
                        res.status(200).json({ "message": "Medication has been added as load successfully." });
                    else
                        res.status(400).json({ "message": "Unable to add medical load." });
                }
            }
            catch (error) {
                (0, console_1.log)(error);
                res.status(500).json({ "message": "Internal server error" });
            }
        });
    }
}
exports.medicationController = medicationController;
