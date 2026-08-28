import {
    sequelize
} from "../config/sequelize.js";
export async function probarSequelize() {
  try {
    await sequelize.authenticate();

    console.log(
      "Sequelize conectado correctamente."
    );

    return true;
  } catch (error) {
    console.error(
      "Error de conexión Sequelize:",
      error.message
    );

    throw error;
  }
}