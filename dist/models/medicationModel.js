"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class MedicationModel extends sequelize_1.Model {
}
exports.MedicationModel = MedicationModel;
MedicationModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'medications',
    sequelize: config_1.default, // passing the `sequelize` instance is required
});
