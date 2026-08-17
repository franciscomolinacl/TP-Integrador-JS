import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarios
} from "../controllers/usuarios.controller.js";
import { validarIdUsuario } from "../middlewares/validarIdUsuario.js";
import { mostrarEstadoDatabase }  from "../controllers/database.controller.js";
import { contarUsuarios }  from "../services/usuarios.service.js";

const router = Router();

router.get("/db-status", mostrarEstadoDatabase);
router.get("/api/usuarios/resumen", contarUsuarios);
router.get("/usuarios", mostrarUsuarios);
router.get(
  "/usuarios/:id",
  validarIdUsuario,
  mostrarUsuario
);

export default router;