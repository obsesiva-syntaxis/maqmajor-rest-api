import {Schema, model, Document} from 'mongoose';

const solicitudSchema = new Schema({
    nombre: String,
    email: String,
    telefono: String,
    ciudad: String,
    idMaquina: String,
    tipoMaquina: String,
    fechaCotizacion: Date
});

interface ISolicitud extends Document{
    nombre: string,
    email: string,
    telefono: string,
    ciudad: string,
    idMaquina: string,
    tipoMaquina: string,
    fechaCotizacion: Date
}

export default model<ISolicitud>('solicitude', solicitudSchema);