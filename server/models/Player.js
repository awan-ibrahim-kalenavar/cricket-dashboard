import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  role: String,
  country: String
}, { timestamps: true });

export default mongoose.model("Player", playerSchema);  