// controller for searching trains

var connection = require('./../config');

exports.search=function(req,res){
    var from=req.body.from;
    var to=req.body.to;
    var classtype=req.body.classtype;
    var seats=req.body.seats;
    var seat_type;

    if(classtype=="AC 3-tier"){
      seat_type="ac_seats";
    }
    else if(classtype=="Non-AC 3-tier"){
      seat_type="nonac_seats";
    }
    else if(classtpye=="General"){
      seat_type="general_seats";
    }
    else{
      seat_type="sleeper_seats";
    }

    var route = "%"+from+"%"+to+"%";

    connection.query("SELECT train_no, train_name, route, time, max_fare FROM trains WHERE route like ? AND ? > ? ", [route, seat_type, seats], function (error, rows, fields) {
      if (error) {
          console.log(error);
          return res.redirect('/train-search');
      }else{
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
              num:rows[i].train_no,
              name:rows[i].train_name,
              from_time:times[x],
              to_time:times[y],
              fare_per_person:fare,
              total_fare:seats*fare
            });
          }
          res.render('search-results.ejs', {trains: results, class_type: classtype, num_of_seats: seats, from_city: from, to_city: to});
        }
        else{
          return res.redirect('/train-search');
        }
      }
    });
}
