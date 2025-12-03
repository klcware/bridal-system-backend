const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,   // Veritabanı adı (.env dosyasından)
  process.env.DB_USER,   // Kullanıcı adı
  process.env.DB_PASS,   // Parola
  {
    host: process.env.DB_HOST, // Host (localhost)
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
