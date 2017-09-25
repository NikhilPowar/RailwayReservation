//handling requests to go to corresponding page

exports.route =  function(app){

  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  app.get('/login', function(req, res){
    res.render('login.ejs');
  });

  app.get('/register', function(req, res){
    res.render('signup.ejs');
  });

  app.get('/homepage', function(req, res){
    res.render('homepage.ejs');
  });

  app.post('/login-controller', function(req, res){
      console.log("Email="+req.body.email);
      require('./../controllers/login-controller').login(req, res);
  });

  app.post('/signup-controller', function(req, res){
      require('./../controllers/signup-controller').register(req, res);
  });
}
