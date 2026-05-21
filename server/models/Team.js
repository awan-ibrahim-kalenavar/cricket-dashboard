const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: String,
  captain: String,
  coach: String,
  homeGround: String,
  founded: Number,
  titles: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);