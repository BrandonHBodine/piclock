'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('alarms', function(table){
    table.increments('id');
    table.string('name');
    table.boolean('sun');
    table.boolean('mon');
    table.boolean('tue');
    table.boolean('wed');
    table.boolean('thu');
    table.boolean('fri');
    table.boolean('sat');
    table.integer('hour');
    table.integer('min');
    table.boolean('am');
    table.boolean('pm');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('alarms');
};
