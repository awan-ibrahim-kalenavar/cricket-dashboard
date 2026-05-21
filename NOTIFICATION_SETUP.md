# 🏏 IPL Dashboard - Event-Based Notification System

## 🎯 **Complete Setup Guide**

### ✅ **What's Implemented:**
- 📧 **Email Notifications** (Gmail via Nodemailer)
- 📱 **SMS Notifications** (Twilio)
- 💬 **WhatsApp Notifications** (Twilio WhatsApp)
- ⏰ **Automated Scheduling** (node-cron)
- 🏏 **Match Reminders** (Daily at 9 AM)
- 🔥 **Live Match Alerts** (Every 5 minutes)
- 🏆 **Match Results** (Every 10 minutes)
- 🚨 **Wicket Alerts** (Every 2 minutes - API integration ready)

---

## 🔧 **Setup Instructions**

### **1. Email Configuration (Gmail)**
```bash
# Enable 2FA on your Gmail account
# Generate App Password: https://myaccount.google.com/apppasswords
```

Update `.env` file:
```env
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_digit_app_password
```

### **2. Twilio Configuration**
1. **Create Twilio Account**: https://www.twilio.com/try-twilio
2. **Get Phone Number**: From Twilio Console
3. **Get Credentials**: Account SID & Auth Token

Update `.env` file:
```env
TWILIO_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE=+1234567890
```

### **3. WhatsApp Setup**
1. **Enable WhatsApp Sandbox**: In Twilio Console
2. **Send "join" to WhatsApp**: +14155238886
3. **Test with your number**

---

## 🚀 **Start the Application**

### **Backend:**
```bash
cd server
npm install
node app.js
```

### **Frontend:**
```bash
cd client
npm start
```

### **Check Cron Jobs:**
You should see these messages in console:
```
🚀 Match Notification Cron Jobs Scheduled:
📅 Daily at 9 AM - Tomorrow match reminders
🔥 Every 5 minutes - Live match alerts
🏆 Every 10 minutes - Match result alerts
🚨 Every 2 minutes - Wicket alerts (when API integrated)
```

---

## 📱 **Access Notification Management**

1. **Open App**: http://localhost:3000
2. **Login**: Use your credentials
3. **Navigate**: 🔔 Notifications (in navbar)
4. **Add Users**: Create users with notification preferences
5. **Test Notifications**: Send test notifications to verify setup

---

## 🎯 **Notification Types**

### **📅 Match Reminders**
- **When**: Daily at 9 AM
- **Triggers**: Matches scheduled for tomorrow
- **Channels**: Email, SMS, WhatsApp (based on user preferences)

### **🔥 Live Match Alerts**
- **When**: Every 5 minutes
- **Triggers**: Match status changes to "LIVE"
- **Channels**: Email, SMS, WhatsApp

### **🏆 Match Results**
- **When**: Every 10 minutes
- **Triggers**: Match completes with result
- **Channels**: Email, SMS, WhatsApp

### **🚨 Wicket Alerts**
- **When**: Every 2 minutes
- **Triggers**: New wickets in live matches
- **Status**: Ready for API integration

---

## 📊 **API Endpoints**

### **User Management:**
```javascript
// Get all users
GET /api/users

// Create new user
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "whatsapp": "+1234567890",
  "preferences": {
    "email": true,
    "sms": false,
    "whatsapp": true,
    "matchReminders": true,
    "liveAlerts": true,
    "resultAlerts": true
  }
}

// Update user preferences
PUT /api/users/:id/preferences

// Delete user
DELETE /api/users/:id

// Send test notification
POST /api/users/:id/test-notification
{
  "type": "matchReminder" // or "matchStarted", "wicketAlert", "matchResult"
}

// Get statistics
GET /api/users/stats
```

---

## 🗄️ **Database Models**

### **User Model:**
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String,
  whatsapp: String,
  preferences: {
    email: Boolean (default: true),
    sms: Boolean (default: false),
    whatsapp: Boolean (default: false),
    matchReminders: Boolean (default: true),
    liveAlerts: Boolean (default: true),
    resultAlerts: Boolean (default: true)
  }
}
```

### **Match Model:**
```javascript
{
  team1: String (required),
  team2: String (required),
  matchDate: Date (required),
  venue: String,
  status: String ["LIVE", "COMPLETED", "UPCOMING"],
  result: String,
  reminderSent: Boolean (default: false),
  liveAlertSent: Boolean (default: false),
  resultAlertSent: Boolean (default: false),
  apiMatchKey: String (unique),
  lastApiUpdate: Date
}
```

---

## 🎨 **Frontend Features**

### **Notification Management Page:**
- 📊 **Statistics Dashboard**: Total users, channel preferences
- 👥 **User Management**: Add, edit, delete users
- 🧪 **Test Notifications**: Send test notifications to verify setup
- 📱 **Preference Management**: User notification preferences
- 🎯 **Real-time Updates**: Live statistics

### **User Preferences:**
- ✅ Email notifications
- 📱 SMS notifications
- 💬 WhatsApp notifications
- 📅 Match reminders
- 🔥 Live match alerts
- 🏆 Match results

---

## 🔧 **Troubleshooting**

### **Email Issues:**
```bash
# Check Gmail App Password
# Enable "Less secure app access" if needed
# Verify EMAIL_USER and EMAIL_PASS in .env
```

### **SMS/WhatsApp Issues:**
```bash
# Verify Twilio credentials
# Check phone number format (+countrycode)
# Verify Twilio account balance
# Check WhatsApp sandbox setup
```

### **Cron Job Issues:**
```bash
# Check server logs for cron output
# Verify MongoDB connection
# Check match data in database
```

---

## 🚀 **Next Steps**

### **Advanced Features:**
1. **Wicket Detection**: Integrate with live score API
2. **Boundary Alerts**: Four and six notifications
3. **Over Summaries**: End of over updates
4. **Player Milestones**: Century, half-century alerts
5. **Tournament Standings**: Daily position updates

### **Enhancements:**
1. **Push Notifications**: Browser push notifications
2. **Mobile App**: React Native notifications
3. **Analytics**: Notification engagement tracking
4. **Templates**: Customizable message templates
5. **Scheduling**: Flexible timing options

---

## 📞 **Support**

### **Common Issues:**
- **Email not sending**: Check Gmail app password
- **SMS not working**: Verify Twilio setup
- **Cron not running**: Check server logs
- **Database errors**: Verify MongoDB connection

### **Test Commands:**
```bash
# Test email service
node -e "require('./services/emailService').sendEmail('test@example.com', 'Test', 'Test message')"

# Test SMS service
node -e "require('./services/notificationService').sendSMS('+1234567890', 'Test SMS')"

# Test WhatsApp service
node -e "require('./services/notificationService').sendWhatsApp('+1234567890', 'Test WhatsApp')"
```

---

## 🎉 **Success!**

Your IPL Dashboard now has a **complete Event-Based Notification System**! 🏏✨

**Features Working:**
- ✅ Automated match reminders
- ✅ Live match alerts
- ✅ Match result notifications
- ✅ Multi-channel delivery (Email, SMS, WhatsApp)
- ✅ User preference management
- ✅ Test notification system
- ✅ Statistics dashboard

**Ready to send notifications to thousands of cricket fans!** 🚀

---

**Made with ❤️ for Cricket Fans** 🏏🔔
