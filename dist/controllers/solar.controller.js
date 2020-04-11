"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Solar_1 = __importDefault(require("../models/Solar"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require("../lib/env");
cloudinary_1.default.v2.config({
    cloud_name: 'aff62215248',
    api_key: '365764322244268',
    api_secret: 'CoqzvHWTgyCbIGCzKGdRbGN1K1c'
});
async function getSolar(req, res) {
    const result = await Solar_1.default.findById(req.params.id);
    return res.json(result);
}
exports.getSolar = getSolar;
async function getSolares(req, res) {
    const result = await Solar_1.default.find();
    return res.json(result);
}
exports.getSolares = getSolares;
async function createSolar(req, res) {
    const { nombre, marca, modelo, descripcion, tipo } = req.body;
    const result = await cloudinary_1.default.v2.uploader.upload(req.file.path, {
        folder: 'MAJORMACHINERY'
    }).catch(err => console.log(err));
    const newSolar = {
        nombre: nombre,
        marca: marca,
        modelo: modelo,
        descripcion: descripcion,
        tipo: tipo,
        imgUrl: result.url
    };
    const solar = new Solar_1.default(newSolar);
    await solar.save();
    return res.json({
        msg: 'solar creado',
        solar
    });
}
exports.createSolar = createSolar;
async function updateSolar(req, res) {
    const { id } = req.params;
    const { nombre, modelo, descripcion, marca, tipo } = req.body;
    const newSolar = {
        nombre, modelo, descripcion, marca, tipo
    };
    console.log(newSolar);
    const solarUpdated = await Solar_1.default.findByIdAndUpdate(id, newSolar);
    return res.json({
        msg: 'modificado',
        solarUpdated
    });
}
exports.updateSolar = updateSolar;
async function deleteSolar(req, res) {
    const result = await Solar_1.default.findById(req.params.id);
    if (result) {
        cloudinary_1.default.v2.uploader.destroy(result.imgUrl);
    }
    const solarDeleted = await Solar_1.default.findByIdAndRemove(req.params.id);
    return res.json({
        msg: 'Eliminado',
        solarDeleted
    });
}
exports.deleteSolar = deleteSolar;
