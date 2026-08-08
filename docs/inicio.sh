#!/bin/bash

# Se clone al repo
clear
git clone https://github.com/franciscomolinacl/TP-Integrador-JS.git

# Variables
proyecto="TP-Integrador-JS"
descripcion="Proyecto del Módulo 6: TP Integrador JS"
nombre="Francisco Molina"

# Se ingresa al directorio del proyecto
cd "$proyecto"

# Inicializamos el proyecto
clear
npm init -y

# Instalación de dependencias
clear
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

# Se ejecuta el servidor con nodemon
npm run dev
