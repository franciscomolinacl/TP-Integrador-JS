import { Router } from "express";
import jwt from "jsonwebtoken";
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
  eliminarPedidoWeb,
  listarPedidosUsuarioWeb
} from "../controllers/pedidos-orm.controller.js";
import { 
  mostrarPerfil,
  mostrarFormularioEditarPerfil,
  guardarPerfil,
  subirAvatar
} from "../controllers/perfil-web.controller.js";
import {
  autenticarUsuario,
  registrarUsuario
} from "../services/auth.service.js";
import { protegerRutaWeb } from "../middlewares/auth-web.middleware.js";

const COOKIE_NAME = "token_jwt";

const router = Router();

router.get("/db-status", mostrarEstadoDatabase);
router.get("/api/usuarios/resumen", obtenerResumenUsuarios);
router.get("/usuarios", protegerRutaWeb, mostrarUsuarios);

router.get(
  "/usuarios/nuevo",
  protegerRutaWeb,
  mostrarFormularioNuevoUsuario
);

router.get(
  "/usuarios/registro-completo",
  protegerRutaWeb,
  mostrarRegistroCompleto
);

router.post(
  "/usuarios/registro-completo",
  protegerRutaWeb,
  registrarUsuarioCompletoWeb
);

router.get(
  "/usuarios/:id",
  protegerRutaWeb,
  validarIdUsuario,
  mostrarUsuario
);

router.get(
  "/usuarios/:id/editar",
  protegerRutaWeb,
  mostrarFormularioEditarUsuario
);

router.post(
  "/usuarios/:id/editar",
  protegerRutaWeb,
  actualizarUsuarioWeb
);

router.post(
  "/usuarios",
  protegerRutaWeb,
  crearUsuarioWeb
);

router.post(
  "/usuarios/:id/eliminar",
  protegerRutaWeb,
  eliminarUsuarioWeb
);

router.get(
  "/usuarios/:id/perfil",
  protegerRutaWeb,
  mostrarPerfil
);

router.get(
  "/usuarios/:id/perfil/editar",
  protegerRutaWeb,
  mostrarFormularioEditarPerfil
);

router.post(
  "/usuarios/:id/perfil/editar",
  protegerRutaWeb,
  guardarPerfil
);

router.post(
  "/usuarios/:id/perfil/avatar",
  protegerRutaWeb,
  subirAvatar
);

router.get(
  "/usuarios/:id/pedidos",
  protegerRutaWeb,
  listarPedidosUsuarioWeb
);

router.get(
  "/pedidos",
  protegerRutaWeb,
  listarPedidosWeb
);

router.get(
  "/pedidos/nuevo",
  protegerRutaWeb,
  mostrarFormularioNuevoPedido
);

router.post(
  "/pedidos",
  protegerRutaWeb,
  crearPedidoWeb
);

router.post(
  "/pedidos/:id/editar-estado",
  protegerRutaWeb,
  editarEstadoPedidoWeb
);

router.post(
  "/pedidos/:id/eliminar",
  protegerRutaWeb,
  eliminarPedidoWeb
);

router.get(
  "/login",
  (req, res) => {
    res.render("auth/login", {
      titulo: "Iniciar sesión",
      valores: { correo: "" }
    });
  }
);

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const resultado = await autenticarUsuario(req.body);

      res.cookie(COOKIE_NAME, resultado.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
      });

      return res.redirect("/usuarios");
    } catch (error) {
      if (error.statusCode === 400 || error.statusCode === 401) {
        return res.status(error.statusCode).render("auth/login", {
          titulo: "Iniciar sesión",
          error: error.message,
          valores: { correo: req.body.correo ?? "" }
        });
      }
      return next(error);
    }
  }
);

router.get(
  "/registro",
  (req, res) => {
    res.render("auth/registro", {
      titulo: "Crear cuenta",
      valores: { nombre: "", correo: "" }
    });
  }
);

router.post(
  "/registro",
  async (req, res, next) => {
    try {
      const usuario = await registrarUsuario(req.body);

      const resultado = await autenticarUsuario({
        correo: req.body.correo,
        password: req.body.password
      });

      res.cookie(COOKIE_NAME, resultado.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
      });

      return res.redirect("/usuarios");
    } catch (error) {
      if (error.statusCode === 400 || error.statusCode === 409) {
        return res.status(error.statusCode).render("auth/registro", {
          titulo: "Crear cuenta",
          error: error.message,
          valores: {
            nombre: req.body.nombre ?? "",
            correo: req.body.correo ?? ""
          }
        });
      }
      return next(error);
    }
  }
);

router.post(
  "/logout",
  (req, res) => {
    res.clearCookie(COOKIE_NAME);
    return res.redirect("/login");
  }
);

export default router;