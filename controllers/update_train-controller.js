var connection = require('./../config');
exports.add_trains=function(req,res){
var trainno=req.body.train_no;
var trainname=req.body.train_name;
var acfare=req.body.ac_fare;
var nonacfare=req.boy.nonac_fare;
var generalfare=req.body.general_fare;
var sleeperfare=req.body.sleeper_fare;
var maxfare=acfare+" "+nonacfare+" "+generalfare+" "+sleeperfare;
var acseats=req.body.ac_seats;
var nonacseats=req.body.nonac_seats;
var generalseats=req.body.general_seats;
var sleeperseats=req.body.sleeper_seats;
var route = "";
var time="";

for(int i=0; i< num;i++){
  var city = "city" + num;
  var tim = "time" + num;
  var dist = "dist" + num;
  route = route +" "+ req.body.city+ ":"+req.body.dist;
  time = time +" "+ req.body.tim;
};

connection.query('UPDATE table trains SET Train Name= trainname, Route= route, Time= time, AC= acseats, NON-AC= nonacseats, General= generalseats, Sleeper= sleeperseats, Max Fare= maxfare WHERE Train No='+trainno +'');

}
