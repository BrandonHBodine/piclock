'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

function startMP3(mp3) {
  fs.createReadStream(mp3)
    .pipe(new lame.Decoder())
    .on('format', function(format) {
      this.pipe(new Speaker(format));
    });
};

/* GET home page. */
router.get('/', function(req, res) {

  startMP3('Circle-Of-Life.mp3');
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
