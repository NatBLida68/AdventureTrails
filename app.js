var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');  // cookie parser middleware 
const session = require('express-session'); //session middleware
var logger = require('morgan');
const winston = require("winston"); //logger 
var helmet = require('helmet'); //various security options providing middleware

//route req
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myRouter = require('./routes/me');


//app 
var app = express();

app.listen(1234);
app.listen(3000);


// node_modules file redirect setup
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/socket.io/client-dist')); // socket io
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  //npm i ejs

//app.use(helmet());//make sure its before routes
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'","ws://127.0.0.1:3200"],
    },
  })
);  //added exception for socket port

//logger morgan test
app.use(logger('dev'));
const testlogger = require('./middlewares/logger');  //file adding 
//app.use('/me',testlogger.mylogger); //enforcing middleware  of /me routes //disabled for now

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookie and sessions
app.use(cookieParser());  ///cookie parser use defined here
app.use(session({
  secret: 'key-18734673675457-dummy', 
  resave: true,
  saveUninitialized: true
}));  //using sesssion in app

//public directory
app.use(express.static(path.join(__dirname, 'public')));

//enfoce the routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/me', myRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get('/welcome', (req, res, next) => {
  res.json({ message: "Welcome to Advanced Node JS course" });
})

//winston logger test
const loginfo = {
  transports: [
    new winston.transports.File({
      filename: "test.log"
    })
  ]
};


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
process.on("uncaughtException", (err) => { //customize exception handle 
  /* clean up allocated resources */

  /* log errors */
  const logger2 = winston.createLogger(loginfo);
  logger2.info(err); //this logs msg to test.log file

  process.exit(); /* exit the process to avoid unknown state */
})

//sockets socket io base  -refer old chat app for more details
const http = require("http").createServer(app);
/* creating a socket.io instance with express server */
const socket = require("socket.io")
const io = socket(http);
http.listen(3200, () => {
    console.log("Server started at 3200")
});
io.on('connection',(socket)=>{
    
  console.log('New web socket connection')
 
 // socket.emit('welcome',"Welcome !") //working 

socket.on("hello", (msg) => { //if a client emit event server using this server sends to all others
    socket.emit('message',msg)
  });
 // socket.emit('message','A new user has joined !')

})
//sockets end
module.exports = app;
