const Sequelize= require('Sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize(process.env.DB_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
        logging: false,

  }
);

 
module.exports = db;