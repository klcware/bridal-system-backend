// config/db.js
const { Sequelize } = require("sequelize");

// Burada .env'e gerek yok, Render env'den alıyoruz
// require("dotenv").config();

// Canlıda sadece DATABASE_URL kullanacağız
if (!process.env.DATABASE_URL) {
  console.error("FATAL: DATABASE_URL is NOT set in environment!");
  console.error("Current env keys:", Object.keys(process.env));
  process.exit(1);
}

console.log("🔌 Using DATABASE_URL for Postgres:", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
