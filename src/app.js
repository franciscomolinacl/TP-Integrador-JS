import "dotenv/config";
import express from "express";
import morgan from "morgan";
import hbs from "hbs";
import { registrarHelpersHandlebars } from "./config/handlebars.js";
import { agregarContextoPeticion } from "./middlewares/agregarContextoPeticion.js";
import { agregarDatosVista } from "./middlewares/agregarDatosVista.js";
import { manejarErrores } from "./middlewares/manejarErrores.js";
import { rutaNoEncontrada } from "./middlewares/rutaNoEncontrada.js";
import indexRouter from "./routes/index.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import webRouter from "./routes/web.routes.js";
import { obtenerMensajeInicio } from "./utils/mensajes.js";
import {
  RUTA_PARTIALS,
  RUTA_PUBLIC,
  RUTA_VIEWS
} from "./utils/rutas.js";
import {
  registrarAcceso
} from "./middlewares/registrarAcceso.js";
import {
  pool,
  probarConexion
} from "./config/database.js";

import {
  validarVariablesEntorno
} from "./config/env.js";

import {
  sequelize
} from "./config/sequelize.js";

import {
  probarSequelize
} from "./ejemplos/probar-sequelize.js";
validarVariablesEntorno();

import usuariosOrmRouter
  from "./routes/usuarios-orm.routes.js";

import pedidosOrmRouter
  from "./routes/pedidos-orm.routes.js";

await probarSequelize();
try {
  await probarConexion();
} catch (error) {
  console.error(
    "La aplicación no puede iniciar sin base de datos."
  );

  console.error(error.message);

  process.exitCode = 1;
  throw error;
}

import usuariosV1Router
  from "./routes/usuarios-v1.routes.js";

import pedidosV1Router
  from "./routes/pedidos-v1.routes.js";

import authRouter
  from "./routes/auth.routes.js";

import fileUpload
  from "express-fileupload";

import uploadRouter
  from "./routes/upload.routes.js";

import { cargarSesionWeb }
  from "./middlewares/auth-web.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.nombreAplicacion = "Node & Express Web App";
app.locals.anioActual = new Date().getFullYear();

app.set("view engine", "hbs");
app.set("views", RUTA_VIEWS);

hbs.registerPartials(RUTA_PARTIALS);
registrarHelpersHandlebars();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  req.cookies = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(";").forEach(cookie => {
      const [name, ...rest] = cookie.split("=");
      req.cookies[name.trim()] = rest.join("=").trim();
    });
  }

  res.cookie = function(name, value, options = {}) {
    let cookie = `${name}=${value}`;
    if (options.httpOnly) cookie += "; HttpOnly";
    if (options.secure) cookie += "; Secure";
    if (options.sameSite) cookie += "; SameSite=" + options.sameSite;
    if (options.maxAge) cookie += "; Max-Age=" + (options.maxAge / 1000);
    const existing = res.getHeader("Set-Cookie") || [];
    const cookies = Array.isArray(existing) ? existing : [existing];
    cookies.push(cookie);
    res.setHeader("Set-Cookie", cookies);
    return res;
  };

  res.clearCookie = function(name) {
    res.cookie(name, "", { maxAge: 0 });
    return res;
  };

  next();
});

app.use(agregarContextoPeticion);
app.use(registrarAcceso);
app.use(cargarSesionWeb);
app.use(agregarDatosVista);
app.use(express.static(RUTA_PUBLIC));

app.use(
  fileUpload()
);

app.use("/", indexRouter);
app.use("/", webRouter);
app.use("/api/usuarios", usuariosRouter);

app.use(
  "/api/orm/usuarios",
  usuariosOrmRouter
);

app.use(
  "/api/orm/pedidos",
  pedidosOrmRouter
);

app.use(
  "/api/v1/usuarios",
  usuariosV1Router
);

app.use(
  "/api/v1/pedidos",
  pedidosV1Router
);

app.use(
  "/api/v1/auth",
  authRouter
);

app.use(
  "/api/v1/upload",
  uploadRouter
);

app.use(rutaNoEncontrada);
app.use(manejarErrores);


const servidor = app.listen(PORT, () => {
  console.log(
    obtenerMensajeInicio(PORT)
  );
});