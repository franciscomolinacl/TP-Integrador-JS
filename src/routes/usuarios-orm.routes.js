import {
  Router
} from "express";
import {
  listarUsuariosOrm
} from "../controllers/usuarios-orm.controller.js";

const router =
  Router();

router.get(
  "/",
  listarUsuariosOrm
);

export default router;