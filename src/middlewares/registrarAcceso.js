import { agregarLinea } from "../utils/archivos.js";
import { RUTA_LOG_ACCESOS } from "../utils/rutas.js";

const RE_ESTATICOS = /\.(css|js|png|jpg|jpeg|svg|ico|gif|webp)$/i;

export async function registrarAcceso(req, res, next) {
  if (RE_ESTATICOS.test(req.path)) {
    return next(); // Return directo para cortar la ejecución limpiamente
  }

  const fechaHora = req.requestTime || new Date().toISOString();

  const linea = [
    fechaHora,
    req.method,
    req.originalUrl
  ].join(" | ");

  try {
    await agregarLinea(RUTA_LOG_ACCESOS, linea);
  } catch (error) {
    console.error("No fue posible registrar el acceso:", error);
  }

  next();
}
