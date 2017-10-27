//handling requests to go to corresponding page
var session = require('express-session');
exports.route =  function(app){

  app.use(session({ secret: 'secret-token'}));

  app.use(function(req, res, next) {
    res.locals.data = req.session.data;
    next();
  });

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
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else
      res.render('homepage.ejs');
  });

  app.get('/train-search', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else res.render('train-search.ejs');
  });

  app.get('/search-results', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else
      res.render('search-results.ejs', {session: req.session});
  });

  app.post('/book-tickets', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else{
      var index=0;
      for(var x=0; x<req.session.data.trains.length; x++){
        if(req.session.data.trains[x].num==req.body.train_num){
          index=x;
          break;
        }
      }
      req.session.train={selected: req.session.data.trains[index]};
      req.session.save();
      res.render('book-tickets.ejs', {session: req.session});
    }
  });

  app.post('/payment', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else
      res.render('payment.ejs', {session: req.session});
  });

  app.get('/payment', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else
      res.render('payment.ejs', {session: req.session});
  });

  app.get('/pay-success', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else
      res.render('pay-success.ejs', {session: req.session});
  });

  app.get('/view-history', function(req, res){
    if(req.session.user==null)
      res.render('unauthorized.ejs');
    else
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

  app.post('/payment-controller', function(req, res){
      require('./../controllers/payment-controller').authenticate(req, res);
  });
}
