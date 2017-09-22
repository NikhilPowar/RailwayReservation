// controller for logging in to the website

var connection = require('./../config');

exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    connection.query('SELECT password FROM users WHERE email = ?',[email], function (error, results) {
      if (error) {
          res.json({
            status:false,
            message:'there are some errors with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:true,
                    message:'successfully authenticated'
                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }

        }
        else{
          res.json({
              status:false,
            message:"Email does not exist"
          });
        }
      }
      console.log(results);
    });
}
