const Sequelize = require('sequelize');
//const mysql = require('mysql2');
/*
const connection = new Sequelize('tandem', 'root', 'gerKanuk55', {
    host: 'localhost',
    dialect: 'mysql'
});
*/
const connection = new Sequelize('heroku_e7f976b84f567b9', 'b690bd5185aff9', '1815f368', {
    host: 'eu-cdbr-west-03.cleardb.net',
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