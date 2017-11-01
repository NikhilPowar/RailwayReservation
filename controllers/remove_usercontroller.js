var connection = require('./../config');
exports.remove_user=function(req.res){
  var email=req.body.email;
  connection.query('DELETE FROM users where email='"+email+"'');
}
