const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendNotification } = require('../services/notificationService');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, whatsapp, preferences } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const user = new User({
      name,
      email,
      phone,
      whatsapp,
      preferences: preferences || {}
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// Update user preferences
router.put('/:id/preferences', async (req, res) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { preferences },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message
    });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

// Send test notification to user
router.post('/:id/test-notification', async (req, res) => {
  try {
    const { type } = req.body; // 'matchReminder', 'matchStarted', 'wicketAlert', 'matchResult'

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create test data based on notification type
    let testData;
    switch (type) {
      case 'matchReminder':
        testData = {
          team1: 'Mumbai Indians',
          team2: 'Chennai Super Kings',
          venue: 'Wankhede Stadium, Mumbai',
          matchDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
        };
        break;
      case 'matchStarted':
        testData = {
          team1: 'Royal Challengers Bangalore',
          team2: 'Kolkata Knight Riders',
          venue: 'M. Chinnaswamy Stadium, Bangalore'
        };
        break;
      case 'wicketAlert':
        testData = {
          team1: 'RCB',
          team2: 'KKR',
          wicket: {
            player: 'Virat Kohli',
            score: 'RCB 45/2',
            over: 6,
            ball: 3
          }
        };
        break;
      case 'matchResult':
        testData = {
          team1: 'CSK',
          team2: 'MI',
          result: 'CSK won by 5 wickets',
          score1: { runs: 180, wickets: 5 },
          score2: { runs: 175, wickets: 8 }
        };
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid notification type'
        });
    }

    const results = await sendNotification(user, type, testData);

    res.json({
      success: true,
      message: 'Test notification sent',
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send test notification',
      error: error.message
    });
  }
});

// Get notification statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const emailUsers = await User.countDocuments({ 'preferences.email': true });
    const smsUsers = await User.countDocuments({ 'preferences.sms': true });
    const whatsappUsers = await User.countDocuments({ 'preferences.whatsapp': true });
    const reminderUsers = await User.countDocuments({ 'preferences.matchReminders': true });
    const liveAlertUsers = await User.countDocuments({ 'preferences.liveAlerts': true });
    const resultAlertUsers = await User.countDocuments({ 'preferences.resultAlerts': true });

    res.json({
      success: true,
      data: {
        totalUsers,
        emailUsers,
        smsUsers,
        whatsappUsers,
        reminderUsers,
        liveAlertUsers,
        resultAlertUsers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

module.exports = router;
