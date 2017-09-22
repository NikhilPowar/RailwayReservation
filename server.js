// This file starts the server

var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var loginController = require('./controllers/login-controller');
var registerController = require('./controllers/signup-controller');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/signup', function(req, res){
  registerController.register(req, res)
});
app.post('/api/login', function(req, res){
  loginController.login(req, res)
});

app.listen(8080);
