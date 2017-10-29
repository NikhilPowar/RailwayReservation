//controller for cancellation of tickets

var connection = require('./../config');
var moment = require("moment-timezone");
var express = require("express");
var app = express();

exports.cancel = function(req, res){
  var acc_num = req.body.acc_num;
  var acc_name = req.body.acc_name;
  var ifsc = req.body.ifsc;
  var num_error = "";
  var name_error = "";
  var ifsc_error = "";
  if(acc_num.length>18 || acc_num.length<9){
    num_error = "Account number must be between 9 to 18 digits!";
  }
  var letters = /^[A-Za-z ]+$/;
  var numbers = /^[0-9]+$/;
  if(!acc_name.match(letters)){
    name_error = "Name must contain only alphabets!";
  }
  if(ifsc.length!=11){
    ifsc_error = "IFSC must be 11-digits!";
  }
  else if(!ifsc.substring(0, 4).match(letters)){
    ifsc_error = "IFSC must have first 4 alphbetic characters!";
  }
  else if(ifsc[4]!='0'){
    ifsc_error = "Fifth digit in IFSC must be zero!";
  }
  else if(!ifsc.substring(5, 11).match(numbers)){
    ifsc_error = "Last 6-digits must be numeric!";
  }
  req.session.refund_error = {name: name_error, num: num_error, ifsc: ifsc_error};
  req.session.save();
  if(num_error=="" && name_error=="" && ifsc_error==""){
    connection.query("DELETE FROM tickets WHERE user_email=? AND time=?", [req.session.user.email, req.session.ticket.selected.booked], function(error, results){
      if(error){
        console.log(error);
        res.redirect('/refund-details');
      }
      else{
        var seat_type;
        if(req.session.ticket.selected.classtype=="AC 3-tier"){
          seat_type="ac_seats";
        }
        else if(req.session.ticket.selected.classtype=="Non-AC 3-tier"){
          seat_type="nonac_seats";
        }
        else if(req.session.ticket.selected.classtype=="General"){
          seat_type="general_seats";
        }
        else{
          seat_type="sleeper_seats";
        }
        connection.query("UPDATE seat_status SET "+seat_type+" = "+seat_type+" + ? WHERE train_num=? AND DATEDIFF(date, ?)=0", [parseInt(req.session.ticket.selected.seats), req.session.ticket.selected.train_num, req.session.ticket.selected.date]);
        res.redirect('/cancel-success');
      }
    });
  }
  else{
    res.redirect('/refund-details');
  }
}
