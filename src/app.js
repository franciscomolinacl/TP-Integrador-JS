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

validarVariablesEntorno();

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

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.nombreAplicacion = "Node & Express Web App";
app.locals.anioActual = new Date().getFullYear();

app.set("view engine", "hbs");
app.set("views", RUTA_VIEWS);

hbs.registerPartials(RUTA_PARTIALS);
registrarHelpersHandlebars();

app.use(morgan("dev"));
app.use(agregarContextoPeticion);
app.use(registrarAcceso);
app.use(agregarDatosVista);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static(RUTA_PUBLIC));

app.use("/", indexRouter);
app.use("/", webRouter);
app.use("/api/usuarios", usuariosRouter);

app.use(rutaNoEncontrada);
app.use(manejarErrores);


const servidor = app.listen(PORT, () => {
  console.log(
    obtenerMensajeInicio(PORT)
  );
});