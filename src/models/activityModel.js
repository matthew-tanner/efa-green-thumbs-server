const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Activity = db.define("activity", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Activity;
