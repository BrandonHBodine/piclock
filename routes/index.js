'use strict';
var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

/* GET home page. */
router.get('/', function(req, res, next) {

  function blinky() {
    var led = new Gpio(21, 'out'); // Export GPIO #14 as an output.
    var iv;

    // Toggle the state of the LED on GPIO #14 every 200ms.
    // Here synchronous methods are used. Asynchronous methods are also available.
    iv = setInterval(function() {
      led.writeSync(led.readSync() ^ 1);
    }, 200);

    // Stop blinking the LED and turn it off after 5 seconds.
    setTimeout(function() {
      clearInterval(iv); // Stop blinking
      led.writeSync(0); // Turn LED off.
      led.unexport(); // Unexport GPIO and free resources
    }, 5000);
  }

  blinky();
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
