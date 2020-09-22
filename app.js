var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var jwt = require('jsonwebtoken');
var config = require('./configs/config');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//conect to mongoose
const dbPath = 'mongodb://localhost/cardexdb';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbPath,options);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//autentificar

app.set('llave', config.llave);

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.post('/autenticar',(req,res)=>{

  console.log("autenticar");
  console.log(req.body.user);
  if(req.body.user ==="cesar" && req.body.password ==="holamundo"){
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('llave'), {
      expiresIn: 1440
    });
    res.json({
      message: 'Successful authentication',
      token: token
    });
  } else{
    res.json({
      message: 'Incorrect username or password'
    });
  }
});

const pathProtected = express.Router();
pathProtected.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {
        if (err) {
          return res.json({ message: 'Token invalid' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
          message: 'Token not provided.'
      });
    }
 });

app.get('/data', pathProtected, (req, res) => {
 const date = [
  { id: 1, name: "cesar" }
 ];
 res.json(date);
});

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
