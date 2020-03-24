import {Router} from 'express';
import {getMaquinas, createMaquina, getMaquina, deleteMaquina, updateMaquina} from '../controllers/maquina.controller';
import {getSolicitud,getSolicitudes,createSolicitud,deleteSolicitud,updateSolicitud} from '../controllers/solicitud.controller';
import multer from '../lib/multerCFG';


const router = Router();
//maquina
router.route('/maq')
    .get(getMaquinas)
    .post(multer.single('image'), createMaquina);

router.route('/maq/:id')
    .get(getMaquina)
    .delete(deleteMaquina)
    .put(updateMaquina);

//solicitud
router.route('/sol')
    .get(getSolicitudes)
    .post(createSolicitud);

router.route('/sol/:id')
    .get(getSolicitud)
    .delete(deleteSolicitud)
    .put(updateSolicitud);
    
export default router;