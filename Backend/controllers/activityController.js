const Activity = require('../models/Activity');
const db = require('../config/db');


// Function to record user activity
const recordActivity = async (req, res) => {
  const { userId, website, timeSpent } = req.body;

  try {
    // Create a new activity record in the database
    const newActivity = await Activity.createActivity(userId, website, timeSpent);

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error recording activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get user activities
const getUserActivities = async (req, res) => {
  const { userId } = req.user; // Extract user ID from authenticated request

  try {
    // Fetch user activities from the database
    const activities = await Activity.getUserActivities(userId);

    res.json(activities);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTodaysTimeSpent = async (req, res) => {
  const { userId } = req.user; // Assuming user ID is set in the request object by the auth middleware

  const query = `
    SELECT url as website, SUM(time_spent) as totalTimeSpent
    FROM activities
    WHERE user_id = ? AND DATE(timestamp) = CURDATE()
    GROUP BY url;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching activities:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.json(results);
  });
};

module.exports = {
  recordActivity,
  getUserActivities,
  getTodaysTimeSpent,
};
