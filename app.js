var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sqlite3 = require('sqlite3').verbose();
var session = require('express-session');
const sqliteStore = require('connect-sqlite3')(session);
var indexRouter = require('./routes/index');
var changePasswordRouter = require('./routes/change_password');
var quizRouter = require('./routes/quiz');
var resultRouter = require('./routes/result');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new sqliteStore,
  resave: true,
  saveUninitialized: false,
  secret: 'sAn7baRbhx4',
  cookie: {
    maxAge: 900000
  }
}));

app.use((req, res, next) => {
  req.db = new sqlite3.Database('base.db')
  next()
})

app.use('/', indexRouter);
app.use('/change_password', changePasswordRouter);
app.use('/quiz', quizRouter);
app.use('/result', resultRouter);

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
