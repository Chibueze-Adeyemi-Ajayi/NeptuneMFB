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
exports.mediacationMiddleware = void 0;
const console_1 = require("console");
const medicationModel_1 = require("../models/medicationModel");
class mediacationMiddleware {
    // check if the medication doesn't exist
    validateMedication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var code = req.body.code; // find by code
                var medication = yield medicationModel_1.MedicationModel.findOne({
                    where: { code: code } // clause
                });
                const bool = medication ? true : false;
                // middleware response
                req.middleWareResponse = { status: bool };
                next();
            }
            catch (error) {
                (0, console_1.log)(error);
                res.status(500).json({ "message": "Internal server error" });
            }
        });
    }
}
exports.mediacationMiddleware = mediacationMiddleware;
