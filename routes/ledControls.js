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

function ledOff(){
  led.writeSync(1);
}

function exit() {
  led.unexport();
  process.exit();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Nothing yet but maybe a status of the led',
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
router.get('/on', function(req, res, next) {
  ledOff();
  res.render('index', {
    title: 'Pi Clock',
  });
});




module.exports = router;
