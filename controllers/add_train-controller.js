var connection = require('./../config');
var express = require("express");
var app = express();

exports.add_trains=function(req,res){
var trainno=req.body.train_no;
var trainname=req.body.train_name;
var acfare=req.body.ac_fare;
var nonacfare=req.boy.nonac_fare;
var generalfare=req.body.general_fare;
var sleeperfare=req.body.sleeper_fare;
var maxfare=req.body.ac_fare+" "+req.body.nonac_fare+" "+req.body.general_fare+" "+req.body.sleeper_fare;
var acseats=req.body.ac_seats;
var nonacseats=req.body.nonac_seats;
var generalseats=req.body.general_seats;
var sleeperseats=req.body.sleeper_seats;
var route = "";
var time="";

for(var i=0; i<num;i++){
  route = route + req.body.city[i] + ":"+ req.body.dist[i] + " ";
  time = time + req.body.time[i] + " ";
};
route=route.trim();
time=time.trim();


var train={
  "train_num": trainno,
  "train_name": trainname,
  "route": route,
  "time": time,
  "ac_seats": acseats,
  "nonac_seats": nonacseats,
  "general_seats": generalseats,
  "sleeper_seats": sleeperseats,
  "max_fare": maxfare
}

connection.query('INSERT INTO trains SET ?', train, function(error, result){
  if(error){
    return res.redirect('/admin-homepage');
  }
  else{
    return res.redirect('/change-success');
  }
});
}
