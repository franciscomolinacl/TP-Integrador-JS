import { Sequelize } from "sequelize";
import "dotenv/config"; // 👈 Crucial para que lea tu archivo .env local

const isProduction = process.env.NODE_ENV === "production";

export const sequelize = process.env.DATABASE_URL
  ? // Opción A: Si existe la URL (como en Render), la usamos directamente
    new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: isProduction ? false : console.log,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : // Opción B: Si estás en local, usamos el objeto con las variables separadas
    new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      dialect: "postgres",
      logging: console.log,
      dialectOptions: {}, // Sin SSL para tu Postgres local estándar
    });
