const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const server = express();

// middleware globais
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method')); // sobreescreve o tipo do metodo HTTP
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(5000, () => console.log('listening on http://localhost:5000'));
