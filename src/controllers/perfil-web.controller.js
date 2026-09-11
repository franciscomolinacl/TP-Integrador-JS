import {
  obtenerPerfilConUsuario,
  crearPerfilOrm,
  actualizarPerfilOrm
} from "../services/usuarios-orm.service.js";
import {
  obtenerUsuarioOrm
} from "../services/usuarios-orm.service.js";
import {
  guardarArchivo,
  eliminarArchivo
} from "../services/upload.service.js";

export async function mostrarPerfil(
  req,
  res,
  next
) {
  try {
    const usuario =
      await obtenerUsuarioOrm(
        req.params.id
      );

    if (!usuario) {
      return res
        .status(404)
        .render("error", {
          titulo:
            "Usuario no encontrado",
          statusCode: 404,
          mensaje:
            "El usuario no existe."
        });
    }

    const perfil =
      await obtenerPerfilConUsuario(
        req.params.id
      );

    return res.render(
      "perfil",
      {
        titulo: `Perfil de ${usuario.nombre}`,
        usuario:
          usuario.toJSON(),
        perfil,
        tienePerfil:
          perfil !== null
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function mostrarFormularioEditarPerfil(
  req,
  res,
  next
) {
  try {
    const usuario =
      await obtenerUsuarioOrm(
        req.params.id
      );

    if (!usuario) {
      return res
        .status(404)
        .render("error", {
          titulo:
            "Usuario no encontrado",
          statusCode: 404,
          mensaje:
            "El usuario no existe."
        });
    }

    const perfil =
      await obtenerPerfilConUsuario(
        req.params.id
      );

    return res.render(
      "perfil/editar",
      {
        titulo: perfil
          ? "Editar perfil"
          : "Crear perfil",
        usuario:
          usuario.toJSON(),
        perfil,
        valores: {
          telefono:
            perfil?.telefono ||
            "",
          direccion:
            perfil?.direccion ||
            "",
          fechaNacimiento:
            perfil?.fechaNacimiento ||
            ""
        }
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function guardarPerfil(
  req,
  res,
  next
) {
  try {
    const usuarioId =
      Number(req.params.id);

    const perfilExistente =
      await obtenerPerfilConUsuario(
        usuarioId
      );

    if (perfilExistente) {
      await actualizarPerfilOrm(
        usuarioId,
        {
          telefono:
            req.body.telefono ||
            null,
          direccion:
            req.body.direccion ||
            null,
          fechaNacimiento:
            req.body.fechaNacimiento ||
            null
        }
      );
    } else {
      await crearPerfilOrm({
        usuarioId,
        telefono:
          req.body.telefono ||
          null,
        direccion:
          req.body.direccion ||
          null,
        fechaNacimiento:
          req.body.fechaNacimiento ||
          null
      });
    }

    return res.redirect(
      `/usuarios/${usuarioId}/perfil`
    );
  } catch (error) {
    if (
      error.statusCode ===
      400
    ) {
      const usuario =
        await obtenerUsuarioOrm(
          req.params.id
        );

      return res
        .status(
          error.statusCode
        )
        .render(
          "perfil/editar",
          {
            titulo:
              "Editar perfil",
            usuario:
              usuario.toJSON(),
            perfil: null,
            error:
              error.message,
            valores: {
              telefono:
                req.body
                  .telefono ||
                "",
              direccion:
                req.body
                  .direccion ||
                "",
              fechaNacimiento:
                req.body
                  .fechaNacimiento ||
                ""
            }
          }
        );
    }

    return next(error);
  }
}

export async function subirAvatar(
  req,
  res,
  next
) {
  try {
    const usuarioId = Number(req.params.id);
    const archivo = req.files?.avatar;

    if (!archivo) {
      return res.status(400).render("perfil/editar", {
        titulo: "Editar perfil",
        usuario: (await obtenerUsuarioOrm(usuarioId)).toJSON(),
        perfil: await obtenerPerfilConUsuario(usuarioId),
        error: "Debes seleccionar un archivo.",
        valores: {
          telefono: req.body.telefono || "",
          direccion: req.body.direccion || "",
          fechaNacimiento: req.body.fechaNacimiento || ""
        }
      });
    }

    const resultado = await guardarArchivo(archivo);

    const perfilExistente = await obtenerPerfilConUsuario(usuarioId);

    if (perfilExistente && perfilExistente.avatar) {
      await eliminarArchivo(perfilExistente.avatar);
    }

    await actualizarPerfilOrm(usuarioId, {
      avatar: resultado.nombre
    });

    return res.redirect(`/usuarios/${usuarioId}/perfil`);
  } catch (error) {
    if (error.statusCode === 400 || error.statusCode === 415 || error.statusCode === 413) {
      const usuario = await obtenerUsuarioOrm(req.params.id);
      const perfil = await obtenerPerfilConUsuario(req.params.id);

      return res.status(error.statusCode).render("perfil/editar", {
        titulo: "Editar perfil",
        usuario: usuario.toJSON(),
        perfil,
        error: error.message,
        valores: {
          telefono: perfil?.telefono || "",
          direccion: perfil?.direccion || "",
          fechaNacimiento: perfil?.fechaNacimiento || ""
        }
      });
    }

    return next(error);
  }
}
