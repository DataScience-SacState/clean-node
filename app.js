var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var reports = require('./routes/reports');
var create = require('./routes/create');
var completed = require('./routes/completed');

var app = express();

// AUTH-0
var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');
passport.use(strategy);

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');
// END AUTH-0

// AUTH-0 MiddleWare
app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'M-z_G4eHZKaxHTEpQmRQd53a-d-dQSN7KG5GI5xFlyIlOUWSCjdQHp28FsyZKl_X', resave: false,  saveUninitialized: false, maxAge: null, cookie: { maxAge: 60000  }}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/', routes);
app.use('/reports.json', reports);
app.use('/create', create);
app.use('/completed', completed);

// Auth0 callback handler
app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/fail', session: true }),
    function(req, res, next) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect('http://mattmerr47.auth0.com/callback');
    });

app.get('/user', function (req, res) {
    res.render(req.user);
});

/*
app.get(/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params);
    res.sendfile("static/" + __dirname + req.params[0]);
});
//*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
