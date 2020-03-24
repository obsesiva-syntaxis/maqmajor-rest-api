"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maquina_controller_1 = require("../controllers/maquina.controller");
const multerCFG_1 = __importDefault(require("../lib/multerCFG"));
const router = express_1.Router();
router.route('/maq')
    .get(maquina_controller_1.getMaquinas)
    .post(multerCFG_1.default.single('image'), maquina_controller_1.createMaquina);
router.route('/maq/:id')
    .get(maquina_controller_1.getMaquina)
    .delete(maquina_controller_1.deleteMaquina)
    .put(maquina_controller_1.updateMaquina);
exports.default = router;
