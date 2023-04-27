"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: 'nfmb_drone_project',
    username: 'root',
    password: '',
    host: '127.0.0.1',
    dialect: 'mysql'
});
exports.default = sequelize;
