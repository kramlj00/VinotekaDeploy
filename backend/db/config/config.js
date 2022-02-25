const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;

module.exports = {
  development: {
    username: "postgres",
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
    username: "postgres",
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
