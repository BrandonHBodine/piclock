
# Arise Pi - Pi Clock Setup

### Trello Board for Project
[Trello Link](https://trello.com/b/7BCedz4N)
[PSQL setup on Debian](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-9-4-on-debian-8)

### Creating your database
 1. createdb pi_clock
 2. Run `SET TIME ZONE 'UTC'` within psql;
 3. add .env file with 'DEV_DB=postgres://localhost/pi_clock'
 4. knex migrate:latest
 5. knex seed:run
