var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const flash = require('connect-flash');
var favicon = require('serve-favicon');
const expressSession = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./app_server/models/db');
const Param = require('./app_server/models/params');
const Brand = require('./app_server/models/brand');
const constant = require('./app_server/Utils/constant');

var indexRouter = require('./app_server/routers/index');
var usersRouter = require('./app_server/routers/users');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

const hbs = require('./my_handlebars');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSession({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(async function(req, res, next) {
  res.locals.session = req.session;
  //Authentication
  if (req.isAuthenticated()){
    res.locals.user = req.user;
    res.locals.authenticated = ! req.user.anonymous;
  }
  const categories = await Param.getAllCategory();
  res.locals.categories = categories;
  res.locals.categoryChunks = constant.splitToChunk(categories, 4);

  const brands = await Brand.getBrands();
  res.locals.brands = brands;
  res.locals.brandChunks = constant.splitToChunk(brands, 4);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  if (req.headers['content-type'] === 'application/json;') {
    req.headers['content-type'] = 'application/json';
  }
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
