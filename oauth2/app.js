var cors = require('cors');
var session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var newOauth = require('./routes/newOauth');
var passport = require('passport');
require('./strategy');

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const isLoggedIn = function (req, res, next){
  console.log(req.headers);
  if(req.isAuthenticated()){
    next();
  }else{
    res.sendStatus(401);
  }
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.options('*', cors());
app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use('/', newOauth);
app.use('/users', isLoggedIn,usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
