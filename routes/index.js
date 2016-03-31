'use strict';
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/* GET home page. */
router.get('/', function(req, res) {
  res.json({piclock: true});
});

// Get Alarms
router.get('/alarms', function(req, res) {
  knex.select()
    .from('alarms')
    .then(function(data) {
      res.json(data);
    });
});

//Get Route for presentation purpose
// Bad Coding but should work for quickly getting presentation going
router.get('/present', function(req, res) {
  var timeInMs = Date.now();
  // add three minutes
  var threeMinutesAhead = new Date( timeInMs + 180000).toLocaleTimeString();
  var str = threeMinutesAhead.toLocaleString();
  var arr = str.split(':');
  var alarm = {};
  alarm.name = 'Presentation';
  alarm.sun = true;
  alarm.mon = true;
  alarm.tue = true;
  alarm.wed = true;
  alarm.thu = true;
  alarm.fri = true;
  alarm.sat = true;
  alarm.hour = Number(arr[0]);
  alarm.min = Number(arr[1]);
  alarm.am = true;
  alarm.pm = true;
  alarm.created_at = new Date().toUTCString();
  alarm.updated_at = new Date().toUTCString();
  // Create databse record
  knex('alarms').insert(alarm).then(function(response) {
    res.send(response);
  });
});

router.post('/alarms/add', function(req, res) {
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
router.get('/alarms/:id', function(req, res) {
  var id = req.params.id;
  res.send(id);
});

router.delete('/alarms/:id', function(req, res) {
  var id = req.params.id;
  knex('alarms')
    .where('id', id)
    .del()
    .then(function() {
      res.sendStatus('Alarm with deleted with id: ' + id);
    });
});

module.exports = router;
