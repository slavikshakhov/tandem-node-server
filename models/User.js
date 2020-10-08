const Sequelize = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING      
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
  },
   { timestamps: false }
);

module.exports = User;