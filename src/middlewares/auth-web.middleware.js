import jwt from "jsonwebtoken";
import { Perfil } from "../models/index.js";

const COOKIE_NAME = "token_jwt";

export async function cargarSesionWeb(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    req.usuario = null;
    res.locals.usuario = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"]
    });

    const usuario = {
      id: parseInt(payload.sub, 10),
      correo: payload.correo,
      avatar: null
    };

    const perfil = await Perfil.findOne({
      where: { usuarioId: usuario.id },
      attributes: ["avatar"]
    });

    if (perfil) {
      usuario.avatar = perfil.avatar;
    }

    req.usuario = usuario;
    res.locals.usuario = usuario;
  } catch {
    req.usuario = null;
    res.locals.usuario = null;
    res.clearCookie(COOKIE_NAME);
  }

  next();
}

export function protegerRutaWeb(req, res, next) {
  if (!req.usuario) {
    return res.redirect("/login");
  }
  next();
}
