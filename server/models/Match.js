const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team1: { 
    type: String, 
    required: true,
    trim: true 
  },
  team2: { 
    type: String, 
    required: true,
    trim: true 
  },

  score1: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 }
  },

  score2: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 }
  },

  status: {
    type: String,
    enum: ["LIVE", "COMPLETED", "UPCOMING"],
    default: "UPCOMING"
  },

  venue: { 
    type: String,
    trim: true 
  },
  
  result: { 
    type: String,
    trim: true 
  },
  
  // Notification scheduling
  matchDate: {
    type: Date,
    required: true
  },
  
  tournament: {
    type: String,
    trim: true,
    default: "IPL 2026"
  },
  
  // Live match tracking
  currentOver: { type: Number, default: 0 },
  lastWicket: {
    player: String,
    over: Number,
    ball: Number
  },
  
  // Notification flags
  reminderSent: { type: Boolean, default: false },
  liveAlertSent: { type: Boolean, default: false },
  resultAlertSent: { type: Boolean, default: false },
  
  // API integration
  apiMatchKey: { type: String, unique: true },
  lastApiUpdate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);