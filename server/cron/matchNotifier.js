const cron = require("node-cron");
const User = require("../models/User");
const Match = require("../models/Match");
const { sendNotification } = require("../services/notificationService");

// Schedule: Every day at 9 AM - Check for tomorrow's matches
cron.schedule("0 9 * * *", async () => {
  console.log("🏏 Running Daily Match Notification Cron at 9 AM");
  
  try {
    // Get tomorrow's date range
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStart = new Date(tomorrow.setHours(0, 0, 0, 0));
    const tomorrowEnd = new Date(tomorrow.setHours(23, 59, 59, 999));

    // Find matches scheduled for tomorrow that haven't had reminders sent
    const tomorrowMatches = await Match.find({
      matchDate: {
        $gte: tomorrowStart,
        $lte: tomorrowEnd
      },
      reminderSent: false,
      status: "UPCOMING"
    });

    if (tomorrowMatches.length === 0) {
      console.log("No matches scheduled for tomorrow");
      return;
    }

    console.log(`Found ${tomorrowMatches.length} matches for tomorrow`);

    // Get all users who want match reminders
    const users = await User.find({ 
      "preferences.matchReminders": true 
    });

    if (users.length === 0) {
      console.log("No users subscribed to match reminders");
      return;
    }

    console.log(`Sending notifications to ${users.length} users`);

    // Send notifications for each match
    for (const match of tomorrowMatches) {
      console.log(`Processing match: ${match.team1} vs ${match.team2}`);
      
      let successCount = 0;
      
      for (const user of users) {
        const results = await sendNotification(user, 'matchReminder', match);
        
        // Count successful notifications
        if (results.email || results.sms || results.whatsapp) {
          successCount++;
        }
      }
      
      console.log(`Match reminder sent to ${successCount} users for ${match.team1} vs ${match.team2}`);
      
      // Mark reminder as sent
      match.reminderSent = true;
      await match.save();
    }

    console.log("✅ Daily match notification cron completed successfully");
    
  } catch (error) {
    console.error("❌ Error in daily match notification cron:", error);
  }
});

// Schedule: Every 5 minutes - Check for live matches and send live alerts
cron.schedule("*/5 * * * *", async () => {
  console.log("🔥 Running Live Match Alert Cron");
  
  try {
    // Find matches that are live but haven't had live alerts sent
    const liveMatches = await Match.find({
      status: "LIVE",
      liveAlertSent: false
    });

    if (liveMatches.length === 0) {
      return;
    }

    console.log(`Found ${liveMatches.length} newly started live matches`);

    // Get all users who want live alerts
    const users = await User.find({ 
      "preferences.liveAlerts": true 
    });

    if (users.length === 0) {
      console.log("No users subscribed to live alerts");
      return;
    }

    // Send live match started notifications
    for (const match of liveMatches) {
      console.log(`Sending live alert for: ${match.team1} vs ${match.team2}`);
      
      let successCount = 0;
      
      for (const user of users) {
        const results = await sendNotification(user, 'matchStarted', match);
        
        if (results.email || results.sms || results.whatsapp) {
          successCount++;
        }
      }
      
      console.log(`Live alert sent to ${successCount} users for ${match.team1} vs ${match.team2}`);
      
      // Mark live alert as sent
      match.liveAlertSent = true;
      await match.save();
    }

    console.log("✅ Live match alert cron completed");
    
  } catch (error) {
    console.error("❌ Error in live match alert cron:", error);
  }
});

// Schedule: Every 10 minutes - Check for completed matches and send results
cron.schedule("*/10 * * * *", async () => {
  console.log("🏆 Running Match Result Alert Cron");
  
  try {
    // Find matches that are completed but haven't had result alerts sent
    const completedMatches = await Match.find({
      status: "COMPLETED",
      resultAlertSent: false,
      result: { $exists: true, $ne: "" }
    });

    if (completedMatches.length === 0) {
      return;
    }

    console.log(`Found ${completedMatches.length} newly completed matches`);

    // Get all users who want result alerts
    const users = await User.find({ 
      "preferences.resultAlerts": true 
    });

    if (users.length === 0) {
      console.log("No users subscribed to result alerts");
      return;
    }

    // Send result notifications
    for (const match of completedMatches) {
      console.log(`Sending result alert for: ${match.team1} vs ${match.team2}`);
      
      let successCount = 0;
      
      for (const user of users) {
        const results = await sendNotification(user, 'matchResult', match);
        
        if (results.email || results.sms || results.whatsapp) {
          successCount++;
        }
      }
      
      console.log(`Result alert sent to ${successCount} users for ${match.team1} vs ${match.team2}`);
      
      // Mark result alert as sent
      match.resultAlertSent = true;
      await match.save();
    }

    console.log("✅ Match result alert cron completed");
    
  } catch (error) {
    console.error("❌ Error in match result alert cron:", error);
  }
});

// Schedule: Every 2 minutes - Check for wickets in live matches (advanced feature)
cron.schedule("*/2 * * * *", async () => {
  console.log("🚨 Running Wicket Alert Cron");
  
  try {
    // This would integrate with your live score API
    // For now, it's a placeholder for when you have real-time wicket data
    
    // Find live matches
    const liveMatches = await Match.find({
      status: "LIVE"
    });

    if (liveMatches.length === 0) {
      return;
    }

    // TODO: Integrate with live score API to check for wickets
    // This would involve:
    // 1. Calling the live score API for each live match
    // 2. Comparing with last known wicket data
    // 3. Sending wicket alerts if new wickets detected
    
    // Placeholder for wicket detection logic
    // console.log("Checking for wickets in live matches...");
    
  } catch (error) {
    console.error("❌ Error in wicket alert cron:", error);
  }
});

console.log("🚀 Match Notification Cron Jobs Scheduled:");
console.log("📅 Daily at 9 AM - Tomorrow match reminders");
console.log("🔥 Every 5 minutes - Live match alerts");
console.log("🏆 Every 10 minutes - Match result alerts");
console.log("🚨 Every 2 minutes - Wicket alerts (when API integrated)");
