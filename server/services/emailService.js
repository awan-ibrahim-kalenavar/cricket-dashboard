const nodemailer = require("nodemailer");
require('dotenv').config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email function
const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    if (html) {
      mailOptions.html = html;
    }

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${subject}`);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

// Template functions for different notification types
const emailTemplates = {
  matchReminder: (match) => ({
    subject: `🏏 Tomorrow Match: ${match.team1} vs ${match.team2}`,
    text: `🏏 Tomorrow Match Alert:
    
${match.team1} vs ${match.team2}
📍 ${match.venue}
📅 ${match.matchDate.toLocaleDateString()}
⏰ ${match.matchDate.toLocaleTimeString()}

Get ready for an exciting IPL match!

Don't forget to tune in for the live action.

🔔 IPL Dashboard`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">🏏 Tomorrow Match Alert</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin: 0 0 10px 0;">${match.team1} vs ${match.team2}</h3>
          <p style="margin: 5px 0;">📍 <strong>Venue:</strong> ${match.venue}</p>
          <p style="margin: 5px 0;">📅 <strong>Date:</strong> ${match.matchDate.toLocaleDateString()}</p>
          <p style="margin: 5px 0;">⏰ <strong>Time:</strong> ${match.matchDate.toLocaleTimeString()}</p>
        </div>
        <p style="color: #64748b;">Get ready for an exciting IPL match!</p>
        <p style="color: #64748b;">Don't forget to tune in for the live action.</p>
        <div style="text-align: center; margin-top: 30px;">
          <span style="background: #3b82f6; color: white; padding: 10px 20px; border-radius: 5px;">
            🔔 IPL Dashboard
          </span>
        </div>
      </div>
    `
  }),

  matchStarted: (match) => ({
    subject: `🔥 LIVE NOW: ${match.team1} vs ${match.team2}`,
    text: `🔥 Match Started!

${match.team1} vs ${match.team2}
📍 ${match.venue}
📺 Watch Live Now!

The match has begun! Don't miss the action.

🔔 IPL Dashboard`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">🔥 Match Started!</h2>
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #dc2626; margin: 0 0 10px 0;">${match.team1} vs ${match.team2}</h3>
          <p style="margin: 5px 0;">📍 <strong>Venue:</strong> ${match.venue}</p>
          <p style="margin: 5px 0;">📺 <strong>Status:</strong> LIVE NOW</p>
        </div>
        <p style="color: #64748b;">The match has begun! Don't miss the action.</p>
        <div style="text-align: center; margin-top: 30px;">
          <span style="background: #ef4444; color: white; padding: 10px 20px; border-radius: 5px;">
            🔔 IPL Dashboard
          </span>
        </div>
      </div>
    `
  }),

  wicketAlert: (match, wicket) => ({
    subject: `🚨 WICKET! ${wicket.player} dismissed`,
    text: `🚨 WICKET ALERT!

${match.team1} vs ${match.team2}
🏏 ${wicket.player} dismissed
📊 Score: ${wicket.score}
⚡ Over ${wicket.over}.${wicket.ball}

Big moment in the match!

🔔 IPL Dashboard`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">🚨 WICKET ALERT!</h2>
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d97706; margin: 0 0 10px 0;">${match.team1} vs ${match.team2}</h3>
          <p style="margin: 5px 0;">🏏 <strong>Wicket:</strong> ${wicket.player} dismissed</p>
          <p style="margin: 5px 0;">📊 <strong>Score:</strong> ${wicket.score}</p>
          <p style="margin: 5px 0;">⚡ <strong>Over:</strong> ${wicket.over}.${wicket.ball}</p>
        </div>
        <p style="color: #64748b;">Big moment in the match!</p>
        <div style="text-align: center; margin-top: 30px;">
          <span style="background: #f59e0b; color: white; padding: 10px 20px; border-radius: 5px;">
            🔔 IPL Dashboard
          </span>
        </div>
      </div>
    `
  }),

  matchResult: (match) => ({
    subject: `🏆 Match Result: ${match.result}`,
    text: `🏆 Match Result!

${match.team1} vs ${match.team2}
📍 ${match.venue}
🏆 ${match.result}
📊 Final Score: ${match.score1.runs}/${match.score1.wickets} vs ${match.score2.runs}/${match.score2.wickets}

Great match! Thanks for watching.

🔔 IPL Dashboard`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">🏆 Match Result!</h2>
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin: 0 0 10px 0;">${match.team1} vs ${match.team2}</h3>
          <p style="margin: 5px 0;">📍 <strong>Venue:</strong> ${match.venue}</p>
          <p style="margin: 5px 0;">🏆 <strong>Result:</strong> ${match.result}</p>
          <p style="margin: 5px 0;">📊 <strong>Final Score:</strong> ${match.score1.runs}/${match.score1.wickets} vs ${match.score2.runs}/${match.score2.wickets}</p>
        </div>
        <p style="color: #64748b;">Great match! Thanks for watching.</p>
        <div style="text-align: center; margin-top: 30px;">
          <span style="background: #10b981; color: white; padding: 10px 20px; border-radius: 5px;">
            🔔 IPL Dashboard
          </span>
        </div>
      </div>
    `
  })
};

module.exports = { sendEmail, emailTemplates };
