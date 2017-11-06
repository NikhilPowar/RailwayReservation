var connection = require('./../config');


exports.load_train_data=function(req,res){
  var tid =req.body.train_id;
  connection.query("SELECT * FROM trains WHERE train_no =?",[tid], function(error, rows, fields){
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
            time: row[0].Time,
            route: row[0].Route,
            ac: row[0].AC,
            non_ac: row[0].Non-AC,
            sleeper: row[0].Sleeper,
            general: row[0].General,
            max_fare:row[0].Max_Fare,


          });

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
