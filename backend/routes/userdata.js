const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// ============ MOOD HISTORY ============

// Get user's mood history
router.get('/moods', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.moodHistory || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mood history' });
  }
});

// Save new mood entry
router.post('/moods', isAuthenticated, async (req, res) => {
  try {
    const { emotion, intensity, note } = req.body;
    
    const moodEntry = {
      emotion,
      intensity,
      note,
      timestamp: new Date()
    };

    const user = await User.findById(req.user._id);
    if (!user.moodHistory) user.moodHistory = [];
    user.moodHistory.push(moodEntry);
    await user.save();

    res.json({ message: 'Mood saved', moodEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error saving mood' });
  }
});

// ============ JOURNAL ENTRIES ============

// Get user's journal entries
router.get('/journal', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.journalEntries || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal entries' });
  }
});

// Save new journal entry
router.post('/journal', isAuthenticated, async (req, res) => {
  try {
    const { text } = req.body;
    
    const journalEntry = {
      text,
      timestamp: new Date(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const user = await User.findById(req.user._id);
    if (!user.journalEntries) user.journalEntries = [];
    user.journalEntries.push(journalEntry);
    await user.save();

    res.json({ message: 'Journal entry saved', journalEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error saving journal entry' });
  }
});

// Delete journal entry
router.delete('/journal/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.journalEntries = user.journalEntries.filter(
      entry => entry._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ message: 'Journal entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting journal entry' });
  }
});

// ============ GOALS / TODOS ============

// Get user's goals
router.get('/goals', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.goals || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

// Save new goal
router.post('/goals', isAuthenticated, async (req, res) => {
  try {
    const { text } = req.body;
    
    const goal = {
      text,
      completed: false,
      createdAt: new Date()
    };

    const user = await User.findById(req.user._id);
    if (!user.goals) user.goals = [];
    user.goals.push(goal);
    await user.save();

    res.json({ message: 'Goal saved', goal });
  } catch (error) {
    res.status(500).json({ message: 'Error saving goal' });
  }
});

// Update goal (toggle complete or edit text)
router.put('/goals/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const goal = user.goals.id(req.params.id);
    
    if (goal) {
      if (req.body.completed !== undefined) {
        goal.completed = req.body.completed;
      }
      if (req.body.text !== undefined) {
        goal.text = req.body.text;
      }
      await user.save();
      res.json({ message: 'Goal updated', goal });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal' });
  }
});

// Delete goal
router.delete('/goals/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.goals = user.goals.filter(
      goal => goal._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

// Update profile (name and bio)
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Update avatar
router.put('/profile/avatar', isAuthenticated, async (req, res) => {
  try {
    const { profilePic } = req.body;
    
    const user = await User.findById(req.user._id);
    user.profilePic = profilePic;
    await user.save();

    res.json({ message: 'Avatar updated', profilePic });
  } catch (error) {
    console.error('Avatar update error:', error);
    res.status(500).json({ message: 'Error updating avatar' });
  }
});

module.exports = router;