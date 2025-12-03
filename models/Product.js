// backend/models/Product.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  // Ürün adı
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Model / stok kodu (opsiyonel)
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // kiralık / satılık
  type: {
    type: DataTypes.ENUM("kiralık", "satılık"),
    allowNull: false,
  },

  // Beden (36, 38, 40 vs.)
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Renk bilgisi
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Mağaza konumu: Kat / Bölüm / Askı
  floor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hanger: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Stok durumu
  status: {
    type: DataTypes.ENUM("stokta", "kirada", "satıldı", "pasif"),
    defaultValue: "stokta",
  },

  // Görsel yolu (örn: /uploads/products/123123-123.jpg)
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Ek notlar
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Product;
