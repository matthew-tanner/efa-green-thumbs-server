require("dotenv").config();

const config = {
  appPort: parseInt(process.env.APP_PORT),
  dbURL: `postgres://${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_HOST}:${parseInt(
    process.env.DB_PORT
  )}/${process.env.DB_NAME}`,
};

module.exports = config;
