"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const colors_1 = __importDefault(require("colors"));
require("./lib/env");
const URI = 'mongodb://adminMajor:maqmajor123@161.35.5.29:27017/majorbd?authSource=admin';
function dbConnect() {
    mongoose_1.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    mongoose_1.connection.on('open', () => {
        console.log(colors_1.default.random('DATABASE is conected!'));
    });
}
exports.default = dbConnect;
