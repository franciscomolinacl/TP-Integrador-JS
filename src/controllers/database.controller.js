import {
  pool
} from "../config/database.js";

export async function mostrarEstadoDatabase(
  req,
  res,
  next
) {
  try {
    const resultado = await pool.query(`
      SELECT
        CURRENT_DATABASE() AS database,
        CURRENT_USER AS usuario,
        NOW() AS fecha
    `);

    res.status(200).json({
      status: "ok",
      message: "PostgreSQL disponible",
      data: resultado.rows[0]
    });
  } catch (error) {
    next(error);
  }
}