"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    console.log('First middleware');
    next();
}, (req, res) => {
    console.log('Second middleware');
    res.send('Chained route');
});
exports.default = router;
