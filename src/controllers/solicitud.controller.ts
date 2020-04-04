import {Request, Response} from 'express';
import Solicitud from '../models/Solicitud'

export async function createSolicitud(req:Request, res:Response):Promise<Response>{
    const { nombre, email, telefono, empresa, ciudad, descripcion } = req.body;
    const newSolicitud = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        ciudad: ciudad,
        empresa: empresa,
        descripcion: descripcion
    }
    console.log(newSolicitud);
    const solicitud = new Solicitud(newSolicitud);
    await solicitud.save();
    return res.json({
        msg: 'creada',
        solicitud
    })
}

export async function getSolicitud(req:Request, res:Response):Promise<Response>{
    const { id } = req.params;
    const solicitud = await Solicitud.findById(id);
    return res.json(solicitud);
}

export async function getSolicitudes(req:Request, res:Response):Promise<Response>{
    const solicitudes = await Solicitud.find();
    return res.json(solicitudes);
}

export async function updateSolicitud(req:Request, res:Response):Promise<Response>{
    const { id } = req.params;
    const { nombre, email, telefono, empresa, ciudad, descripcion } = req.body;

    const solicitud = await Solicitud.findByIdAndUpdate(id,{
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
    })
}

export async function deleteSolicitud(req:Request, res:Response):Promise<Response>{
    const { id } = req.params;
    const solicitud = await Solicitud.findByIdAndRemove(id);
    return res.json({
        msg: 'eliminado....',
        solicitud
    })
}