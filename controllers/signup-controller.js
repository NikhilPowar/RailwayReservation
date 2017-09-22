// controller for signing up on the website

var connection = require('./../config');

exports.register=function(req,res){
    var user={
        "fullname":req.body.fullname,
        "email":req.body.email,
        "password":req.body.password,
        "salt":"salt"
    }
    connection.query("INSERT INTO users SET ?",user, function (error, result) {
      if (error) {
        res.json({
            status:false,
            message:'Insertion failed'
        });
      }else{
        res.json({
            status:true,
            data:result,
            message:'Insertion Successful'
        });
      }
      console.log(result);
    });
}
