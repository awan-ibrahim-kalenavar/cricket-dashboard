const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  over: {
    type: Number,
    required: true
  },
  ball: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  commentary: {
    type: String,
    required: true
  },
  event: {
    type: String,
    enum: ['run', 'wicket', 'boundary', 'six', 'wide', 'no-ball', 'bye', 'leg-bye', 'dot', 'review', 'injury', 'partnership'],
    default: 'run'
  },
  runs: {
    type: Number,
    default: 0
  },
  wicket: {
    type: Boolean,
    default: false
  },
  batsman: {
    type: String,
    required: true
  },
  bowler: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  score: {
    type: String,
    default: '0/0'
  },
  highlights: {
    type: Boolean,
    default: false
  },
  emoji: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model("Commentary", commentarySchema);
