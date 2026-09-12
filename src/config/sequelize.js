import { Sequelize } from "sequelize";

// Detectamos si estamos en producción (Render)
const isProduction = process.env.NODE_ENV === "production";

export const sequelize = new Sequelize(
  process.env.DATABASE_URL || {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
  },
  {
    dialect: "postgres",
    logging: console.log,
    
    // El SSL solo se activará si está en Render
    dialectOptions: isProduction ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {} // En local sin SSL
  }
);
