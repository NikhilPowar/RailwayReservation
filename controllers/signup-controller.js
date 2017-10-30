// controller for signing up on the website

var connection = require('./../config');
var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var app = express();

exports.register=function(req,res){
  var name_err="";
  var password_err="";
  var con_password_err="";

  var letters = /^[A-Za-z ]+$/;
  if(!req.body.fullname.match(letters)){
    name_err = "Name must contain only alphabets!";
  }
  if(req.body.password.length<6){
    password_err = "Password must be longer than 5 characters!"
  }
  if(req.body.password.length!=eq.body.confirm.length){
    password_err = "Passwords don't match!"
  }

  req.session.signup_error={name: name_err, password: password_err, con_password: con_password_err};
  if(name_err=="" && password_err=="" && con_password_err==""){
    var user={
        "fullname":req.body.fullname,
        "email":req.body.email,
        "password":bcrypt.hashSync(req.body.password),
        "role":"customer"
    }
    connection.query("INSERT INTO users SET ?",user, function (error, result) {
      if (error) {
        return res.redirect('/signup');
      }else{
        req.session.user = {name: user.fullname, email: user.email, role: user.role};
        req.session.save();
        return res.redirect('/homepage');
      }
    });
  }
  else{
    return res.redirect('/signup');
  }
}
