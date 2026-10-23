const express = require('express');
const path = require('path');
const films = require('./films.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// La página de inicio y /googlemovies muestran el mismo formulario.
app.get(['/', '/googlemovies'], (req, res) => {
  res.render('googlemovies');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', (req, res) => {
  // El formulario envía el título en la query string: /search?q=Avatar.
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  const results = q
    ? Object.values(films).filter(film =>
        film.Title.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  res.render('search', { q, results });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Google Movies disponible en http://localhost:${port}`);
  });
}

module.exports = app;
