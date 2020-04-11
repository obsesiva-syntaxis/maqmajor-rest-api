"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const solicitudSchema = new mongoose_1.Schema({
    nombre: String,
    email: String,
    telefono: String,
    ciudad: String,
    idMaquina: String,
    tipoMaquina: String,
    fechaCotizacion: Date
});
exports.default = mongoose_1.model('solicitude', solicitudSchema);
