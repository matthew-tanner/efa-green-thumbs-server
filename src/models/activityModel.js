const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Activity = db.define("activity", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(2048),
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Activity;
