'use strict';
var express = require('express');
var router = express.Router();
var Player = require('player');

//Until I can make middleware this has to be here to expose the on and off functinality to the routes
var songFile = randomSong();
// create player instance
var player = new Player(songFile);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'MPS Controls',
  });
});

/* Testing route to turn on music */
router.get('/on', function(req, res) {
  player.play(function(err, player) {
    console.log('playend!');
  });
  res.render('index', {
    title: 'MP3 ON!',
  });

});

/* Testing route to turn off music */
router.get('/off', function(req, res) {
  player.stop();
  res.render('index', {
    title: 'MP3 OFF!',
  });
});

// Random song picker

function randomSong() {
  var song = getRandomIntInclusive(1, 4);
  var dir = './mp3/'
    // Defualt song becuase tired
  var title = 'CircleOfLife.mp3';
  if (song === 1) {
    title = 'FlightOfTheConchords-IfYoureIntoIt.mp3';
  } else if (song === 2) {
    title = 'LadyGaga-Alejandro.mp3';
  } else if (song === 3) {
    title = 'SystemOfADown-ChopSuey.mp3';
  } else {
    title = 'The1975-TheSound.mp3';
  }
  console.log('Wake up song is ' + title);
  return dir + title;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
