# 📌 Proyecto: Sistema de Gestión Hospitalaria

## 📖 Descripción
Este proyecto es un sistema de gestión hospitalaria desarrollado con **Node.js**, **Express**, y **MySQL**. Permite administrar pacientes, doctores, citas médicas y autenticación de usuarios.

## 🚀 Tecnologías Utilizadas
- **Backend:** Node.js, Express
- **Base de Datos:** MySQL
- **Autenticación:** Bcrypt para el hash de contraseñas
- **Manejo de variables de entorno:** dotenv
- **Seguridad y CORS:** cors

## 📁 Estructura del Proyecto
```
📂 proyecto-hospital
 ├── 📁 node_modules
 ├── 📁 routes
 ├── 📁 controllers
 ├── 📁 models
 ├── .env
 ├── .gitignore
 ├── package.json
 ├── server.js
 ├── README.md
```

## ⚙️ Instalación y Configuración
### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/tuusuario/proyecto-hospital.git
cd proyecto-hospital
```

### 2️⃣ Instalar dependencias
```sh
npm install
```

```sh
npm install cors
````

```sh
npm install express
```

```sh
npm install mysql2
```

```bash
sudo npm install -g nodemon
```

```bash
npm install jsonwebtoken
```
```bash
npm install dotenv
```
```bash
npm install bcrypt
```

### 3️⃣ Configurar las variables de entorno
Crea un archivo `.env` en la raíz del proyecto y define:
```env
HOST_DB=localhost
USER_DB=root
PASS_DB=tu_contraseña
DATABASE=db_hospital
PORT=3005
```

### 4️⃣ Ejecutar el servidor
```sh
npm start
```
El servidor estará corriendo en `http://localhost:3005`

## 📌 Endpoints API
### 🏥 **Pacientes**
- **GET** `/pacientes` → Obtener todos los pacientes
- **POST** `/pacientes` → Agregar un nuevo paciente
- **PUT** `/pacientes/:idPaciente` → Actualizar datos de un paciente
- **DELETE** `/pacientes/:idPaciente` → Eliminar un paciente (previa eliminación de citas y tratamientos)

### 📅 **Citas**
- **GET** `/citas` → Obtener todas las citas
- **POST** `/citas` → Crear una nueva cita
- **DELETE** `/citas/:idCitas` → Eliminar una cita

### 👨‍⚕️ **Doctores**
- **GET** `/doctores` → Obtener todos los doctores
- **GET** `/doctores/:idDoctor` → Obtener un doctor por ID

### 🔐 **Autenticación**
- **POST** `/register` → Crear un nuevo usuario (requiere email y contraseña)
- **POST** `/login` → Iniciar sesión y obtener un token 

# Middleware de Autenticación JWT

Este middleware de Node.js con Express verifica la validez de los tokens JWT en las solicitudes de API.

## Funcionalidad

* **Verificación de Token:** Verifica la presencia y validez de los tokens JWT en el encabezado `Authorization` de las solicitudes.
* **Formato de Token:** Espera que el token esté en el formato "Bearer TOKEN".
* **Manejo de Errores:** Proporciona mensajes de error claros y específicos para tokens faltantes, formatos incorrectos, tokens inválidos y tokens expirados.
* **Decodificación de Token:** Decodifica el token y añade la información del usuario a `req.dataUser` para que las rutas protegidas puedan acceder a ella.

## 🔒 Seguridad y Hashing de Contraseñas
- Se usa `bcrypt` para almacenar contraseñas de forma segura.
- El campo `password` en MySQL es `VARCHAR(255)` para soportar los hashes de `bcrypt`.
- `jsonwebtoken` puede ser agregado para la autenticación basada en tokens.

## 📌 Mejoras Futuras
- 🔹 Implementación de JWT para la autenticación.
- 🔹 Agregar middleware de autorización.
- 🔹 Integración con un frontend en React o Angular.
- 🔹 Implementación de roles y permisos.

## 📄 Licencia
Este proyecto está bajo la licencia **MIT**.

---

📩 **Autor:** Tania Salvatella
📌 **Repositorio:** [GitHub](https://github.com/Adalab/modulo-4-evaluacion-final-bpw-TSalvatellaP)

