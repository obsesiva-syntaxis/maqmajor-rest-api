import { Request, Response } from 'express';
import Solar from '../models/Solar';
import cloudinary from 'cloudinary';
import '../lib/env';

cloudinary.v2.config({
    cloud_name: 'aff62215248',
    api_key: '365764322244268',
    api_secret: 'CoqzvHWTgyCbIGCzKGdRbGN1K1c'
});

export async function getSolar(req: Request, res: Response): Promise<Response> {
    const result = await Solar.findById(req.params.id);
    return res.json(result);
}

export async function getSolares(req: Request, res: Response): Promise<Response> {
    const result = await Solar.find();
    return res.json(result);
}

export async function createSolar(req: Request, res: Response): Promise<Response> {
    const { nombre, marca, modelo, descripcion, tipo } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'MAJORMACHINERY'
    }).catch(err => console.log(err));

    const newSolar = {
        nombre: nombre,
        marca: marca,
        modelo: modelo,
        descripcion: descripcion,
        tipo: tipo,
        imgUrl: result.url
    }

    const solar = new Solar(newSolar);
    await solar.save();
    return res.json({
        msg: 'solar creado',
        solar
    })
}

export async function updateSolar(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {nombre, modelo, descripcion, marca, tipo} = req.body;
    const newSolar = {
        nombre, modelo, descripcion, marca, tipo
    }
    console.log(newSolar);
    const solarUpdated = await Solar.findByIdAndUpdate(id, newSolar);

    return res.json({
        msg: 'modificado',
        solarUpdated
    })
}

export async function deleteSolar(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const solarDeleted = await Solar.findOneAndRemove(id);
    return res.json({
        msg: 'Eliminado',
        solarDeleted
    })
}