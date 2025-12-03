// backend/models/Appointment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define("Appointment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },

  phone: { type: DataTypes.STRING, allowNull: false },

  // Tarih (sadece gün)
  date: {
    type: DataTypes.DATEONLY, // DB'de TIMESTAMP olsa da SELECT/INSERT çalışır
    allowNull: false,
  },

  // Seçilen saat (örn: "11:00")
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    // DB’de daha önce ne kullandıysak ona uyalım.
    // Eğer tabloda 'Onaylandı' varsa, ENUM’u da öyle bırakmak daha güvenli.
    type: DataTypes.ENUM("Bekliyor", "Onaylandı", "İptal"),
    defaultValue: "Bekliyor",
  },
});

module.exports = Appointment;
