const db = require('../config/db');

const Activity = {};

Activity.createActivity = (userId, url, timeSpent) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO activities (user_id, url, time_spent) VALUES (?, ?, ?)';
    db.query(query, [userId, url, timeSpent], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.insertId);
    });
  });
};

Activity.getUserActivities = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM activities WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

module.exports = Activity;
