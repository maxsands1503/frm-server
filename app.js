var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./api/index');
var list = require('./api/list');
var listItems = require('./api/list_items');
var connections = require('./api/connections');
var app = express();
var auth = require('./auth/index');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/auth', auth);


app.use('/api', api);
app.use('/api/list', list);
app.use('/api/listItems', listItems);
app.use('/api/connections', connections);

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
         res.json({
             message: err.message,
              error: err
         });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
      res.json( {
       message: err.message,
      error: {}
});
});


module.exports = app;
