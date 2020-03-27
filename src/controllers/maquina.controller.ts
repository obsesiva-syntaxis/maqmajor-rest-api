import {Request, Response} from 'express';
import Maquina from '../models/Maquina';
import fs from 'fs-extra';
import path from 'path';
import cloudinary from 'cloudinary';
import '../lib/env';

cloudinary.v2.config({
    cloud_name: 'aff62215248',
    api_key: '365764322244268',
    api_secret: 'CoqzvHWTgyCbIGCzKGdRbGN1K1c'
});

export async function getMaquinas(req:Request, res:Response):Promise<Response>{
    const maq = await Maquina.find();
    return res.json(maq);
}

export async function createMaquina(req:Request, res:Response): Promise<Response>{
    const {
        nombre, modelo, descripcion, marca, tipo, potMax, potCont, combustible, partida, fases
    } = req.body;
    
    const caracteristica = {
        potMax,
        potCont,
        combustible,
        partida,
        fases
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder:'MAJORMACHINERY'
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
    }
    console.log(newMaquina);
    const maquina = new Maquina(newMaquina);
    await maquina.save();
    return res.json({
        message: "Maquina guardada!",
        maquina
    });
}

export async function getMaquina(req:Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const maq = await Maquina.findById(id);
    return res.json(
        maq
    );
}

export async function deleteMaquina(req:Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const maq = await Maquina.findByIdAndRemove(id);
    if(maq){
        fs.unlink(path.resolve(maq.imgUrl));
    }
    return res.json({
        messages: 'Maquina eliminada',
        maq
    });
}

export async function updateMaquina(req:Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const {nombre, modelo, descripcion, marca, tipo} = req.body;
    const {potMax, potCont, combustible, partida, fases} = req.body;
    const caracteristica = {
        potMax, potCont, combustible, partida, fases
    }
    const maq = await Maquina.findByIdAndUpdate(id, {
        nombre, modelo, descripcion, marca, tipo, caracteristica
    })

    return res.json({
        mesagge: 'maquina modificada',
        maq
    });
}