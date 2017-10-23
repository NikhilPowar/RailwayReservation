// controller for signing up on the website

var connection = require('./../config');

exports.register=function(req,res){
    var user={
        "fullname":req.body.fullname,
        "email":req.body.email,
        "password":req.body.password,
        "salt":"salt",
        "role":"customer"
    }
    connection.query("INSERT INTO users SET ?",user, function (error, result) {
      if (error) {
        return res.redirect('/signup');
      }else{
        return res.redirect('/homepage');
      }
    });
}
