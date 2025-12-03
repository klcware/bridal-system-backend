// backend/models/ProductReservation.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProductReservation = sequelize.define("ProductReservation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = ProductReservation;
