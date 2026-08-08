import fs from 'fs';
import path from 'path';

export function mostrarInicio(req, res) {
  try {
    const rutaPackage = path.join(process.cwd(), 'package.json');
    const packageData = JSON.parse(fs.readFileSync(rutaPackage, 'utf8'));

    const dependencias = packageData.dependencies || {};

    const tecnologias = [
      `Node.js (v${process.versions.node})`, // Obtiene la versión actual de Node en el servidor
      ...Object.entries(dependencias).map(([nombre, version]) => {
        const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        const versionLimpia = version.replace(/[\^~]/g, '');
        
        return `${nombreFormateado} (v${versionLimpia})`;
      })
    ];

    res.status(200).render("home", {
      titulo: "Node & Express Web App",
      mensaje: "Servidor funcionando correctamente.",
      tecnologias,
      anioActual: new Date().getFullYear()
    });

  } catch (error) {
    console.error("Error al leer las tecnologías:", error);
    
    res.status(200).render("home", {
      titulo: "Node & Express Web App",
      mensaje: "Servidor funcionando correctamente.",
      tecnologias: ["Node.js", "Express", "Handlebars"],
      anioActual: new Date().getFullYear()
    });
  }
}

export function mostrarEstado(req, res) {
  const uptimeSegundos = process.uptime();
  const horas = Math.floor(uptimeSegundos / 3600);
  const minutos = Math.floor((uptimeSegundos % 3600) / 60);
  const segundos = Math.floor(uptimeSegundos % 60);
  const uptimeFormateado = `${horas}h ${minutos}m ${segundos}s`;

  const horaServidor = new Date().toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  res.status(200).render("status", {
    titulo: "Estado del Servidor",
    status: "ok",
    message: "Servidor funcionando correctamente",
    info: {
      node: process.version,
      pid: process.pid,
      uptime: uptimeFormateado,
      environment: (process.env.NODE_ENV || "development").toUpperCase(),
      requestTime: req.requestTime || horaServidor
    }
  });
}
