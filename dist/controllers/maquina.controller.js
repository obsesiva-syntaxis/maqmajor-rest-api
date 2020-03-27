"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Maquina_1 = __importDefault(require("../models/Maquina"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require("../lib/env");
cloudinary_1.default.v2.config({
    cloud_name: 'aff62215248',
    api_key: '365764322244268',
    api_secret: 'CoqzvHWTgyCbIGCzKGdRbGN1K1c'
});
async function getMaquinas(req, res) {
    const maq = await Maquina_1.default.find();
    return res.json(maq);
}
exports.getMaquinas = getMaquinas;
async function createMaquina(req, res) {
    const { nombre, modelo, descripcion, marca, tipo, potMax, potCont, combustible, partida, fases } = req.body;
    const caracteristica = {
        potMax,
        potCont,
        combustible,
        partida,
        fases
    };
    const result = await cloudinary_1.default.v2.uploader.upload(req.file.path, {
        folder: 'MAJORMACHINERY'
    }).catch(err => console.log(err));
    console.log(result);
    const newMaquina = {
        nombre: nombre,
        modelo: modelo,
        descripcion: descripcion,
        marca: marca,
        tipo: tipo,
        caracteristica: caracteristica,
        imgUrl: result.url
    };
    console.log(newMaquina);
    const maquina = new Maquina_1.default(newMaquina);
    await maquina.save();
    return res.json({
        message: "Maquina guardada!",
        maquina
    });
}
exports.createMaquina = createMaquina;
async function getMaquina(req, res) {
    const { id } = req.params;
    const maq = await Maquina_1.default.findById(id);
    return res.json(maq);
}
exports.getMaquina = getMaquina;
async function deleteMaquina(req, res) {
    const { id } = req.params;
    const maq = await Maquina_1.default.findByIdAndRemove(id);
    if (maq) {
        fs_extra_1.default.unlink(path_1.default.resolve(maq.imgUrl));
    }
    return res.json({
        messages: 'Maquina eliminada',
        maq
    });
}
exports.deleteMaquina = deleteMaquina;
async function updateMaquina(req, res) {
    const { id } = req.params;
    const { nombre, modelo, descripcion, marca, tipo } = req.body;
    const { potMax, potCont, combustible, partida, fases } = req.body;
    const caracteristica = {
        potMax, potCont, combustible, partida, fases
    };
    const maq = await Maquina_1.default.findByIdAndUpdate(id, {
        nombre, modelo, descripcion, marca, tipo, caracteristica
    });
    return res.json({
        mesagge: 'maquina modificada',
        maq
    });
}
exports.updateMaquina = updateMaquina;
