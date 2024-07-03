const RestrictedWebsite = require('../models/RestrictedWebsite');

// Function to add a website to restricted list
const addToRestrictedList = async (req, res) => {
  const { userId, website } = req.body;

  try {
    // Add website to restricted list in the database
    const restrictionId = await RestrictedWebsite.addRestrictedWebsite(userId, website);

    res.status(201).json({ id: restrictionId, userId, website });
  } catch (error) {
    console.error('Error adding website to restricted list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to remove a website from restricted list
const removeFromRestrictedList = async (req, res) => {
  const restrictionId = req.params.id;

  try {
    // Remove website from restricted list in the database
    const removed = await RestrictedWebsite.removeRestrictedWebsite(restrictionId);

    if (removed) {
      res.json({ message: 'Website removed from restricted list' });
    } else {
      res.status(404).json({ message: 'Website not found in restricted list' });
    }
  } catch (error) {
    console.error('Error removing website from restricted list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to set timer for a website
const setTimerForWebsite = async (req, res) => {
  const { userId, website, timeLimit } = req.body;

  try {
    // Set timer for website in the database (Assuming logic is handled in RestrictedWebsite model)
    const newTimer = await RestrictedWebsite.setTimerForWebsite(userId, website, timeLimit);

    res.status(201).json(newTimer);
  } catch (error) {
    console.error('Error setting timer for website:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to remove timer for a website
const removeTimerForWebsite = async (req, res) => {
  const timerId = req.params.id;

  try {
    // Remove timer for website in the database (Assuming logic is handled in RestrictedWebsite model)
    const removed = await RestrictedWebsite.removeTimerForWebsite(timerId);

    if (removed) {
      res.json({ message: 'Timer removed for website' });
    } else {
      res.status(404).json({ message: 'Timer not found for website' });
    }
  } catch (error) {
    console.error('Error removing timer for website:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addToRestrictedList,
  removeFromRestrictedList,
  setTimerForWebsite,
  removeTimerForWebsite,
};
