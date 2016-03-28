'use strict';
var express = require('express');
var router = express.Router();
var Player = require('player');

// create player instance
var player = new Player('../mp3/CircleOfLife.mp3');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'MPS Controls',
  });
});

/* Testing route to turn on music */
router.get('/on', function(req, res){
  player.play();
  res.render('index', {
    title: 'MP3 ON!',
  });

});

/* Testing route to turn off music */
router.get('/off', function(req, res){
  player.stop();
  res.render('index', {
    title: 'MP3 OFF!',
  });
});

module.exports = router;
