// controller for searching trains

var connection = require('./../config');
var moment = require("moment-timezone");
var express = require("express");
var app = express();

exports.history=function(req,res){
  connection.query("SELECT * from history WHERE email=? ORDER BY `date` DESC", [req.session.user.email], function(error, rows, fields){
    if(error){
      console.log(error);
      return res.redirect('/homepage');
    }
    else{
      if(rows.length>0){
        var current_time = moment().tz("Asia/Kolkata");
        var results=[];
        for(var i=0; i<rows.length; i++){
          booked_time = moment(rows[i].time).tz("Asia/Kolkata");
          dep_date = moment(rows[i].date).tz("Asia/Kolkata");
          results.push({
            train_num: rows[i].train_num,
            train_name: rows[i].train_name,
            from: rows[i].from,
            to: rows[i].to,
            date: dep_date.format("YYYY-MM-DD"),
            from_time: rows[i].from_time,
            to_time: rows[i].to_time,
            classtype: rows[i].class,
            seats: rows[i].seats,
            total_fare: rows[i].total_fare,
            booked: booked_time.format("YYYY-MM-DD HH:mm:ss"),
            id: req.session.user.email+"$"+booked_time.format("YYYY-MM-DD_HH:mm:ss"),
            cancellation_valid: dep_date.startOf('day').diff(current_time.startOf('day'), 'days')
          });
        }
        req.session.history = {bookings: results};
        req.session.save();
        res.redirect('/view-history');
      }
      else{
        req.session.history={error: "No history found!"};
        req.session.save();
        res.redirect('/view-history');
      }
    }
  });
}
