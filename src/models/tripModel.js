const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Trip = db.define("trip", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  permaLink: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Trip;
