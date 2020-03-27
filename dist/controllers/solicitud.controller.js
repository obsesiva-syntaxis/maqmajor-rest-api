"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Solicitud_1 = __importDefault(require("../models/Solicitud"));
async function createSolicitud(req, res) {
    const { nombre, email, telefono, empresa, ciudad, descripcion } = req.body;
    const newSolicitud = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        ciudad: ciudad,
        empresa: empresa,
        descripcion: descripcion
    };
    console.log(newSolicitud);
    const solicitud = new Solicitud_1.default(newSolicitud);
    await solicitud.save();
    return res.json({
        msg: 'creada',
        solicitud
    });
}
exports.createSolicitud = createSolicitud;
async function getSolicitud(req, res) {
    const { id } = req.params;
    const solicitud = await Solicitud_1.default.findById(id);
    return res.json(solicitud);
}
exports.getSolicitud = getSolicitud;
async function getSolicitudes(req, res) {
    const solicitudes = await Solicitud_1.default.find();
    return res.json(solicitudes);
}
exports.getSolicitudes = getSolicitudes;
async function updateSolicitud(req, res) {
    const { id } = req.params;
    const { nombre, email, telefono, empresa, ciudad, descripcion } = req.body;
    const solicitud = await Solicitud_1.default.findByIdAndUpdate(id, {
        nombre: nombre,
        email: email,
        telefono: telefono,
        ciudad: ciudad,
        empresa: empresa,
        descripcion: descripcion
    });
    return res.json({
        msg: 'actualizado...',
        solicitud
    });
}
exports.updateSolicitud = updateSolicitud;
async function deleteSolicitud(req, res) {
    const { id } = req.params;
    const solicitud = await Solicitud_1.default.findOneAndRemove(id);
    return res.json({
        msg: 'eliminado....',
        solicitud
    });
}
exports.deleteSolicitud = deleteSolicitud;
