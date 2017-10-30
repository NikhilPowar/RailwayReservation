// This file starts the server

var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var loginController = require('./controllers/login-controller');
var registerController = require('./controllers/signup-controller');
var routes = require('./app/routes.js');
var app = express();

app.use(session({ secret: 'secret-token'}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('views/'));

routes.route(app);

app.listen(8080);
