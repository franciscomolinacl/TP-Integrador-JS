import {
  pool
} from "../config/database.js";

export async function buscarTodos() {
  const resultado = await pool.query(`
    SELECT
      id,
      nombre,
      correo,
      activo,
      created_at,
      updated_at
    FROM usuarios
    ORDER BY id
  `);

  return resultado.rows;
}

export async function buscarPorIdFijo() {
  const resultado = await pool.query(`
    SELECT
      id,
      nombre,
      correo,
      activo
    FROM usuarios
    WHERE id = 1
  `);

  return resultado.rows[0] ?? null;
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

export async function buscarPorId(id) {
  const resultado = await pool.query(
    `
      SELECT
        id,
        nombre,
        correo,
        activo,
        created_at,
        updated_at
      FROM usuarios
      WHERE id = $1
    `,
    [id]
  );

  return resultado.rows[0] ?? null;
}

export async function buscarPorNombre(nombre) {
  const resultado = await pool.query(
    `
      SELECT
        id,
        nombre,
        correo,
        activo
      FROM usuarios
      WHERE nombre ILIKE $1
      ORDER BY nombre
    `,
    [`%${nombre}%`]
  );

  return resultado.rows;
}