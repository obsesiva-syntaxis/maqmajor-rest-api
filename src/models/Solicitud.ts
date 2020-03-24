import {Schema, model, Document} from 'mongoose';

const solicitudSchema = new Schema({
    nombre: String,
    email: String,
    telefono: String,
    ciudad: String,
    empresa: String,
    descripcion: String
});

interface ISolicitud extends Document{
    nombre: string,
    email: string,
    telefono: string,
    ciudad: string,
    empresa: string,
    descripcion: string
}

export default model<ISolicitud>('solicitude', solicitudSchema);