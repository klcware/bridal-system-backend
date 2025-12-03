const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // Render production DB
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Local development DB
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
    }
  );
}

module.exports = sequelize;
