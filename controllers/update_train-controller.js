var connection = require('./../config');
var express = require("express");
var app = express();

exports.update_trains=function(req,res){
var trainno=req.body.train_no;
var trainname=req.body.train_name;
var acfare=req.body.ac_fare;
var nonacfare=req.body.nonac_fare;
var generalfare=req.body.general_fare;
var sleeperfare=req.body.sleeper_fare;
var maxfare=req.body.ac_fare+" "+req.body.nonac_fare+" "+req.body.general_fare+" "+req.body.sleeper_fare;
var acseats=req.body.ac_seats;
var nonacseats=req.body.nonac_seats;
var generalseats=req.body.general_seats;
var sleeperseats=req.body.sleeper_seats;
var route = "";
var time="";
var num = req.session.loaded_data.ldata[0].route.split(" ").length;
console.log(req.body);
for(var i=0; i< num;i++){
  route = route + req.body.city[i] + ":"+ req.body.dist[i] + " ";
  time = time + req.body.time[i] + " ";
};
route=route.trim();
time=time.trim();

connection.query('UPDATE trains SET train_name=?, route=?, time=?, ac_seats=?, nonac_seats=?, general_seats=?, sleeper_seats=?, max_fare=? WHERE train_num=?', [trainname, route, time, acseats, nonacseats, generalseats, sleeperseats, maxfare, trainno], function(error, results){
  if(error){
    return res.redirect('/admin-homepage');
  }
  else{
    return res.redirect('/change-success');
  }
});
}
