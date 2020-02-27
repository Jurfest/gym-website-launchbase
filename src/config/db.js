const { Pool } = require("pg");

module.exports = new Pool({
  user: 'diegojurfestceccon',
  password: '',
  host: 'localhost',
  port: 5432,
  database: "gymmanager"
});