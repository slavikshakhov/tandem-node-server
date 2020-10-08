const Sequelize = require('sequelize');
const sequelize = require('../connection');

const WantedLg = sequelize.define('wantedlg', {    
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }    
}, { timestamps: false});

module.exports = WantedLg; 