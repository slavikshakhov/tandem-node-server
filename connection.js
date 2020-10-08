const Sequelize = require('sequelize');
//const mysql = require('mysql2');

const connection = new Sequelize('tandem', 'root', 'gerKanuk55', {
    host: 'localhost',
    dialect: 'mysql'
});
connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {  
    console.error('Unable to connect to the database:', err);
});

module.exports = connection;