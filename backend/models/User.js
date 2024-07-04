const db = require('../config/db');

const User = {};

User.createUser = (firstName, lastName, email, password, age) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (first_name, last_name, email, password, age) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, password, age], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.insertId);
    });
  });
};

User.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = User;
