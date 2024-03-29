import {Router} from 'express';
import { getMaquinas, createMaquina, getMaquina, deleteMaquina, updateMaquina } from '../controllers/maquina.controller';
import { getSolicitud, getSolicitudes, createSolicitud, deleteSolicitud, updateSolicitud } from '../controllers/solicitud.controller';
import multer from '../lib/multerCFG';
import { getSolar, createSolar, getSolares, updateSolar, deleteSolar } from '../controllers/solar.controller';
import { getHidras, createHidra, getHidra, updateHidra, deleteHidra } from '../controllers/hidraulica.controller';


const router = Router();
//maquina
router.route('/maq')
    .get(getMaquinas)
    .post(multer.single('image'), createMaquina);

router.route('/maq/:id')
    .get(getMaquina)
    .delete(deleteMaquina)
    .put(updateMaquina);

//solar
router.route('/solar')
    .get(getSolares)
    .post(multer.single('image'),createSolar);

router.route('/solar/:id')
    .get(getSolar)
    .put(updateSolar)
    .delete(deleteSolar);

//Hidraulica
router.route('/hidra')
    .get(getHidras)
    .post(multer.single('image'),createHidra);

router.route('/hidra/:id')
    .get(getHidra)
    .put(updateHidra)
    .delete(deleteHidra);

//solicitud
router.route('/sol')
    .get(getSolicitudes)
    .post(createSolicitud);

router.route('/sol/:id')
    .get(getSolicitud)
    .delete(deleteSolicitud)
    .put(updateSolicitud);
    
export default router;