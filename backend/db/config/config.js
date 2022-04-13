require("dotenv").config();

const parse = require("pg-connection-string").parse;

const { user, password, database, host, port } = parse(
  process.env.DATABASE_URL
);

module.exports = {
  development: {
    username: user,
    password,
    database,
    host,
    port,
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "test",
    database: "test-db",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  },
  production: {
    username: user,
    password,
    database,
    host,
    port,
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
    ssl: true,
  },
};
