import { Request, Response } from 'express';
import Solicitud from '../models/Solicitud';
import Maquina from '../models/Maquina';
import Solar from '../models/Solar';
import Hidraulica from '../models/Hidraulica';
import nm from 'nodemailer';

export async function createSolicitud(req: Request, res: Response): Promise<Response> {
    const { nombre, email, telefono, idMaquina, tipoMaquina, fechaCotizacion } = req.body;
    const newSolicitud = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        idMaquina: idMaquina,
        tipoMaquina: tipoMaquina,
        fechaCotizacion: fechaCotizacion
    }
    var maqCotizada: any;
    var contentHTML: any;

    switch (tipoMaquina) {
        case 'gen':{
            maqCotizada = await Maquina.findById(idMaquina);
            break;
        }
        case 'hidra':{
            maqCotizada = await Hidraulica.findById(idMaquina);
            break;
        }
        case 'solar':{
            maqCotizada = await Solar.findById(idMaquina);
            break;
        }
    }

    contentHTML = `
        Información de la cotización
        
            Cliente: ${nombre}
            Telefono contacto: ${email}
            correo: ${telefono}
            
            ----Datos Maquina----
            Nombre Maquina: ${maqCotizada.nombre}
            Modelo: ${maqCotizada.modelo}
            Marca: ${maqCotizada.marca}
            Imagen: ${maqCotizada.imgUrl}

            Cotizado el : ${fechaCotizacion}
        `;

    const solicitud = new Solicitud(newSolicitud);
    await solicitud.save();
    const transporter1 = nm.createTransport({
        host: 'mail.maqmajor.cl',
        port: 587,
        secure: false,
        auth: {
            user: 'ventas1@maqmajor.cl',
            pass: 'maqmajor123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const transporter2 = nm.createTransport({
        host: 'mail.maqmajor.cl',
        port: 587,
        secure: false,
        auth: {
            user: 'ventas2@maqmajor.cl',
            pass: 'maqmajor123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info1 = await transporter1.sendMail({
        from: "'Ventas Maquinas Major'<ventas1@maqmajor.cl>",
        to: 'ventasmaqmajor1@gmail.com',
        subject: 'Nueva Cotización de Maquina!!',
        text: contentHTML
    }).catch((err) => console.log(err));

    const info2 = await transporter2.sendMail({
        from: "'Ventas Maquinas Major'<ventas2@maqmajor.cl>",
        to: 'ventasmaqmajor2@gmail.com',
        subject: 'Nueva Cotización de Maquina!!',
        text: contentHTML
    }).catch((err) => console.log(err));


    return res.json({
        msg: 'email enviado',
        solicitud
    });
}

export async function getSolicitud(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const solicitud = await Solicitud.findById(id);
    return res.json(solicitud);
}

export async function getSolicitudes(req: Request, res: Response): Promise<Response> {
    const solicitudes = await Solicitud.find();
    return res.json(solicitudes);
}

export async function updateSolicitud(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, email, telefono, empresa, ciudad, descripcion, idMaquina } = req.body;

    const solicitud = await Solicitud.findByIdAndUpdate(id, {
        nombre: nombre,
        email: email,
        telefono: telefono,
        ciudad: ciudad,
        empresa: empresa,
        descripcion: descripcion,
        idMaquina: idMaquina
    });
    return res.json({
        msg: 'actualizado...',
        solicitud
    })
}

export async function deleteSolicitud(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const solicitud = await Solicitud.findByIdAndRemove(id);
    return res.json({
        msg: 'eliminado....',
        solicitud
    })
}