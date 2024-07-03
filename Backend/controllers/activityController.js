const Activity = require('../models/Activity');

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

module.exports = {
  recordActivity,
  getUserActivities,
};
