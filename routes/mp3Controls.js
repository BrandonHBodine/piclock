'use strict';
var express = require('express');
var router = express.Router();
var player = require('player');

var playlist = player([
  '../mp3/CircleOfLife.mp3',
  '../mp3/CircleOfLife.mp3',
  '../mp3/CircleOfLife.mp3',
  '../mp3/CircleOfLife.mp3'
]);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'MPS Controls',
  });
});

/* Testing route to turn on music */
router.get('/on', function(req, res){
  playlist.play();
  res.render('index', {
    title: 'MP3 ON!',
  });

});

/* Testing route to turn off music */
router.get('/off', function(req, res){
  playlist.stop();
  res.render('index', {
    title: 'MP3 OFF!',
  });
});

module.exports = router;
