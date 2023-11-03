const mysql = require('mysql2');

export const getDatabase = () => {
  const db = mysql.createConnection({
    multipleStatements: false,
    host     : 'sql9.freemysqlhosting.net',
    port     : 3306,
    user     : 'sql9654532',
    password : '', //Not secure to store it this way; fill in yourself
    database : 'sql9654532'
  });

  return db;
};

export const closeDBInstance = (db) => {
  db.destroy();
};