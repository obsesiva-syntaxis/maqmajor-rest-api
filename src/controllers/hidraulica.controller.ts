import {Request, Response, json, request} from 'express';
import Hidraulica from '../models/Hidraulica';
import cloudinary from 'cloudinary';
import '../lib/env';

cloudinary.v2.config({
    cloud_name: 'aff62215248',
    api_key: '365764322244268',
    api_secret: 'CoqzvHWTgyCbIGCzKGdRbGN1K1c'
});

export async function getHidra(req:Request, res:Response):Promise<Response>{
    const result = await Hidraulica.findById(req.params.id);
    return res.json(result);
}

export async function getHidras(req:Request, res:Response):Promise<Response>{
    const results = await Hidraulica.find();
    return res.json(results);
}

export async function createHidra(req:Request, res:Response):Promise<Response>{
    const {nombre, modelo, descripcion, marca, tipo, 
        potMax, sucDes, altMax, cauMax, volt,sucMax} = req.body;
    
    const caracteristica = {
        potMax, sucDes, altMax, cauMax, volt, sucMax
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder:'MAJORMACHINERY'
    }).catch(err => console.log(err));
    
    const newHidra = {
        nombre: nombre,
        modelo: modelo,
        descripcion: descripcion,
        marca: marca,
        tipo: tipo,
        caracteristica: caracteristica,
        imgUrl: result.url
    }

    const hidra = new Hidraulica(newHidra);
    await hidra.save();
    return res.json({
        msg: 'creado',
        hidra
    });
}

export async function updateHidra(req:Request, res:Response):Promise<Response>{
    const {nombre, modelo, descripcion, marca, tipo, 
        potMax, sucDes, altMax, cauMax, volt,sucMax} = req.body;
    
    const caracteristica = {
        potMax, sucDes, altMax, cauMax, volt, sucMax
    }

    const result = await Hidraulica.findByIdAndUpdate(req.params.id, {
        nombre, modelo, descripcion, marca, tipo, caracteristica
    });
    return res.json({
        msg: 'modificado',
        result
    });
}

export async function deleteHidra(req:Request, res:Response):Promise<Response>{
    const result = await Hidraulica.findOneAndRemove(req.params.id);
    return res.json({
        msg: 'eliminado',
        result
    });
}
