exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('alarms').del(),

    // Inserts seed entries
    knex('alarms').insert({
      name: 'WakeyWakey',
      sun: true,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      am: false,
      pm: true,
      hour: 9,
      min: 25,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    }),
    knex('alarms').insert({
      name: 'Every Other',
      sun: false,
      mon: true,
      tue: false,
      wed: true,
      thu: false,
      fri: true,
      sat: false,
      am: true,
      pm: false,
      hour: 10,
      min: 25,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    }),
    knex('alarms').insert({
      name: 'Weekdays',
      sun: false,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: false,
      am: true,
      pm: false,
      hour: 7,
      min: 15,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString()
    })
  );
};
