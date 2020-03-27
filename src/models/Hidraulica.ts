import {Schema, model, Document} from 'mongoose';
const hidraSchema = new Schema({
    nombre: String,
    modelo: String,
    descripcion: String,
    marca: String,
    tipo: String,
    caracteristica: {
        potMax: String,
        sucDes: String,
        altMax: String,
        cauMax: String,
        volt: String,
        sucMax: String
    },
    imgUrl: String
});
interface iHidraulica extends Document{
    nombre: string;
    modelo: string;
    descripcion: string,
    marca: string,
    tipo: string,
    caracteristica: {
        potMax: string,
        sucDes: string,
        altMax: string,
        cauMax: string,
        volt: string,
        sucMax: string
    },
    imgUrl: string
}
export default model<iHidraulica>('hidraulica', hidraSchema);