process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var knex = require('./db/knex.js');
var http = require('http');
var https = require('https');

var routes = require('./routes/index');
var ledControls = require('./routes/ledControls');
var mp3Controls = require('./routes/mp3Controls');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/ledControls', ledControls);
app.use('/mp3Controls', mp3Controls);

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

// This will be the function that checks the database and will call functions based on when they are on or off
setInterval(monitorAlarms, 60000);

function monitorAlarms() {
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var day = parseDaysOfWeek(time.getDay());
  var ampm = getAmOrPm(time)
  var normalHours = normalizeHours(hours);

  alarmCheck(day, normalHours, minutes, ampm);
  console.log('Day: ' + day + ' Time: Hours: ' + normalHours + ' Minutes: ' + minutes + ' ' + ampm);
};

function parseDaysOfWeek(num) {
  if (num === 0) {
    return 'sun'
  } else if (num === 1) {
    return 'mon'
  } else if (num === 2) {
    return 'tue'
  } else if (num === 3) {
    return 'wed'
  } else if (num === 4) {
    return 'thu'
  } else if (num === 5) {
    return 'fri'
  } else if (num === 6) {
    return 'sat'
  }
}

function getAmOrPm(dateObj) {
  var hours = dateObj.getHours();
  if (hours < 12) {
    return 'am';
  } else {
    return 'pm';
  }
}

function normalizeHours(fullHour) {
  var hour = fullHour;
  if (hour > 12) {
    hour -= 12;
  }
  return hour;
}

function alarmCheck(dayNow, hourNow, minutesNow, ampmNow) {
  var check = {};
  check[dayNow] = true;
  check.hour = hourNow;
  check.min = minutesNow;
  check[ampmNow] = true;

  knex.select()
    .table('alarms')
    .where(check)
    .then(function(rows) {
      if (rows.length > 0) {
        console.log('ALARM FOUND!!!!');
        console.log(rows);
        postLedOn();
        postMp3On();
      } else {
        console.log('No alarms found, stay asleep sweet prince.');
      }
    });
}

function postLedOn() {
  var options = {
    // hostname: 'localhost',
    // port: process.env.PORT,
    path:'/ledControls/on',
    method: 'POST'
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // }
  };

  var ledOnReq = https.request(options, function(res) {
    res.on('end',function(){
      console.log('No more data in response.')
    })
  });

  ledOnReq.on('error', function(error) {
    console.log('problem with request: ' + error);
  });

  ledOnReq.end();

};

function postMp3On() {
  var options = {
    // hostname: 'localhost',
    // port: process.env.PORT,
    path:'/mp3Controls/on',
    method: 'GET'
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // }
  };

  var mp3OnReq = https.request(options, function(res) {
    res.on('end',function(){
      console.log('No more data in response.')
    })
  });

  mp3OnReq.on('error', function(error) {
    console.log('problem with request: ' + error );
  });

  mp3OnReq.end();

};

function postLedOff() {

}

module.exports = app;
