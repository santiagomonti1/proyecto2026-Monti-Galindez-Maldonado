# Filmoteca

**Filmoteca** es un diario personal de películas: una aplicación web donde el usuario busca películas, las puntúa, escribe reseñas y lleva un historial de lo que vio.

Proyecto integrador de **Taller de Desarrollo Web** (UCC) · Primer parcial 2026.

## Índice

- [Página publicada](#página-publicada)
- [Autores](#autores)
- [Descripción](#descripción)
  - [Páginas del sitio](#páginas-del-sitio)
  - [Funcionalidades con JavaScript](#funcionalidades-con-javascript)
  - [Usuario de prueba](#usuario-de-prueba)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Créditos](#créditos)

## Página publicada

👉 [Ver Filmoteca en GitHub Pages](https://santiagomonti1.github.io/proyecto2026-Monti-Galindez-Maldonado/primera-entrega/)

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

| Página | Archivo | Contenido |
|--------|---------|-----------|
| Inicio | `index.html` | Buscador y top de películas de la semana |
| Catálogo | `catalogo.html` | Listado de películas con buscador |
| Ficha | `ficha.html` | Información de una película y formulario de reseña |
| Mi diario | `diario.html` | Perfil, películas favoritas e historial |
| Iniciar sesión | `login.html` | Formulario de ingreso |

### Funcionalidades con JavaScript

- **Ficha:** valida el puntaje, la fecha y la reseña, y calcula el **nuevo puntaje promedio** de la película con el voto del usuario.
- **Login:** valida el usuario y la contraseña, y muestra mensajes de error.
- **Catálogo:** filtra las películas por título mientras se escribe, y muestra un aviso si no hay resultados. También recibe la búsqueda hecha desde el Inicio.

### Usuario de prueba

| Usuario | Contraseña |
|---------|------------|
| santiago | santi2026 |

## Tecnologías utilizadas

- HTML5
- CSS3 (variables, Flexbox, media queries)
- JavaScript
- [Google Fonts](https://fonts.google.com/) (Bebas Neue)
- Figma (wireframes y wireflow)
- Git y GitHub

## Estructura del repositorio

```
primera-entrega/
├── index.html, catalogo.html, ficha.html, diario.html, login.html
├── estilos.css
├── funciones.js
├── imagenes/      → pósters y favicon
├── Sketch/        → bocetos desktop y mobile
└── Wireframe/     → wireframes desktop y mobile, y wireflow (PDF)
```

## Créditos

Los pósters y los datos de las películas se obtuvieron de [The Movie Database (TMDB)](https://www.themoviedb.org/) y se usan con fines educativos.
