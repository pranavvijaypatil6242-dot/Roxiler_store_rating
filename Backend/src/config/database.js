const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "store_rating_app",
  process.env.DB_USER || "app_user",
  process.env.DB_PASSWORD || "prem1210",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
