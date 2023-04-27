"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drone = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Drone extends sequelize_1.Model {
}
exports.Drone = Drone;
Drone.init({
    serialnumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weightLimit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    batteryCapacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Drone',
});
