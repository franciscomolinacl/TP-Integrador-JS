import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

try {
  await client.connect();

  const resultado = await client.query(`
    SELECT
      id,
      nombre,
      correo,
      activo
    FROM usuarios
    ORDER BY id
  `);

  console.table(resultado.rows);
} catch (error) {
  console.error(
    "Error al consultar usuarios:",
    error.message
  );
} finally {
  await client.end();
}