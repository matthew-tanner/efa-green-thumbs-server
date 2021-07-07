const Sequelize = require("sequelize");
const {dbURL} = require("../config/index");

const sequelize = new Sequelize(dbURL, {
  logging: false
});

module.exports = sequelize;