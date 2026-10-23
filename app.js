// Práctica de Express: buscador de películas
const express = require('express');
const path = require('path');
const films = require('./films.json');

const app = express();

// Configuro EJS para las vistas y la carpeta public para el CSS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Página de inicio
app.get('/', function (req, res) {
  res.render('googlemovies');
});

// La misma página, pero entrando por /googlemovies
app.get('/googlemovies', function (req, res) {
  res.render('googlemovies');
});

// Buscador: /search?q=avatar
app.get('/search', function (req, res) {
  let q = req.query.q;

  // Si no me llega nada, lo pongo vacío para que no falle
  if (!q) {
    q = '';
  }

  let results = [];

  // Recorro todas las películas y me quedo con las que contienen el texto
  for (let titulo in films) {
    let film = films[titulo];

    if (film.Title.toLowerCase().includes(q.toLowerCase())) {
      results.push(film);
    }
  }

  res.render('search', { q: q, results: results });
});

// Arranco el servidor
app.listen(3000, function () {
  console.log('Servidor arrancado en http://localhost:3000');
});
