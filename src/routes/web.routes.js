import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarios,
  obtenerResumenUsuarios
} from "../controllers/usuarios.controller.js";
import { validarIdUsuario } from "../middlewares/validarIdUsuario.js";
import { mostrarEstadoDatabase }  from "../controllers/database.controller.js";
import { 
  crearUsuario 
}  from "../services/usuarios.service.js";
import { 
  mostrarFormularioNuevoUsuario, 
  crearUsuarioWeb, 
  actualizarUsuarioWeb, 
  mostrarFormularioEditarUsuario, 
  eliminarUsuarioWeb,
  registrarUsuarioCompletoWeb,
  mostrarRegistroCompleto,
  mostrarFormularioNuevoPedido
} from "../controllers/usuarios-web.controller.js";
import { 
  listarPedidosWeb,
  crearPedidoWeb,
  editarEstadoPedidoWeb,
  eliminarPedidoWeb
} from "../controllers/pedidos-orm.controller.js";
import { 
  mostrarPerfil,
  mostrarFormularioEditarPerfil,
  guardarPerfil
} from "../controllers/perfil-web.controller.js";

const router = Router();

router.get("/db-status", mostrarEstadoDatabase);
router.get("/api/usuarios/resumen", obtenerResumenUsuarios);
router.get("/usuarios", mostrarUsuarios);

router.get(
  "/usuarios/nuevo",
  mostrarFormularioNuevoUsuario
);

router.get(
  "/usuarios/registro-completo",
  mostrarRegistroCompleto
);

router.post(
  "/usuarios/registro-completo",
  registrarUsuarioCompletoWeb
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

router.get(
  "/usuarios/:id/perfil",
  mostrarPerfil
);

router.get(
  "/usuarios/:id/perfil/editar",
  mostrarFormularioEditarPerfil
);

router.post(
  "/usuarios/:id/perfil/editar",
  guardarPerfil
);

router.get(
  "/pedidos",
  listarPedidosWeb
);

router.get(
  "/pedidos/nuevo",
  mostrarFormularioNuevoPedido
);

router.post(
  "/pedidos",
  crearPedidoWeb
);

router.post(
  "/pedidos/:id/editar-estado",
  editarEstadoPedidoWeb
);

router.post(
  "/pedidos/:id/eliminar",
  eliminarPedidoWeb
);

export default router;