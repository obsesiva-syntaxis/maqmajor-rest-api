"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const maquinaSchema = new mongoose_1.Schema({
    nombre: String,
    modelo: String,
    descripcion: String,
    marca: String,
    tipo: String,
    caracteristica: {
        potMax: String,
        potCont: String,
        combustible: String,
        partida: String,
        fases: String
    },
    imgUrl: String
});
exports.default = mongoose_1.model('maquina', maquinaSchema);
