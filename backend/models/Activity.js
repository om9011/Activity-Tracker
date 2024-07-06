const db = require('../config/db');

const Activity = {};

Activity.createActivity = (userId, url, timeSpent) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO activities (user_id, url, time_spent) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE time_spent = time_spent + VALUES(time_spent)
    `;
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
    const query = 'SELECT url as website, SUM(time_spent) as TimeSpent, DATE(timestamp) as Date  FROM activities WHERE user_id = ? GROUP BY url, DATE(timestamp)';
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
