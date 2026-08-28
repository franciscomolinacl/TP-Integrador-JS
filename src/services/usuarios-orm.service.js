import {
  Usuario
} from "../models/Usuario.js";

export async function obtenerUsuariosOrm() {
  const usuarios =
    await Usuario.findAll({
      attributes: [
        "id",
        "nombre",
        "correo",
        "activo",
        "createdAt",
        "updatedAt"
      ],
      order: [
        [
          "id",
          "ASC"
        ]
      ]
    });

  return usuarios.map(
    (usuario) =>
      usuario.toJSON()
  );
}

export async function obtenerUsuarioOrm(
  id
) {
  const idNumerico =
    validarId(id);

  return Usuario.findByPk(
    idNumerico
  );
}

export async function crearUsuarioOrm(
  datos
) {
  const nombre =
    validarNombre(
      datos.nombre
    );

  const correo =
    validarCorreo(
      datos.correo
    );

  const activo =
    datos.activo === undefined
      ? true
      : convertirBooleano(
          datos.activo
        );

  return Usuario.create({
    nombre,
    correo,
    activo
  });
}

export async function modificarUsuarioOrm(
  id,
  datos
) {
  const idNumerico =
    validarId(id);

  const usuario =
    await Usuario.findByPk(
      idNumerico
    );

  if (!usuario) {
    return null;
  }

  const cambios = {};

  if (datos.nombre !== undefined) {
    cambios.nombre =
      validarNombre(
        datos.nombre
      );
  }

  if (datos.correo !== undefined) {
    cambios.correo =
      validarCorreo(
        datos.correo
      );
  }

  if (datos.activo !== undefined) {
    cambios.activo =
      convertirBooleano(
        datos.activo
      );
  }

  await usuario.update(
    cambios
  );

  return usuario;
}

export async function eliminarUsuarioOrm(
  id
) {
  const idNumerico =
    validarId(id);

  const usuario =
    await Usuario.findByPk(
      idNumerico
    );

  if (!usuario) {
    return null;
  }

  const datos =
    usuario.toJSON();

  await usuario.destroy();

  return datos;
}