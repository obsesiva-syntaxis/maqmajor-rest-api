"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hidraulica_1 = __importDefault(require("../models/Hidraulica"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require("../lib/env");
cloudinary_1.default.v2.config({
    cloud_name: 'aff62215248',
    api_key: '365764322244268',
    api_secret: 'CoqzvHWTgyCbIGCzKGdRbGN1K1c'
});
async function getHidra(req, res) {
    const result = await Hidraulica_1.default.findById(req.params.id);
    return res.json(result);
}
exports.getHidra = getHidra;
async function getHidras(req, res) {
    const results = await Hidraulica_1.default.find();
    return res.json(results);
}
exports.getHidras = getHidras;
async function createHidra(req, res) {
    const { nombre, modelo, descripcion, marca, tipo, potMax, sucDes, altMax, cauMax, volt, sucMax } = req.body;
    const caracteristica = {
        potMax, sucDes, altMax, cauMax, volt, sucMax
    };
    const result = await cloudinary_1.default.v2.uploader.upload(req.file.path, {
        folder: 'MAJORMACHINERY'
    }).catch(err => console.log(err));
    const newHidra = {
        nombre: nombre,
        modelo: modelo,
        descripcion: descripcion,
        marca: marca,
        tipo: tipo,
        caracteristica: caracteristica,
        imgUrl: result.url
    };
    const hidra = new Hidraulica_1.default(newHidra);
    await hidra.save();
    return res.json({
        msg: 'creado',
        hidra
    });
}
exports.createHidra = createHidra;
async function updateHidra(req, res) {
    const { nombre, modelo, descripcion, marca, tipo, potMax, sucDes, altMax, cauMax, volt, sucMax } = req.body;
    const caracteristica = {
        potMax, sucDes, altMax, cauMax, volt, sucMax
    };
    const result = await Hidraulica_1.default.findByIdAndUpdate(req.params.id, {
        nombre, modelo, descripcion, marca, tipo, caracteristica
    });
    return res.json({
        msg: 'modificado',
        result
    });
}
exports.updateHidra = updateHidra;
async function deleteHidra(req, res) {
    const result = await Hidraulica_1.default.findByIdAndDelete(req.params.id);
    if (result) {
        cloudinary_1.default.v2.uploader.destroy(result.imgUrl);
    }
    return res.json({
        msg: 'eliminado',
        result
    });
}
exports.deleteHidra = deleteHidra;
