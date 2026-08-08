#!/bin/bash

# Variables
proyecto="node-express-web-app"
descripcion="Proyecto del Módulo 6: TP Integrador JS"
nombre="Francisco Molina"

# Se crea directorio de proyecto e ingresamos
mkdir "$proyecto" 
cd "$proyecto"

# Inicializamos el proyecto
npm init -y

# Instalación de dependencias
npm i express dotenv morgan hbs yargs
npm i --save-dev nodemon

# Capturar versiones
ver_node=$(node --version)
# Usamos npm view para traer la versión exacta instalada sin romper el texto
ver_express=$(npm query "#express" | grep version | cut -d'"' -f4)
ver_dotenv=$(npm list dotenv --depth=0 --json | node -p "JSON.parse(require('fs').readFileSync(0)).dependencies?.dotenv?.version || ''")
ver_nodemon=$(npm list nodemon --depth=0 --json | node -p "JSON.parse(require('fs').readFileSync(0)).dependencies?.nodemon?.version || ''")
ver_morgan=$(npm list morgan --depth=0 --json | node -p "JSON.parse(require('fs').readFileSync(0)).dependencies?.morgan?.version || ''")
ver_yargs=$(npm list yargs --depth=0 --json | node -p "JSON.parse(require('fs').readFileSync(0)).dependencies?.yargs?.version || ''")
ver_hbs=$(npm list hbs --depth=0 --json | node -p "JSON.parse(require('fs').readFileSync(0)).dependencies?.hbs?.version || ''")


# Agregamos estas lineas al .gitignore
echo 'node_modules/' > .gitignore
echo '.env' >> .gitignore

# Agregamos estas lineas al .env
echo 'PORT=3000' > .env
echo 'NODE_ENV=development' >> .env

# Agregamos estas lineas al .env.example
echo 'PORT=4000' > .env.example
echo 'NODE_ENV=development' >> .env.example

# Editamos el package.json con las variables ya llenas
echo '{' > package.json
echo '  "name": "'$proyecto'-app",' >> package.json
echo '  "version": "1.0.0",' >> package.json
echo '  "description": "'$descripcion'",' >> package.json
echo '  "main": "src/app.js",' >> package.json
echo '  "type": "module",' >> package.json
echo '  "scripts": {' >> package.json
echo '    "start": "node src/app.js",' >> package.json
echo '    "dev": "nodemon src/app.js",' >> package.json
echo '    "cli": "node src/cli.js"' >> package.json
echo '  },' >> package.json
echo '  "keywords": [' >> package.json
echo '    "node",' >> package.json
echo '    "express",' >> package.json
echo '    "backend"' >> package.json
echo '  ],' >> package.json
echo '  "author": "'$nombre'",' >> package.json
echo '  "license": "ISC",' >> package.json
echo '  "dependencies": {' >> package.json
echo '    "dotenv": "^'$ver_dotenv'",' >> package.json
echo '    "express": "^'$ver_express'",' >> package.json
echo '    "hbs": "^'$ver_hbs'",' >> package.json
echo '    "morgan": "^'$ver_morgan'",' >> package.json
echo '    "yargs": "^'$ver_yargs'"' >> package.json
echo '  },' >> package.json
echo '  "devDependencies": {' >> package.json
echo '    "nodemon": "^'$ver_nodemon'"' >> package.json
echo '  }' >> package.json
echo '}' >> package.json

# Creación directorio src e ingresamos a el
mkdir src
cd src

# Creamos el archivo app.js con una base
echo 'import "dotenv/config";' > app.js
echo 'import express from "express";' >> app.js
echo '' >> app.js
echo 'const app = express();' >> app.js
echo 'const PORT = process.env.PORT || 3000;' >> app.js
echo '' >> app.js
echo 'app.get("/", (req, res) => {' >> app.js
echo '  res.send("<h1>Node '$ver_node' & Express '$ver_express' Web App</h1><p>Servidor funcionando.</p>");' >> app.js
echo '});' >> app.js
echo '' >> app.js
echo 'app.listen(PORT, () => {' >> app.js
echo '  console.log(`Servidor disponible en http://localhost:${PORT}`);' >> app.js
echo '});' >> app.js
echo '' >> app.js
echo 'app.get("/acerca", (req, res) => {' >> app.js
echo '  res.send(`' >> app.js
echo '    <h1>Acerca del proyecto</h1>' >> app.js
echo '    <p>Nombre: '$proyecto'</p>' >> app.js
echo '    <p>Versión: 1.0.0</p>' >> app.js
echo '    <p>Autor: '$nombre'</p>' >> app.js
echo '  `);' >> app.js
echo '});' >> app.js

# Salimos de src para estar en la raíz antes de ejecutar
cd ..

# Se ejecuta el servidor con nodemon
npm run dev
