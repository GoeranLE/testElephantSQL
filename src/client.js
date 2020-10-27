const { Pool } = require("pg");
const pool = new Pool();

module.export = {
  query: (text, params) => pool.query(text, params)
};
