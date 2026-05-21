const twilio = require("twilio");
require('dotenv').config();

// Initialize Twilio client only if credentials are properly set
let client = null;
if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
  client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Send SMS function
const sendSMS = async (to, message) => {
  try {
    if (!client) {
      console.log('Twilio client not initialized - check credentials');
      return false;
    }
    
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to,
    });
    console.log(`SMS sent to ${to}`);
    return true;
  } catch (error) {
    console.error('SMS send error:', error);
    return false;
  }
};

// Send WhatsApp message function
const sendWhatsApp = async (to, message) => {
  try {
    if (!client) {
      console.log('Twilio client not initialized - check credentials');
      return false;
    }
    
    await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio WhatsApp sandbox number
      to: `whatsapp:${to}`,
    });
    console.log(`WhatsApp message sent to ${to}`);
    return true;
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return false;
  }
};

// SMS templates
const smsTemplates = {
  matchReminder: (match) => `🏏 Tomorrow: ${match.team1} vs ${match.team2}
📍 ${match.venue}
📅 ${match.matchDate.toLocaleDateString()}
⏰ ${match.matchDate.toLocaleTimeString()}
🔔 IPL Dashboard`,

  matchStarted: (match) => `🔥 LIVE NOW: ${match.team1} vs ${match.team2}
📍 ${match.venue}
📺 Don't miss the action!
🔔 IPL Dashboard`,

  wicketAlert: (match, wicket) => `🚨 WICKET! ${wicket.player} dismissed
${match.team1} vs ${match.team2}
📊 ${wicket.score}
⚡ Over ${wicket.over}.${wicket.ball}
🔔 IPL Dashboard`,

  matchResult: (match) => `🏆 ${match.result}
${match.team1} vs ${match.team2}
📊 ${match.score1.runs}/${match.score1.wickets} vs ${match.score2.runs}/${match.score2.wickets}
🔔 IPL Dashboard`
};

// WhatsApp templates (similar to SMS but can be more detailed)
const whatsappTemplates = {
  matchReminder: (match) => `🏏 *Tomorrow Match Alert*

*${match.team1} vs ${match.team2}*
📍 *Venue:* ${match.venue}
📅 *Date:* ${match.matchDate.toLocaleDateString()}
⏰ *Time:* ${match.matchDate.toLocaleTimeString()}

Get ready for an exciting IPL match! 🎯

🔔 _IPL Dashboard_`,

  matchStarted: (match) => `🔥 *MATCH STARTED LIVE!*

*${match.team1} vs ${match.team2}*
📍 *Venue:* ${match.venue}
📺 *Status:* LIVE NOW

Don't miss the action! 🏏

🔔 _IPL Dashboard_`,

  wicketAlert: (match, wicket) => `🚨 *WICKET ALERT!*

*${match.team1} vs ${match.team2}*
🏏 *${wicket.player} dismissed*
📊 *Score:* ${wicket.score}
⚡ *Over:* ${wicket.over}.${wicket.ball}

Big moment in the match! 💥

🔔 _IPL Dashboard_`,

  matchResult: (match) => `🏆 *MATCH RESULT*

*${match.team1} vs ${match.team2}*
🏆 *Result:* ${match.result}
📊 *Final Score:* ${match.score1.runs}/${match.score1.wickets} vs ${match.score2.runs}/${match.score2.wickets}

Great match! 🎉

🔔 _IPL Dashboard_`
};

// Send notification to user based on their preferences
const sendNotification = async (user, notificationType, data) => {
  const results = {
    email: false,
    sms: false,
    whatsapp: false
  };

  // Send email if enabled
  if (user.preferences.email && user.email) {
    const { sendEmail, emailTemplates } = require('./emailService');
    const template = emailTemplates[notificationType](data);
    results.email = await sendEmail(user.email, template.subject, template.text, template.html);
  }

  // Send SMS if enabled
  if (user.preferences.sms && user.phone) {
    const template = smsTemplates[notificationType](data);
    results.sms = await sendSMS(user.phone, template);
  }

  // Send WhatsApp if enabled
  if (user.preferences.whatsapp && user.whatsapp) {
    const template = whatsappTemplates[notificationType](data);
    results.whatsapp = await sendWhatsApp(user.whatsapp, template);
  }

  return results;
};

module.exports = { 
  sendSMS, 
  sendWhatsApp, 
  sendNotification,
  smsTemplates,
  whatsappTemplates
};
