const {Sequelize} = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];

// Connect to DB with Sequelize
const sequelize = new Sequelize(config);

module.exports = sequelize;