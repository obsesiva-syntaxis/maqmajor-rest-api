"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Solicitud_1 = __importDefault(require("../models/Solicitud"));
const Maquina_1 = __importDefault(require("../models/Maquina"));
const Solar_1 = __importDefault(require("../models/Solar"));
const Hidraulica_1 = __importDefault(require("../models/Hidraulica"));
const nodemailer_1 = __importDefault(require("nodemailer"));
async function createSolicitud(req, res) {
    const { nombre, email, telefono, idMaquina, tipoMaquina, fechaCotizacion } = req.body;
    const newSolicitud = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        idMaquina: idMaquina,
        tipoMaquina: tipoMaquina,
        fechaCotizacion: fechaCotizacion
    };
    var maqCotizada;
    var contentHTML;
    switch (tipoMaquina) {
        case 'gen': {
            maqCotizada = await Maquina_1.default.findById(idMaquina);
            break;
        }
        case 'hidra': {
            maqCotizada = await Hidraulica_1.default.findById(idMaquina);
            break;
        }
        case 'solar': {
            maqCotizada = await Solar_1.default.findById(idMaquina);
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
    const solicitud = new Solicitud_1.default(newSolicitud);
    await solicitud.save();
    const transporter1 = nodemailer_1.default.createTransport({
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
    const transporter2 = nodemailer_1.default.createTransport({
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
    const { nombre, email, telefono, empresa, ciudad, descripcion, idMaquina } = req.body;
    const solicitud = await Solicitud_1.default.findByIdAndUpdate(id, {
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
    });
}
exports.updateSolicitud = updateSolicitud;
async function deleteSolicitud(req, res) {
    const { id } = req.params;
    const solicitud = await Solicitud_1.default.findByIdAndRemove(id);
    return res.json({
        msg: 'eliminado....',
        solicitud
    });
}
exports.deleteSolicitud = deleteSolicitud;
