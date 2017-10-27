// controller for searching trains

var connection = require('./../config');
var express = require("express");
var app = express();

exports.search=function(req,res){
    var from=req.body.from;
    var to=req.body.to;
    var date=req.body.date;
    var classtype=req.body.classtype;
    var seats=req.body.seats;
    var seat_type;

    var date_arr = date.split("/");
    date = date_arr[2]+"-"+date_arr[0]+"-"+date_arr[1]

    if(classtype=="AC 3-tier"){
      seat_type="ac_seats";
    }
    else if(classtype=="Non-AC 3-tier"){
      seat_type="nonac_seats";
    }
    else if(classtype=="General"){
      seat_type="general_seats";
    }
    else{
      seat_type="sleeper_seats";
    }

    var route = "%"+from+"%"+to+"%";

    connection.query("SELECT trains.train_num, trains.train_name, trains.route, trains.time, trains.max_fare FROM trains JOIN seat_status ON trains.train_num=seat_status.train_num WHERE route like ? AND ? > ? AND DATEDIFF(date, ?)=0", [route, seat_type, seats, date], function (error, rows, fields) {
      if (error) {
          console.log(error);
          return res.redirect('/train-search');
      }
      else{
        if(rows.length>0){
          var results = [];
          for(var i=0; i<rows.length; i++){
            var cities = rows[i].route.split(" ");
            var times = rows[i].time.split(" ");
            var x=0;
            var y=0;
            for(var j=0; j<cities.length; j++){
              if(cities[j].split(":")[0]==from.toUpperCase()){
                x=j;
              }
              if(cities[j].split(":")[0]==to.toUpperCase()){
                y=j;
              }
            }
            var z=0;
            if(classtype=="AC 3-tier")
              z=0;
            if(classtype=="Non-AC 3-tier")
              z=1;
            if(classtype=="General")
              z=2;
            if(classtype=="Sleeper")
              z=3;
            var fare = Math.ceil((parseInt(cities[y].split(":")[1])-parseInt(cities[x].split(":")[1]))/(parseInt(cities[cities.length-1].split(":")[1]))*parseInt(rows[i].max_fare.split(" ")[z]));
            results.push({
              num:rows[i].train_num,
              name:rows[i].train_name,
              from_time:times[x],
              to_time:times[y],
              fare_per_person:fare,
              total_fare:seats*fare
            });
          }
          req.session.search_error = null;
          req.session.data = {trains: results, class_type: classtype, num_of_seats: seats, from_city: from, to_city: to, from_date:date};
          req.session.save();
          res.redirect('/search-results');
        }
        else{
          req.session.data = {class_type: classtype, num_of_seats: seats, from_city: from, to_city: to};
          req.session.search_error= {error: "Sorry there are no available trains."};
          req.session.save();
          return res.redirect('/search-results');
        }
      }
    });
}
