"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./configs/corsOptions"));
const logEvents_1 = require("./middlewares/logEvents");
// use .env
(0, dotenv_1.config)();
// <---------------------------DEFINE VARIABLES------------------------------->
const port = Number(process.env.PORT) || 5000;
const app = (0, express_1.default)();
// <---------------------------Middlewares------------------------------->
app.use(logEvents_1.logEvents);
// <---------------------------SOME DEFINDED------------------------------->
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// <---------------------------ROUTES------------------------------->
// <---------------------------LISTENER------------------------------->
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
