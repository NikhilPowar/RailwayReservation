var connection = require('./../config');
var express = require("express");
var app = express();

exports.load_train_data=function(req,res){
  var tid = req.body.train_id;
  connection.query("SELECT * FROM trains WHERE train_num=?",[tid], function(error, rows, fields){
    if(error){
      console.log(error);
      return res.redirect('/homepage');
    }
    else{
      if(rows.length==1){
        var results=[];

          results.push({
            train_num: rows[0].train_num,
            train_name: rows[0].train_name,
            time: rows[0].time,
            route: rows[0].route,
            ac: rows[0].ac_seats,
            non_ac: rows[0].nonac_seats,
            sleeper: rows[0].sleeper_seats,
            general: rows[0].general_seats,
            max_fare:rows[0].max_fare,


          });
        console.log(results);
        req.session.loaded_data = {ldata: results};
        req.session.save();
        res.redirect('/to_update');
      }
      else{
        res.redirect('/update_trains');
      }
    }
  });
}
