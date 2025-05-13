# 📦 Backend - Proyecto Fullstack

Este repositorio contiene el backend de una aplicación fullstack construida con Node.js y Express. Se encarga de manejar la autenticación de usuarios y un sistema CRUD de contactos.

## 🚀 Tecnologías utilizadas

- **Express** – Framework para crear la API REST.
- **dotenv** – Gestión de variables de entorno.
- **cors** – Habilitación de CORS para el acceso desde el frontend.
- **firebase-admin** – Autenticación con Firebase.
- **jsonwebtoken** – Manejo de tokens JWT.
- **morgan** – Middleware de logging HTTP.
- **nodemon** – Recarga automática en desarrollo.

## 🔐 Autenticación

El sistema de autenticación utiliza Firebase para validar los usuarios y genera tokens JWT que deben enviarse en las solicitudes a rutas protegidas.

## 📬 Rutas principales

- `POST /auth/login` – Autenticación de usuario.
- `GET /contactos` – Obtener todos los contactos.
- `POST /contactos` – Crear un nuevo contacto.
- `PUT /contactos/:id` – Actualizar un contacto existente.
- `DELETE /contactos/:id` – Eliminar un contacto.
