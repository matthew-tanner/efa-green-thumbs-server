const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Activity = db.define("activity", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Activity;
