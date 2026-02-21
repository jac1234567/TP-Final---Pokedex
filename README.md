# Proyecto Final Programación III: Pokedex

Este proyecto es una aplicación web interactiva que permite explorar los 151 Pokémon de la primera generación, seleccionarlos para formar un equipo y guardar dicho equipo de forma permanente en una base de datos.

## Tecnologías Utilizadas

### Frontend
- **Vue.js 3**: Framework principal.
- **Pinia**: Gestión de estado global.
- **Axios**: Cliente HTTP para consumo de APIs.

### Backend y Base de Datos
- **Node.js & Express**: Servidor de API local.
- **MySQL**: Motor de base de datos relacional.
- **XAMPP**: Entorno de servidor local.

## Instalación y Configuración

### 1. Base de Datos (MySQL)
1. Iniciar **Apache** y **MySQL** desde el panel de XAMPP.
2. Acceder a `phpMyAdmin` y crear la base de datos llamada `pokemon`.
3. Ejecutar el siguiente script SQL para crear la tabla necesaria:

```sql
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pokemones JSON NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend (Puerto 3000)
1. Abrir una terminal en la carpeta `/backend`.
2. Instalar las dependencias:
```
npm install express mysql2 cors body-parser
```
3. Iniciar el servidor:
```
node server.js
```
4. Debería aparecer el mensaje: 
`... Servidor corriendo en http://localhost:3000` y `✅ Conectado a MySQL`.

### 3. Frontend (Puerto 8080)
1. Abrir una terminal en la carpeta raíz del proyecto (`/pokemon`).
2. Instalar las dependencias:
```
npm install
```
3. Instalar las librerías de Axios y Pinia
```
npm install axios pinia
```
4. Iniciar la aplicación:
```
npm run serve
```
4. Acceder en el navegador a: `http://localhost:8080`. No utilizar IP LAN.

## Funcionalidades Principales
- **Consumo de PokeAPI:** Obtención de datos e imágenes en tiempo real.
- **Gestión con Pinia:** El equipo seleccionado se mantiene aunque el usuario navegue entre pestañas.
- **Filtro de Búsqueda:** Implementado mediante Getters de Pinia para una respuesta instantánea por nombre.
- **Persistencia Real:** Guardado de datos en MySQL convirtiendo a formato JSON.
- **Creación de Equipos:** Solo se pueden cargar hasta 6 Pokemones.

## Estructura del Proyecto
`/src/components`: Componentes modulares (Listado y Equipo).
`/src/stores`: Lógica de Pinia (Estado y Actions asíncronas).
`/backend`: Lógica del servidor Node.js y conexión MySQL.

## Otros comandos Vue.js

### Compila y minimiza para producción
```
npm run build
```

### Revisa y corrige archivos
```
npm run lint
```

### Personaliza la configuración
See [Configuration Reference](https://cli.vuejs.org/config/).
