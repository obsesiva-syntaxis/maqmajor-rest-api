"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const solarSchema = new mongoose_1.Schema({
    nombre: String,
    modelo: String,
    descripcion: String,
    marca: String,
    tipo: String,
    imgUrl: String
});
exports.default = mongoose_1.model('solare', solarSchema);
