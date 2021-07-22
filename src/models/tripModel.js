const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Trip = db.define("trip", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parkCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permaLink: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Trip;
