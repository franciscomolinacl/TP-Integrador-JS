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

export async function insertar({
  nombre,
  correo,
  activo
}) {
  const resultado = await pool.query(
    `
      INSERT INTO usuarios (
        nombre,
        correo,
        activo
      )
      VALUES (
        $1,
        $2,
        $3
      )
      RETURNING
        id,
        nombre,
        correo,
        activo,
        created_at,
        updated_at
    `,
    [
      nombre,
      correo,
      activo
    ]
  );

  return resultado.rows[0];
}

export async function actualizar(
  id,
  cambios
) {
  const sets = [];
  const valores = [];

  if (cambios.nombre !== undefined) {
    valores.push(cambios.nombre);

    sets.push(
      `nombre = $${valores.length}`
    );
  }

  if (cambios.correo !== undefined) {
    valores.push(cambios.correo);

    sets.push(
      `correo = $${valores.length}`
    );
  }

  if (cambios.activo !== undefined) {
    valores.push(cambios.activo);

    sets.push(
      `activo = $${valores.length}`
    );
  }

  if (sets.length === 0) {
    return null;
  }

  valores.push(id);

  const parametroId =
    `$${valores.length}`;

  const resultado = await pool.query(
    `
      UPDATE usuarios
      SET
        ${sets.join(", ")},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parametroId}
      RETURNING
        id,
        nombre,
        correo,
        activo,
        created_at,
        updated_at
    `,
    valores
  );

  return resultado.rows[0] ?? null;
}

export async function eliminar(id) {
  const resultado = await pool.query(
    `
      DELETE FROM usuarios
      WHERE id = $1
      RETURNING
        id,
        nombre,
        correo,
        activo
    `,
    [id]
  );

  return resultado.rows[0] ?? null;
}