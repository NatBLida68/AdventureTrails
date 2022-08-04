var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');  // cookie parser middleware 
const session = require('express-session'); //session middleware
var logger = require('morgan');
const winston = require("winston"); //logger 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myRouter = require('./routes/me');


var app = express();
app.listen(1234);
console.log('Adventure Trails welcomes you!');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
const testlogger = require('./middlewares/logger');  //file adding 
//app.use('/me',testlogger.mylogger); //enforcing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  ///cookie parser use defined here
app.use(session({
  secret: 'key-18734673675457-dummy', 
  resave: true,
  saveUninitialized: true
}));  //using sesssion in app
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/me', myRouter);

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

const loginfo = {
  transports: [
    new winston.transports.File({
      filename: "test.log"
    })
  ]
};
const logger2 = winston.createLogger(loginfo);
logger2.info("Server started");  // 

module.exports = app;
