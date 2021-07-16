const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Trip = db.define("trip", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  permaLink: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  activites: {
    type: DataTypes.ARRAY,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  public: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Trip;
