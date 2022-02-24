"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const corsOption = {
    origin: (origin, callback) => {
        if (allowedOrigins_1.default.indexOf(String(origin)) !== 1) {
            callback(null, true);
        }
        else {
            callback(new Error("No origin allowed by CORS!"));
        }
    },
    optionsSuccessStatus: 200,
};
exports.default = corsOption;
