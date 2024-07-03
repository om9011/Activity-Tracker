const db = require('../config/db');

const RestrictedWebsite = {};

// Function to add a website to restricted list
RestrictedWebsite.addRestrictedWebsite = (userId, url) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO restricted_websites (user_id, url) VALUES (?, ?)';
    db.query(query, [userId, url], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.insertId);
    });
  });
};

// Function to get restricted websites by user ID
RestrictedWebsite.getRestrictedWebsitesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM restricted_websites WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

// Function to remove a website from restricted list
RestrictedWebsite.removeRestrictedWebsite = (restrictionId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM restricted_websites WHERE id = ?';
    db.query(query, [restrictionId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.affectedRows > 0);
    });
  });
};

// Function to set timer for a website
RestrictedWebsite.setTimerForWebsite = (userId, url, timeLimit) => {
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

// Function to remove timer for a website
RestrictedWebsite.removeTimerForWebsite = (timerId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM website_timers WHERE id = ?';
    db.query(query, [timerId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.affectedRows > 0);
    });
  });
};

module.exports = RestrictedWebsite;
