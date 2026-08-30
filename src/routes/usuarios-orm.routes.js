import {
  Router
} from "express";
import {
  listarUsuariosOrm,
  obtenerUsuarioRelacionado,
  obtenerUsuarioConPedidosController
} from "../controllers/usuarios-orm.controller.js";

const router =
  Router();

router.get(
  "/",
  listarUsuariosOrm
);

router.get(
  "/",
  listarUsuariosOrm
);

router.get(
  "/:id/relaciones",
  obtenerUsuarioRelacionado
);

router.get(
  "/:id/pedidos",
  obtenerUsuarioConPedidosController
);

export default router;