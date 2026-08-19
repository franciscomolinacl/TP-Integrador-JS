import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarios
} from "../controllers/usuarios.controller.js";
import { validarIdUsuario } from "../middlewares/validarIdUsuario.js";
import { mostrarEstadoDatabase }  from "../controllers/database.controller.js";
import { 
  contarUsuarios, 
  crearUsuario 
}  from "../services/usuarios.service.js";
import { 
  mostrarFormularioNuevoUsuario, 
  crearUsuarioWeb, 
  actualizarUsuarioWeb, 
  mostrarFormularioEditarUsuario, 
  eliminarUsuarioWeb 
} from "../controllers/usuarios-web.controller.js";

const router = Router();

router.get("/db-status", mostrarEstadoDatabase);
router.get("/api/usuarios/resumen", contarUsuarios);
router.get("/usuarios", mostrarUsuarios);

router.get(
  "/usuarios/nuevo",
  mostrarFormularioNuevoUsuario
);

router.get(
  "/usuarios/:id",
  validarIdUsuario,
  mostrarUsuario
);

router.get(
  "/usuarios/:id/editar",
  mostrarFormularioEditarUsuario
);

router.post(
  "/usuarios/:id/editar",
  actualizarUsuarioWeb
);

router.post(
  "/usuarios",
  crearUsuarioWeb
);

router.post(
  "/usuarios/:id/eliminar",
  eliminarUsuarioWeb
);

export default router;