import {
  obtenerUsuariosOrm
} from "../services/usuarios-orm.service.js";

export async function listarUsuariosOrm(
  req,
  res,
  next
) {
  try {
    const usuarios =
      await obtenerUsuariosOrm();

    res.status(200).json({
      status:
        "ok",
      message:
        "Usuarios obtenidos mediante Sequelize",
      data:
        usuarios,
      meta: {
        total:
          usuarios.length,
        acceso:
          "ORM"
      }
    });
  } catch (error) {
    next(error);
  }
}