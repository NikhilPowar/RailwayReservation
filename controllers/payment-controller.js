//controller for authenticating payment details

var connection = require('./../config');
var express = require("express");
var app = express();

exports.authenticate=function(req,res){
  var card_num = req.body.card_num;
  var card_name = req.body.card_name;
  var cvv = req.body.cvv;
  var num_error = "";
  var name_error = "";
  var cvv_error = "";
  if(card_num.length!=16){
    num_error = "Card number must be 16-digits!";
  }
  var letters = /^[A-Za-z ]+$/;
  if(!card_name.match(letters)){
    name_error = "Name must contain only alphabets!";
  }
  if(cvv.length!=3){
    cvv_error = "CVV number must be 3-digits!";
  }
  req.session.pay_error = {name: name_error, num: num_error, cvv: cvv_error};
  req.session.save();
  if(num_error=="" && name_error=="" && cvv_error==""){
    console.log(req.session.train.selected);
    var ticket = {
      "train_num": req.session.train.selected.num,
      "user_email": req.session.user.email,
      "date": req.session.data.from_date,
      "from_time": req.session.train.selected.from_time,
      "to_time": req.session.train.selected.to_time,
      "class": req.session.data.class_type,
      "seats": req.session.data.num_of_seats,
      "from": req.session.data.from_city,
      "to": req.session.data.to_city,
      "total_fare": req.session.train.selected.total_fare
    }
    connection.query("INSERT INTO tickets SET ?", ticket, function(error, result){
      if(error){
        console.log(error);
        res.redirect('/payment');
      }
      else{
        var seat_type;
        if(req.session.data.class_type=="AC 3-tier"){
          seat_type="ac_seats";
        }
        else if(req.session.data.class_type=="Non-AC 3-tier"){
          seat_type="nonac_seats";
        }
        else if(req.session.data.class_type=="General"){
          seat_type="general_seats";
        }
        else{
          seat_type="sleeper_seats";
        }
        connection.query("UPDATE seat_status SET "+seat_type+" = "+seat_type+" - ? WHERE train_num=? AND DATEDIFF(date, ?)=0", [parseInt(req.session.data.num_of_seats), req.session.train.selected.num, req.session.data.from_date])
        res.redirect('/pay-success');
      }
    });
  }
  else{
    res.redirect('/payment');
  }
}
