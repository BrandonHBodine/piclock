'use strict';
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// Disabled for development on mac
var Gpio = require('onoff').Gpio;

/* GET home page. */
router.get('/', function(req, res, next) {
  // Disabled for development on mac
  // Avliable to the whole route. Will most likely have to move elsewhere
  var led = new Gpio(19, 'out');

  function ledOn() {
    //Since we unexport the GPIO we will have to import it again
    var led = new Gpio(19, 'out');
    led.writeSync(0);
  }

  function ledOff(){
    led.writeSync(1);
  }

  function exit() {
    led.unexport();
    process.exit();
  }

  ledOff();

  res.render('index', {
    title: 'Pi Clock',
  });

});

// Get Alarms
router.get('/alarms', function(req, res, next) {
  knex.select()
    .from('alarms')
    .then(function(data) {
      res.json(data);
    });
});

router.post('/alarms/add', function(req, res, next) {
  console.log(req.body);
  var alarm = {};
  alarm.name = req.body.name;
  alarm.sun = req.body.sun || false;
  alarm.mon = req.body.mon || false;
  alarm.tue = req.body.tue || false;
  alarm.wed = req.body.wed || false;
  alarm.thu = req.body.thu || false;
  alarm.fri = req.body.fri || false;
  alarm.sat = req.body.sat || false;
  alarm.hour = req.body.hour;
  alarm.min = req.body.min;
  alarm.am = req.body.am;
  alarm.pm = req.body.pm;
  alarm.created_at = new Date().toUTCString();
  alarm.updated_at = new Date().toUTCString();
  // Create databse record
  knex('alarms').insert(alarm).then(function(response) {
    res.send(response);
  });
});

// Get Alarms
router.get('/alarms/:id', function(req, res, next) {
  var id = req.params.id;
  res.send(id);
});

router.delete('/alarms/:id', function(req, res, next) {
  var id = req.params.id;
  knex('alarms')
    .where('id', id)
    .del()
    .then(function(row) {
      res.send(row);
    });
});

module.exports = router;
