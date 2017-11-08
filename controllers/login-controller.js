// controller for logging in to the website

var connection = require('./../config');
var bcrypt = require("bcrypt-nodejs");
var express = require("express");
var app = express();

exports.login=function(req,res){
    var u_email=req.body.email;
    var u_password=req.body.password;
    var u_role=req.body.role;
    var email_err = "";
    var password_err = "";
    connection.query('SELECT fullname, password FROM users WHERE email = ? and role = ?', [u_email, u_role], function (error, results) {
      if (error) {
          return res.redirect('/login');
      }else{
        if(results.length>0){
            if(bcrypt.compareSync(u_password, results[0].password)){
                req.session.user = {name: results[0].fullname, email: u_email, role: u_role};
                req.session.login_error = {email: email_err, password: password_err};
                req.session.save();
                if(u_role=="Customer"){
                  return res.redirect('/homepage');
                }
                else{
                  return res.redirect('/admin-homepage');
                }
            }
            else{
                password_err = "Email - Password combination invalid";
                req.session.login_error = {email: email_err, password: password_err};
                return res.redirect('/login');
            }
        }
        else{
          email_err = "The email is not registered.";
          req.session.login_error = {email: email_err, password: password_err};
          return res.redirect('/login');
        }
      }
    });
}
