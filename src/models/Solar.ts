import {Schema, model, Document} from 'mongoose';
const solarSchema = new Schema({
    nombre: String,
    modelo: String,
    descripcion: String,
    marca: String,
    tipo: String,
    imgUrl: String
});
interface iSolar extends Document{
    nombre: string;
    modelo: string;
    descripcion: string,
    marca: string,
    tipo: string,
    imgUrl: string
}
export default model<iSolar>('solare', solarSchema);