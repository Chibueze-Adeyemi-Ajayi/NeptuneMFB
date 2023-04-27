"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// application imports
const express_1 = __importDefault(require("express"));
const drone_1 = __importDefault(require("./routes/drone"));
const medication_1 = __importDefault(require("./routes/medication"));
const console_1 = require("console");
const config_1 = __importDefault(require("./database/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const periodic_task_1 = __importDefault(require("./job/periodic-task"));
// initializing express application
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// index route
app.get('/', (req, res) => { res.send('Hello World!'); });
app.use("/drone", drone_1.default);
app.use("/medication", medication_1.default);
// connecting to database
config_1.default.sync()
    .then(() => {
    (0, periodic_task_1.default)();
    (0, console_1.log)("Connection successfully established");
})
    .catch(e => {
    (0, console_1.log)(`connection error: ${e.message}`);
});
// app listening on port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
