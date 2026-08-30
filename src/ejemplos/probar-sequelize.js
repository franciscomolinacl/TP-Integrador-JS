import "dotenv/config"; 
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

// probarSequelize()
//   .then(() => {
//     console.log("Prueba finalizada con éxito.");
//     process.exit(0); // Cierra el proceso de Node limpiamente
//   })
//   .catch((err) => {
//     console.error("Prueba fallida.");
//     process.exit(1); // Cierra el proceso indicando un error
//   });