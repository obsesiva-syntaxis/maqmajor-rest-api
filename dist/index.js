"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
//conectar a la BD
database_1.default();
//levantar server
app_1.default.listen(app_1.default.get('port'), () => {
    console.log('server on port', app_1.default.get('port'));
});
