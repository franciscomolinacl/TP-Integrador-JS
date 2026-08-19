import { crearErrorHttp } from "../utils/errores.js";
import { RUTA_USUARIOS } from "../utils/rutas.js";
import {
  convertirBooleano,
  esCorreoValido,
  normalizarTexto,
  validarId,
  validarNombre
} from "../utils/validaciones.js";
import {
  buscarPorId,
  buscarTodos,
  insertar,
  actualizar,
  eliminar
} from "../repositories/usuarios.repository.js";

export async function obtenerUsuarioPorId(id) {
  const idNumerico = validarId(id);

  return buscarPorId(idNumerico);
}

async function guardarUsuarios(usuarios) {
  await escribirJson(RUTA_USUARIOS, usuarios);
}

function generarSiguienteId(usuarios) {
  if (usuarios.length === 0) {
    return 1;
  }

  return Math.max(
    ...usuarios.map((usuario) => usuario.id)
  ) + 1;
}

function existeCorreo(
  usuarios,
  correo,
  idIgnorado = null
) {
  const correoNormalizado = correo.toLowerCase();

  return usuarios.some((usuario) => {
    return (
      usuario.correo.toLowerCase() === correoNormalizado &&
      usuario.id !== idIgnorado
    );
  });
}

export async function obtenerUsuarios() {
  const usuarios = await buscarTodos();

  return usuarios;
}
export async function contarUsuarios() {
  const resultado = await pool.query(`
    SELECT COUNT(*) AS total
    FROM usuarios
  `);

  return Number(
    resultado.rows[0].total
  );
}

export async function crearUsuario(datos) {
  const nombre =
    validarNombre(datos.nombre);

  const correo = datos.correo;

  const activo =
    datos.activo === undefined
      ? true
      : convertirBooleano(
          datos.activo
        );

  return insertar({
    nombre,
    correo,
    activo
  });
}

export async function modificarUsuario(
  id,
  datos
) {
  const idNumerico =
    validarId(id);

  const cambios = {};

  if (datos.nombre !== undefined) {
    cambios.nombre =
      validarNombre(datos.nombre);
  }

  if (datos.correo !== undefined) {
    cambios.correo =
      esCorreoValido(datos.correo);
  }

  if (datos.activo !== undefined) {
    cambios.activo =
      convertirBooleano(
        datos.activo
      );
  }

  if (
    Object.keys(cambios).length === 0
  ) {
    throw new Error(
      "Debes enviar al menos un campo modificable."
    );
  }

  const usuario =
    await actualizar(
      idNumerico,
      cambios
    );

  return usuario;
}

export async function eliminarUsuario(id) {
  const idNumerico =
    validarId(id);

  const existente =
    await buscarPorId(idNumerico);

  if (!existente) {
    return null;
  }

  return eliminar(idNumerico);
}
