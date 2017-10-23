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

  app.get('/train-search', function(req, res){
    res.render('train-search.ejs');
  });

  app.get('/view-history', function(req, res){
    res.render('view-history.ejs');
  });

  app.post('/login-controller', function(req, res){
      require('./../controllers/login-controller').login(req, res);
  });

  app.post('/signup-controller', function(req, res){
      require('./../controllers/signup-controller').register(req, res);
  });

  app.post('/search-controller', function(req, res){
      require('./../controllers/search-controller').search(req, res);
  });
}
