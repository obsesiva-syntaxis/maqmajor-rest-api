import {Schema, model, Document} from 'mongoose';
const maquinaSchema = new Schema({
    nombre: String,
    modelo: String,
    descripcion: String,
    marca: String,
    tipo: String,
    caracteristica: {
        potMax: String,
        potCont: String,
        combustible: String,
        partida: String,
        fases: String
    },
    imgUrl: String
});
interface iMaquina extends Document{
    nombre: string;
    modelo: string;
    descripcion: string,
    marca: string,
    tipo: string,
    caracteristica: {
        potMax: string,
        potCont: string,
        combustible: string,
        partida: string,
        fases: string
    },
    imgUrl: string
}
export default model<iMaquina>('maquina', maquinaSchema);