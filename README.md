# Filmoteca

**Filmoteca** es un diario personal de películas: una aplicación web donde el usuario busca películas, las puntúa, escribe reseñas y lleva un historial de lo que vio.

Proyecto integrador de **Taller de Desarrollo Web** (UCC) · 2026.

## Índice

- [Entregas](#entregas)
- [Autores](#autores)
- [Descripción](#descripción)
  - [Páginas del sitio](#páginas-del-sitio)
  - [Funcionalidades](#funcionalidades)
  - [Usuarios de prueba](#usuarios-de-prueba)
- [Cómo ejecutar la segunda entrega](#cómo-ejecutar-la-segunda-entrega)
  - [Requisitos previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Ejecución](#ejecución)
  - [Scripts disponibles](#scripts-disponibles)
  - [Servicios del mock](#servicios-del-mock)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
  - [Primera entrega](#primera-entrega)
  - [Segunda entrega](#segunda-entrega)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Créditos](#créditos)

## Entregas

| Entrega | Carpeta            | Contenido                                                     |
| ------- | ------------------ | ------------------------------------------------------------- |
| Primera | `primera-entrega/` | Sitio en HTML, CSS y JavaScript, publicado en GitHub Pages     |
| Segunda | `segunda-entrega/` | El mismo sitio rehecho con React, Vite, SASS y un mock de API  |

👉 [Ver la primera entrega en GitHub Pages](https://santiagomonti1.github.io/proyecto2026-Monti-Galindez-Maldonado/primera-entrega/)

La segunda entrega necesita el servidor del mock (json-server) para funcionar, por eso se ejecuta de forma local siguiendo los [pasos de ejecución](#cómo-ejecutar-la-segunda-entrega).

## Autores

- **Santiago Monti**
- **Luis Bautista Maldonado**
- **Baltazar Galindez Quintana**

## Descripción

Filmoteca permite al usuario:

- Buscar películas en un catálogo y ver su información (año, director, género, sinopsis).
- Puntuar una película y escribir una reseña.
- Ver su diario: películas favoritas e historial de películas vistas.
- Iniciar sesión con su usuario.

### Páginas del sitio

| Página         | Ruta (segunda entrega) | Contenido                                           |
| -------------- | ---------------------- | --------------------------------------------------- |
| Inicio         | `/`                    | Buscador y top 5 de películas por puntaje promedio  |
| Catálogo       | `/catalogo`            | Listado de películas con buscador                   |
| Ficha          | `/pelicula/:id`        | Información de una película y formulario de reseña  |
| Mi diario      | `/diario`              | Perfil, películas favoritas e historial             |
| Iniciar sesión | `/login`               | Formulario de ingreso                               |

### Funcionalidades

- **Inicio y Catálogo:** filtran las películas por título **mientras se escribe**, y muestran un aviso si no hay resultados.
- **Ficha:** valida el puntaje, la fecha y la reseña en tiempo real. Al guardar, la reseña se envía al mock y se actualizan el **puntaje promedio** y la cantidad de votos de la película.
- **Login:** valida el usuario y la contraseña mientras se escriben y los verifica contra el mock. La sesión se guarda en `localStorage`.
- **Mi diario:** solo se puede ver con una sesión iniciada. Muestra el promedio de los puntajes del usuario, sus favoritas (las que puntuó con 5) y su historial ordenado por fecha.
- **Menú:** muestra "Mi diario" y "Cerrar sesión" solo si hay una sesión iniciada.

### Usuarios de prueba

| Usuario  | Contraseña |
| -------- | ---------- |
| santiago | santi2026  |
| luis     | luis2026   |
| baltazar | balta2026  |

## Cómo ejecutar la segunda entrega

### Requisitos previos

- [Node.js](https://nodejs.org/) **22.13 o superior** (incluye npm). Se puede verificar con `node -v` y `npm -v`.
- Git, para clonar el repositorio.

### Instalación

```bash
git clone https://github.com/santiagomonti1/proyecto2026-Monti-Galindez-Maldonado.git
cd proyecto2026-Monti-Galindez-Maldonado/segunda-entrega
npm install
```

### Ejecución

La aplicación y el mock son dos programas distintos, así que se necesitan **dos terminales**, las dos abiertas en la carpeta `segunda-entrega`:

1. **Terminal 1, el mock de servicios:**
   ```bash
   npm run mock
   ```
   Levanta json-server en `http://localhost:3000` a partir del archivo `db.json`.
2. **Terminal 2, la aplicación:**
   ```bash
   npm run dev
   ```
3. Abrir `http://localhost:5173` en el navegador.

Para detener cualquiera de los dos: **Ctrl + C** en su terminal.

> Las reseñas que se guardan desde la aplicación quedan escritas en `db.json`. Para volver a los datos originales: `git restore db.json`.

### Scripts disponibles

| Script            | Qué hace                                              |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Ejecuta la aplicación en modo desarrollo con Vite     |
| `npm run mock`    | Levanta el mock de servicios (json-server) en el puerto 3000 |
| `npm run build`   | Genera la versión de producción en la carpeta `dist`  |
| `npm run preview` | Muestra la versión de producción generada con `build` |
| `npm run lint`    | Analiza el código con ESLint                          |

### Servicios del mock

| Método | Endpoint          | Uso en la aplicación                                  |
| ------ | ----------------- | ----------------------------------------------------- |
| GET    | `/peliculas`      | Listado del Inicio, Catálogo y Mi diario              |
| GET    | `/peliculas/:id`  | Datos de la Ficha                                     |
| PATCH  | `/peliculas/:id`  | Actualizar el puntaje promedio y los votos            |
| GET    | `/resenas`        | Reseñas de una película (Ficha) y de un usuario (Mi diario) |
| POST   | `/resenas`        | Guardar una reseña nueva                              |
| GET    | `/usuarios`       | Verificar el usuario al iniciar sesión                |

## Tecnologías utilizadas

### Primera entrega

- HTML5
- CSS3 (variables, Flexbox, media queries)
- JavaScript
- [Google Fonts](https://fonts.google.com/) (Bebas Neue)
- Figma (mockups desktop y mobile, y flujo de navegación)
- Git y GitHub

### Segunda entrega

- [React](https://react.dev/) 19: componentes, JSX y hooks (`useState`, `useEffect`, `useNavigate`, `useParams`)
- [Vite](https://vite.dev/) 8: creación del proyecto, servidor de desarrollo y alias de imports
- [React Router](https://reactrouter.com/) (`react-router-dom`) 7: rutas, rutas anidadas con `Outlet` y ruta dinámica `/pelicula/:id`
- [Sass](https://sass-lang.com/) (SCSS): variables, anidación, archivos parciales con `@use` y mixins
- [json-server](https://github.com/typicode/json-server): mock de la API REST a partir de `db.json`
- `fetch` con `async`/`await` para consumir el mock
- `localStorage` para guardar la sesión del usuario
- [ESLint](https://eslint.org/): análisis del código
- Node.js y npm
- Git y GitHub

**Nota sobre dependencias:** el `package.json` incluye un `overrides` que fija `minimatch` en la versión 11.0.4. ESLint 10 trae una versión de `minimatch` con una vulnerabilidad moderada (reportada por `npm audit`), y la versión 11.0.4 es la que la corrige. Con este cambio, `npm audit` informa **0 vulnerabilidades**.

## Estructura del repositorio

```
primera-entrega/
├── index.html, catalogo.html, ficha.html, diario.html, login.html
├── estilos.css
├── funciones.js
├── imagenes/      → pósters y favicon
├── Sketch/        → bocetos desktop y mobile
└── Mockup/        → mockups desktop y mobile, y flujo de navegación (PDF)

segunda-entrega/
├── db.json        → datos del mock: películas, reseñas y usuarios
├── public/        → favicon y pósters (se usan con ruta absoluta)
├── src/
│   ├── api/         → funciones fetch para comunicarse con el mock
│   ├── assets/      → logo (se importa desde el Header)
│   ├── components/  → Header, Footer, Layout, Button, Input, TarjetaPelicula, Fecha
│   ├── pages/       → Inicio, Catalogo, Ficha, Diario, Login
│   ├── styles/      → archivos .scss (styles.scss y sus parciales)
│   ├── App.jsx      → rutas de la aplicación
│   └── main.jsx     → punto de entrada
├── index.html
├── vite.config.js → configuración de Vite y alias
├── jsconfig.json  → alias para el editor
└── package.json
```

## Créditos

Los pósters y los datos de las películas se obtuvieron de [The Movie Database (TMDB)](https://www.themoviedb.org/) y se usan con fines educativos.
