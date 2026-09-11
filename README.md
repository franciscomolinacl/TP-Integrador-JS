# Node & Express Web App

Proyecto del Módulo 7: TP Integrador JS - Francisco Molina

---
## Descripción

Aplicación web que permite gestionar usuarios, perfiles y pedidos con Node.js, Express y PostgreSQL.

---
## Tecnologías usadas

- HTML 5
- CSS 3
- JavaScript ES6
- Bootstrap (v5.3.8)
- Node.js (v26.5.0)
- NPM (v12.0.2)
- Express (v5.2.1)
- PostgreSQL (v18.4)
- Hbs (v4.2.1)
- Pg (v8.23.0)
- Pg-cursor (v2.22.0)
- Pg-hstore (v2.3.4)
- Yargs (v18.1.0)
- Dotenv (v17.4.2)
- Morgan (v1.11.0)
- Sequelize (v6.37.8)


---
## Conceptos aplicados

- Instalación Node + Express
- Gestión de paquetes con NPM
- Uso de Módulos y Middleware en Express.js
- Configuración del Servidor y Rutas en Express
- Instalación, configuración y uso de Handlebars
- Uso del módulo fs para manipular archivos
- Registro de logs
- Patrón MVC (Model-View-Controller)
- Patrón Repository para acceso a datos
- ORM con Sequelize
- Base de datos relacional PostgreSQL
- Consultas SQL parametrizadas con `pg`
- Transacciones con BEGIN/COMMIT/ROLLBACK
- Variables de entorno con dotenv
- Validación de datos de entrada
- Manejo centralizado de errores

---
## Cómo ejecutar el proyecto

0. ### Descarga e instala node para Windows:

   [https://nodejs.org/es/download](https://nodejs.org/es/download)

   O enlace directo a la versión 26.5.0:

   [https://nodejs.org/dist/v26.5.0/node-v26.5.0-x64.msi](https://nodejs.org/dist/v26.5.0/node-v26.5.0-x64.msi)

1. ### Clonar repositorio con siguiente comando:
  
        git clone https://github.com/franciscomolinacl/TP-Integrador-JS.git

2. ### Abrir carpeta descargada con VS Code

3. ### Instalar dependencias:

        npm install

4. ### Descargar e instalar PostgreSQL desde web oficial:
   [Descargar PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)


5. ### Conectarse a psql desde git en VS Code o psql instalado e ingresar con este comando:

        psql -U postgres
   Ingresa la contraseña que pusiste al instalar PostgreSQL

6. ### Crear la base de datos y tablas con este comando:

         psql -U postgres -c "CREATE DATABASE node_express_app;" -f sql/schema.sql -f sql/seed.sql

   Ingresa la contraseña de PostgreSQL cuando te pida.
   
   Salir con el comando
         \q
8. ### Crear archivo .env con lo siguiente:
    
         PORT=4000
         NODE_ENV=development

         DB_HOST=localhost
         DB_PORT=5432
         DB_NAME=node_express_app
         DB_USER=postgres
         DB_PASSWORD=CONTRASEÑA

         JWT_SECRET=una_clave_larga_para_desarrollo
         JWT_EXPIRES_IN=1h

       En CONTRASEÑA, debes cambiarlo por tu contraseña de la base de datos. Tambien puedes cambiar una_clave_larga_para_desarrollo


9. ### Ejecutar el servidor con este comando:

         npm run dev

    Asegúrate de estar en la carpeta del proyecto en la terminal.

10. ### Abrir en navegador [http://localhost:4000/](http://localhost:4000/)

---
## CRUD de usuarios

La persistencia principal utiliza PostgreSQL.

### Listar usuarios

```text
GET /api/usuarios

Obtener usuario

GET /api/usuarios/:id

Crear usuario

POST /api/usuarios

Ejemplo:

{
  "nombre": "Elena Vargas",
  "correo": "elena@example.com",
  "activo": true
}

Actualizar usuario

PUT /api/usuarios/:id

Campos modificables:

nombre
correo
activo

Eliminar usuario

DELETE /api/usuarios/:id

Las consultas utilizan parámetros PostgreSQL y las operaciones validan identificadores y datos antes de modificar la base.
```

---

## API de pedidos (ORM)

Rutas disponibles en `/api/orm/pedidos`.

### Listar pedidos

```text
GET /api/orm/pedidos

Respuesta:
{
  "status": "ok",
  "message": "Pedidos encontrados.",
  "data": [
    {
      "id": 1,
      "usuarioId": 3,
      "fecha": "2026-08-30T12:00:00.000Z",
      "estado": "pendiente",
      "total": 19990,
      "usuario": {
        "id": 3,
        "nombre": "Daniela Rojas",
        "correo": "daniela@example.com"
      }
    }
  ]
}
```

### Obtener pedido por ID

```text
GET /api/orm/pedidos/:id
```

### Crear pedido

```text
POST /api/orm/pedidos

Body:
{
  "usuarioId": 3,
  "total": 25000,
  "estado": "pendiente"
}
```

### Actualizar pedido

```text
PUT /api/orm/pedidos/:id

Campos modificables: estado, total, fecha
```

### Eliminar pedido

```text
DELETE /api/orm/pedidos/:id
```

---

## API de usuarios (ORM)

Rutas disponibles en `/api/orm/usuarios`.

```text
GET /api/orm/usuarios              → Listar todos
GET /api/orm/usuarios/:id/relaciones → Usuario con perfil, pedidos y roles
GET /api/orm/usuarios/:id/pedidos  → Usuario con sus pedidos
```

---
## Formularios web

La interfaz Handlebars reutiliza el mismo Service utilizado por la API.

### Usuarios

```text
GET  /usuarios                     → Listar todos
GET  /usuarios/nuevo               → Formulario crear
POST /usuarios                     → Crear usuario
GET  /usuarios/:id                 → Ver detalle
GET  /usuarios/:id/editar          → Formulario editar
POST /usuarios/:id/editar          → Guardar cambios
POST /usuarios/:id/eliminar        → Eliminar usuario
GET  /usuarios/registro-completo   → Registro completo
POST /usuarios/registro-completo   → Registrar con historial
```

### Perfiles

```text
GET  /usuarios/:id/perfil          → Ver perfil
GET  /usuarios/:id/perfil/editar   → Formulario crear/editar perfil
POST /usuarios/:id/perfil/editar   → Guardar perfil
```

### Pedidos

```text
GET  /pedidos                      → Listar todos
GET  /pedidos/nuevo                → Formulario crear
POST /pedidos                      → Crear pedido
POST /pedidos/:id/editar-estado    → Cambiar estado
POST /pedidos/:id/eliminar         → Eliminar pedido
```

Los formularios tradicionales utilizan GET y POST. La API mantiene POST, PUT y DELETE para las operaciones REST correspondientes.

---
## Justificaciones técnicas esperadas

### ¿Por qué actualizar solo ciertos campos?

Porque la API debe controlar qué propiedades pueden modificarse y evitar cambios en atributos administrados por el sistema.

### ¿Qué validaciones se aplicaron?

- ID entero positivo.
- Nombre válido.
- Correo válido.
- Estado booleano.
- Campos permitidos.
- Existencia del registro.
- Restricciones de PostgreSQL.

### ¿Por qué utilizar `RETURNING`?

Porque permite obtener inmediatamente la fila creada, actualizada o eliminada sin ejecutar una segunda consulta separada.

---
## Más info del proyecto
### Base de datos

PostgreSQL.

### Acceso SQL manual

Se utiliza `pg` con consultas parametrizadas.

### ORM

Se utiliza Sequelize.

### Entidades

- Usuario
- Perfil
- Pedido
- Rol
- UsuarioRol

### Relaciones

- Usuario 1:1 Perfil
- Usuario 1:N Pedido
- Usuario N:M Rol mediante UsuarioRol

### Transacciones

Existe una operación transaccional que ejecuta varias acciones y utiliza rollback ante errores.

### API

Las rutas de API de usuarios y pedidos están documentadas en las secciones anteriores.

### Interfaz web

Los formularios Handlebars permiten gestionar usuarios, perfiles y pedidos.

### Seguridad

Las credenciales se cargan desde variables de entorno y no se suben al repositorio.

---

## Reflexión del proyecto

En el **Módulo 6** senté las bases del backend: instalación de Node.js y Express, configuración del servidor, uso de middlewares, manejo de rutas y primeros contactos con la manipulación de archivos y logs. Aprendí a estructurar una aplicación de forma modular separando responsabilidades.

En el **Módulo 7** integré la persistencia de datos con PostgreSQL y Sequelize, modelando entidades con relaciones 1:1, 1:N y N:M. Implementé operaciones CRUD completas, consultas filtradas, validaciones y manejo centralizado de errores. También practiqué el patrón Repository y las transacciones con BEGIN/COMMIT/ROLLBACK.

En el **Módulo 8** consolidé todo construyendo una API RESTful completa. Implementé autenticación JWT con login y registro, protegi rutas con middlewares, configuré subida de archivos con validación de tipo y tamaño, y asocié los archivos subidos a registros en la base de datos (avatar de perfil). Además, creé una interfaz web con Handlebars que reutiliza los mismos servicios de la API, demostrando la versatilidad de la arquitectura.

Este proyecto me permitió entender el ciclo completo de un backend: desde la configuración del servidor hasta una API lista para ser consumida por un cliente externo.


### API REST – v1

Base:

`/api/v1`

#### Auth

- `POST /api/v1/auth/registro` → Registrar usuario
- `POST /api/v1/auth/login` → Iniciar sesión
- `POST /api/v1/auth/decode` → Decodificar token
- `GET /api/v1/auth/me` → Obtener sesión actual (requiere token)

#### Usuarios

- `GET /api/v1/usuarios`
- `GET /api/v1/usuarios/:id`
- `POST /api/v1/usuarios`
- `PUT /api/v1/usuarios/:id`
- `DELETE /api/v1/usuarios/:id`
- `GET /api/v1/usuarios/:id/pedidos` → Pedidos de un usuario

#### Pedidos

- `GET /api/v1/pedidos`
- `GET /api/v1/pedidos/:id`
- `POST /api/v1/pedidos` (requiere token)
- `PUT /api/v1/pedidos/:id` (requiere token)
- `DELETE /api/v1/pedidos/:id` (requiere token)

#### Upload

- `POST /api/v1/upload` → Subir archivo (requiere token)
- `DELETE /api/v1/upload/:nombre` → Eliminar archivo (requiere token)

---

## Autenticación JWT

La aplicación utiliza JWT para autenticar usuarios. Al iniciar sesión o registrarse, se genera un token que se almacena en una cookie `httpOnly`.

### Flujo web

1. El usuario accede a `/login` o `/registro`
2. Al autenticarse exitosamente, se guarda el token en cookie
3. El middleware `cargarSesionWeb` lee la cookie y carga el usuario
4. Las rutas protegidas redirigen a `/login` si no hay sesión

### Rutas web protegidas

Todas las rutas de usuarios y pedidos (GET y POST) requieren estar autenticado.

### Rutas públicas

- `/login`
- `/registro`
- `/` (inicio)
- `/status`
- `/api/*` (API)

---

## Upload de archivos

La aplicación permite subir imágenes (avatars) utilizando `express-fileupload`.

### Limitaciones

- Formatos permitidos: `.jpg`, `.jpeg`, `.png`, `.webp`
- Tamaño máximo: 5 MB
- Los archivos se guardan en `public/uploads/`

### Uso web

Desde el perfil del usuario, se puede subir un avatar que aparecerá en el header.

---

## Estructura del proyecto
```bash
📦node-express-web-app
 ┣ 📂docs
 ┃ ┣ 📂capturas
 ┃ ┃ ┣ 📂mas
 ┃ ┃ ┃ ┣ 📂Modulo_8
 ┃ ┃ ┃ ┃  ┣ 🖼️404 controlado.png
 ┃ ┃ ┃ ┃  ┣ 🖼️Filtro correo.png
 ┃ ┃ ┃ ┃  ┣ 🖼️Filtro mediante query.png
 ┃ ┃ ┃ ┃  ┣ 🖼️Metodo DELETE.png
 ┃ ┃ ┃ ┃  ┣ 🖼️Metodo GET.png
 ┃ ┃ ┃ ┃  ┣ 🖼️Metodo POST.png
 ┃ ┃ ┃ ┃  ┗ 🖼️Metodo PUT.png
 ┃ ┃ ┃ ┣ 🖼️Comprobacion de eliminacion en psql.png
 ┃ ┃ ┃ ┣ 🖼️Confirmacion de actualizacion en psql.png
 ┃ ┃ ┃ ┣ 🖼️Consulta a base de datos.png
 ┃ ┃ ┃ ┣ 🖼️Ejecutando aplicacion.png
 ┃ ┃ ┃ ┣ 🖼️Ejemplo completo con callback.png
 ┃ ┃ ┃ ┣ 🖼️Ejemplo consulta parametrizada.png
 ┃ ┃ ┃ ┣ 🖼️Ejemplo cursor.png
 ┃ ┃ ┃ ┣ 🖼️Ejemplo listar con ORM.png
 ┃ ┃ ┃ ┣ 🖼️Error de conexión durante una consulta.png
 ┃ ┃ ┃ ┣ 🖼️Error forzado rollback.png
 ┃ ┃ ┃ ┣ 🖼️Error provocado en consulta  repositorio.png
 ┃ ┃ ┃ ┣ 🖼️Formulario crear usuario.png
 ┃ ┃ ┃ ┣ 🖼️Formulario de edicion.png
 ┃ ┃ ┃ ┣ 🖼️Primera consulta desde Node.js con Client.png
 ┃ ┃ ┃ ┣ 🖼️Primera consulta desde Node.js con Pool.png
 ┃ ┃ ┃ ┣ 🖼️Prueba API usuarios.png
 ┃ ┃ ┃ ┣ 🖼️Prueba body vacio.png
 ┃ ┃ ┃ ┣ 🖼️Prueba commit.png
 ┃ ┃ ┃ ┣ 🖼️Prueba conexion sequelize.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de boton eliminar usuario.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de conexion con client.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de conexion con pooling.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de correo duplicado.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de edicion.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de POST crear usuario.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de PUT actualizar usuario.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de registro completo.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de ruta por ID con error 400.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de ruta por ID con error.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de ruta por ID.png
 ┃ ┃ ┃ ┣ 🖼️Prueba de usuario creado en psql.png
 ┃ ┃ ┃ ┣ 🖼️Prueba DELETE.png
 ┃ ┃ ┃ ┣ 🖼️Prueba filtro activos.png
 ┃ ┃ ┃ ┣ 🖼️Prueba filtro booleano.png
 ┃ ┃ ┃ ┣ 🖼️Prueba filtro inactivos.png
 ┃ ┃ ┃ ┣ 🖼️Prueba filtro nombre.png
 ┃ ┃ ┃ ┣ 🖼️Prueba filtro valor invalido.png
 ┃ ┃ ┃ ┣ 🖼️Prueba filtros combinados.png
 ┃ ┃ ┃ ┣ 🖼️Prueba listar usuarios con ORM.png
 ┃ ┃ ┃ ┣ 🖼️Prueba listar usuarios desde Postman.png
 ┃ ┃ ┃ ┣ 🖼️Prueba pedido actualizado.png
 ┃ ┃ ┃ ┣ 🖼️Prueba pedido creado.png
 ┃ ┃ ┃ ┣ 🖼️Prueba pedido eliminado.png
 ┃ ┃ ┃ ┣ 🖼️Prueba pedido por ID.png
 ┃ ┃ ┃ ┣ 🖼️Prueba repository sin Express.png
 ┃ ┃ ┃ ┣ 🖼️Prueba rollback.png
 ┃ ┃ ┃ ┣ 🖼️Prueba ruta pedidos.png
 ┃ ┃ ┃ ┣ 🖼️Prueba sin filtros.png
 ┃ ┃ ┃ ┣ 🖼️Prueba total usuarios.png
 ┃ ┃ ┃ ┣ 🖼️Prueba vista usuarios.png
 ┃ ┃ ┃ ┣ 🖼️Usuario creado desde formulario.png
 ┃ ┃ ┃ ┣ 🖼️Usuario eliminado.png
 ┃ ┃ ┃ ┗ 🖼️Verificacion registro completo en psql.png
 ┃ ┃ ┣ 🖼️caption-api-usuarios.png
 ┃ ┃ ┣ 🖼️caption-estado.png
 ┃ ┃ ┣ 🖼️caption-servidor-iniciado.png
 ┃ ┃ ┣ 🖼️caption-usuario.png
 ┃ ┃ ┣ 🖼️caption-usuarios.png
 ┃ ┃ ┗ 🖼️caption-web-inicio.png
 ┣ 📂logs
 ┃ ┣ 🧾log.txt
 ┃ ┗ 🧾transacciones.log
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┃ ┗ 🎨estilos.css
 ┃ ┣ 📂img
 ┃ ┃ ┣ 🎯favicon.ico
 ┃ ┃ ┗ 🖼️logo.png
 ┃ ┣ 📂js
 ┃ ┃ ┗ 📜app.js
 ┃ ┗ 📂uploads
 ┣ 📂sql
 ┃ ┣ 🗄️schema.sql
 ┃ ┗ 🗄️seed.sql
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜database.js
 ┃ ┃ ┣ 📜env.js
 ┃ ┃ ┣ 📜handlebars.js
 ┃ ┃ ┗ 📜sequelize.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜auth.controller.js
 ┃ ┃ ┣ 📜database.controller.js
 ┃ ┃ ┣ 📜index.controller.js
 ┃ ┃ ┣ 📜pedidos-orm.controller.js
 ┃ ┃ ┣ 📜pedidos-v1.controller.js
 ┃ ┃ ┣ 📜perfil-web.controller.js
 ┃ ┃ ┣ 📜upload.controller.js
 ┃ ┃ ┣ 📜usuarios-api.controller.js
 ┃ ┃ ┣ 📜usuarios-orm.controller.js
 ┃ ┃ ┣ 📜usuarios-v1.controller.js
 ┃ ┃ ┣ 📜usuarios-web.controller.js
 ┃ ┃ ┗ 📜usuarios.controller.js
 ┃ ┣ 📂data
 ┃ ┃ ┗ 📦usuarios.json
 ┃ ┣ 📂ejemplos
 ┃ ┃ ┣ 📜clases.js
 ┃ ┃ ┣ 📜conexion-client.js
 ┃ ┃ ┣ 📜conexion-pool.js
 ┃ ┃ ┣ 📜cursor-usuarios.js
 ┃ ┃ ┣ 📜orm-crear-usuario.js
 ┃ ┃ ┣ 📜orm-listar-usuarios.js
 ┃ ┃ ┣ 📜probar-repository.js
 ┃ ┃ ┣ 📜probar-sequelize.js
 ┃ ┃ ┣ 📜query-callback.js
 ┃ ┃ ┣ 📜query-client.js
 ┃ ┃ ┣ 📜query-parametrizada.js
 ┃ ┃ ┗ 📜query-pool.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜agregarContextoPeticion.js
 ┃ ┃ ┣ 📜agregarDatosVista.js
 ┃ ┃ ┣ 📜auth.middleware.js
 ┃ ┃ ┣ 📜auth-web.middleware.js
 ┃ ┃ ┣ 📜manejarErrores.js
 ┃ ┃ ┣ 📜registrarAcceso.js
 ┃ ┃ ┣ 📜registrarModulo.js
 ┃ ┃ ┣ 📜rutaNoEncontrada.js
 ┃ ┃ ┗ 📜validarIdUsuario.js
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜Pedido.js
 ┃ ┃ ┣ 📜Perfil.js
 ┃ ┃ ┣ 📜Rol.js
 ┃ ┃ ┣ 📜Usuario.js
 ┃ ┃ ┗ 📜UsuarioRol.js
 ┃ ┣ 📂repositories
 ┃ ┃ ┣ 📜historial.repository.js
 ┃ ┃ ┗ 📜usuarios.repository.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth.routes.js
 ┃ ┃ ┣ 📜index.routes.js
 ┃ ┃ ┣ 📜pedidos-orm.routes.js
 ┃ ┃ ┣ 📜pedidos-v1.routes.js
 ┃ ┃ ┣ 📜upload.routes.js
 ┃ ┃ ┣ 📜usuarios-orm.routes.js
 ┃ ┃ ┣ 📜usuarios-v1.routes.js
 ┃ ┃ ┣ 📜usuarios.routes.js
 ┃ ┃ ┗ 📜web.routes.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜auth.service.js
 ┃ ┃ ┣ 📜pedidos-orm.service.js
 ┃ ┃ ┣ 📜upload.service.js
 ┃ ┃ ┣ 📜usuarios-orm.service.js
 ┃ ┃ ┗ 📜usuarios.service.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜archivos.js
 ┃ ┃ ┣ 📜consola.js
 ┃ ┃ ┣ 📜errores.js
 ┃ ┃ ┣ 📜logs.js
 ┃ ┃ ┣ 📜mensajes.js
 ┃ ┃ ┣ 📜password.util.js
 ┃ ┃ ┣ 📜rutas.js
 ┃ ┃ ┗ 📜validaciones.js
 ┃ ┣ 📜app.js
 ┃ ┗ 📜cli.js
 ┣ 📂views
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 🎭login.hbs
 ┃ ┃ ┗ 🎭registro.hbs
 ┃ ┣ 📂partials
 ┃ ┃ ┣ 🎭footer.hbs
 ┃ ┃ ┣ 🎭header.hbs
 ┃ ┃ ┣ 🎭tarjetaPedido.hbs
 ┃ ┃ ┗ 🎭tarjetaUsuario.hbs
 ┃ ┣ 📂pedidos
 ┃ ┃ ┗ 🎭nuevo.hbs
 ┃ ┣ 📂perfil
 ┃ ┃ ┗ 🎭editar.hbs
 ┃ ┣ 📂usuarios
 ┃ ┃ ┣ 🎭editar.hbs
 ┃ ┃ ┣ 🎭nuevo.hbs
 ┃ ┃ ┣ 🎭pedidos.hbs
 ┃ ┃ ┗ 🎭registro-completo.hbs
 ┃ ┣ 🎭error.hbs
 ┃ ┣ 🎭home.hbs
 ┃ ┣ 🎭pedidos.hbs
 ┃ ┣ 🎭perfil.hbs
 ┃ ┣ 🎭status.hbs
 ┃ ┣ 🎭usuario.hbs
 ┃ ┗ 🎭usuarios.hbs
 ┣ 🔒.env
 ┣ 🔒.env.example
 ┣ 🛑.gitignore
 ┣ 📦nodemon.json
 ┣ 📦package-lock.json
 ┣ 📦package.json
 ┗ 📝README.md
```


## Anexos

### Servidor iniciado

![Servidor iniciado](./docs/capturas/caption-servidor-iniciado.png)

### Web inicio

![Consola](./docs/capturas/caption-web-inicio.png)

### Menu Usuarios

![Menu](./docs/capturas/caption-usuarios.png)

### Vista Usuario

![Menu](./docs/capturas/caption-usuario.png)

### Estado servidor

![Menu](./docs/capturas/caption-estado.png)

### Vista API usuarios

![Menu](./docs/capturas/caption-api-usuarios.png)

### Para más capturas:
Visite el [siguiente enlace](./docs/capturas/mas/).
