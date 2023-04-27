"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatch = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Dispatch extends sequelize_1.Model {
}
exports.Dispatch = Dispatch;
Dispatch.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    loadId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    droneId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'dispatches',
    sequelize: config_1.default,
});
exports.default = Dispatch;
