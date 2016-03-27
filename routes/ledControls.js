'use strict';
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Gpio = require('onoff').Gpio;
var led = new Gpio(19, 'out');

// Need to move to module once finished
function ledOn() {
  //Since we might unexport the GPIO we will have to import it again
  var led = new Gpio(19, 'out');
  led.writeSync(0);
}

function ledOff() {
  led.writeSync(1);
}

function exit() {
  led.unexport();
  process.exit();
}

function status() {
  var st = led.readSync()
  return led;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  var state = status();
  console.log(state);
  res.render('index', {
    title: state
  });

});

/* LED ON */
router.get('/on', function(req, res, next) {
  ledOn();
  res.render('index', {
    title: 'LED off!',
  });

});

/* LED OFF */
router.get('/off', function(req, res, next) {
  ledOff();
  res.render('index', {
    title: 'Pi Clock',
  });
});




module.exports = router;
