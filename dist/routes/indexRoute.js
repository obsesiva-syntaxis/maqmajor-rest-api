"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maquina_controller_1 = require("../controllers/maquina.controller");
const solicitud_controller_1 = require("../controllers/solicitud.controller");
const multerCFG_1 = __importDefault(require("../lib/multerCFG"));
const solar_controller_1 = require("../controllers/solar.controller");
const hidraulica_controller_1 = require("../controllers/hidraulica.controller");
const router = express_1.Router();
//maquina
router.route('/maq')
    .get(maquina_controller_1.getMaquinas)
    .post(multerCFG_1.default.single('image'), maquina_controller_1.createMaquina);
router.route('/maq/:id')
    .get(maquina_controller_1.getMaquina)
    .delete(maquina_controller_1.deleteMaquina)
    .put(maquina_controller_1.updateMaquina);
//solar
router.route('/solar')
    .get(solar_controller_1.getSolares)
    .post(multerCFG_1.default.single('image'), solar_controller_1.createSolar);
router.route('/solar/:id')
    .get(solar_controller_1.getSolar)
    .put(solar_controller_1.updateSolar)
    .delete(solar_controller_1.deleteSolar);
//Hidraulica
router.route('/hidra')
    .get(hidraulica_controller_1.getHidras)
    .post(multerCFG_1.default.single('image'), hidraulica_controller_1.createHidra);
router.route('/hidra/:id')
    .get(hidraulica_controller_1.getHidra)
    .put(hidraulica_controller_1.updateHidra)
    .delete(hidraulica_controller_1.deleteHidra);
//solicitud
router.route('/sol')
    .get(solicitud_controller_1.getSolicitudes)
    .post(solicitud_controller_1.createSolicitud);
router.route('/sol/:id')
    .get(solicitud_controller_1.getSolicitud)
    .delete(solicitud_controller_1.deleteSolicitud)
    .put(solicitud_controller_1.updateSolicitud);
exports.default = router;
