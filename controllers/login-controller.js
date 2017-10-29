// controller for logging in to the website

var connection = require('./../config');
var express = require("express");
var app = express();

exports.login=function(req,res){
    var u_email=req.body.email;
    var u_password=req.body.password;
    var u_role=req.body.role;
    connection.query('SELECT fullname, password FROM users WHERE email = ? and role = ?', [u_email, u_role], function (error, results) {
      if (error) {
          return res.redirect('/login');
      }else{
        if(results.length>0){
            if(u_password==results[0].password){
                req.session.user = {name: results[0].fullname, email: u_email, role: u_role};
                req.session.save();
                return res.redirect('/homepage');
            }
            else{
                req.session.login_error = {error:"Email - Password combination invalid"};
                return res.redirect('/login');
            }
        }
        else{
          req.session.login_error = {error:"The provided email isn't registered"};
          return res.redirect('/login');
        }
      }
    });
}
