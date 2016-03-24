// Update with your config settings.
require('dotenv').load({
  silent: true
});

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DB
  }
};
