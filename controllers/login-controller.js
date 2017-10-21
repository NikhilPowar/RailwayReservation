// controller for logging in to the website

var connection = require('./../config');

exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var role=req.body.role;
    connection.query('SELECT password FROM users WHERE email = ? and role = ?', [email, role], function (error, results) {
      if (error) {
          return res.redirect('/login');
      }else{
        if(results.length>0){
            if(password==results[0].password){
                return res.redirect('/homepage');
            }
            else{
                return res.redirect('/login');
            }
        }
        else{
          return res.redirect('/login');
        }
      }
      console.log(results);
    });
}
