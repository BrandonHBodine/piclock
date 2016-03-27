'use strict';
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// Disabled for development on mac
//var Gpio = require('onoff').Gpio;

/* GET home page. */
router.get('/', function(req, res, next) {
  // Disabled for development on mac
  // function blinky() {
  //   var led = new Gpio(21, 'out'); // Export GPIO #14 as an output.
  //   var iv;
  //
  //   // Toggle the state of the LED on GPIO #14 every 200ms.
  //   // Here synchronous methods are used. Asynchronous methods are also available.
  //   iv = setInterval(function() {
  //     led.writeSync(led.readSync() ^ 1);
  //   }, 200);
  //
  //   // Stop blinking the LED and turn it off after 5 seconds.
  //   setTimeout(function() {
  //     clearInterval(iv); // Stop blinking
  //     led.writeSync(0); // Turn LED off.
  //     led.unexport(); // Unexport GPIO and free resources
  //   }, 5000);
  // }
  //
  // blinky();

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
  .then(function(row){
      res.send(row);
  });
});

module.exports = router;
