import pg from "pg";

const { Pool } = pg;

// Detectamos si estamos en Render (producción)
const isProduction = process.env.NODE_ENV === "production";

export const pool = new Pool({
  // En Render usa la URL completa; en la computadora del profesor usa las variables por separado
  connectionString: isProduction ? process.env.DATABASE_URL : undefined,
  host: isProduction ? undefined : process.env.DB_HOST,
  port: isProduction ? undefined : Number(process.env.DB_PORT || 5432),
  database: isProduction ? undefined : process.env.DB_NAME,
  user: isProduction ? undefined : process.env.DB_USER,
  password: isProduction ? undefined : process.env.DB_PASSWORD,
  
  // Mantenemos tus configuraciones de rendimiento originales
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  
  // SSL para render+neon
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.on("error", (error) => {
  console.error(
    "Error inesperado en el pool PostgreSQL:",
    error.message
  );
});

export async function probarConexion() {
  const resultado = await pool.query(
    "SELECT CURRENT_DATABASE() AS database"
  );

  console.log(
    `PostgreSQL conectado: ${resultado.rows[0].database}`
  );

  return true;
}

export async function cerrarPool() {
  await pool.end();
}
