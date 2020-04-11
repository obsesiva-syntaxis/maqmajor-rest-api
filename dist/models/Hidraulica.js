"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hidraSchema = new mongoose_1.Schema({
    nombre: String,
    modelo: String,
    descripcion: String,
    marca: String,
    tipo: String,
    caracteristica: {
        potMax: String,
        sucDes: String,
        altMax: String,
        cauMax: String,
        volt: String,
        sucMax: String
    },
    imgUrl: String
});
exports.default = mongoose_1.model('hidraulica', hidraSchema);
