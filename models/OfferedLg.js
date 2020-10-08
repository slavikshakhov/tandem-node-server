const Sequelize = require('sequelize');
const sequelize = require('../connection');

const OfferedLg = sequelize.define('offeredlg', {    
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }    
}, { timestamps: false});

module.exports = OfferedLg;