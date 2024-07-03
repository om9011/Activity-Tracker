const db = require('../config/db');

const TimeLimit = {};

TimeLimit.setTimeLimit = (userId, url, timeLimit) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO time_limits (user_id, url, time_limit) VALUES (?, ?, ?)';
    db.query(query, [userId, url, timeLimit], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.insertId);
    });
  });
};

TimeLimit.getTimeLimitByUserIdAndUrl = (userId, url) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM time_limits WHERE user_id = ? AND url = ?';
    db.query(query, [userId, url], (err, results) => {
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

module.exports = TimeLimit;
