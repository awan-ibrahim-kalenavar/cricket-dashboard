import Match from "../models/matchmodel.js";

// GET ALL MATCHES
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE MATCH
export const createMatch = async (req, res) => {
  try {
    const { team1, team2, matchDate, status } = req.body;

    const newMatch = new Match({
      team1,
      team2,
      matchDate,
      status: status?.toUpperCase() || "UPCOMING"
    });

    const savedMatch = await newMatch.save();

    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MATCH BY ID
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE MATCH
export const updateMatch = async (req, res) => {
  try {
    const { team1, team2, matchDate, status } = req.body;

    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.team1 = team1 || match.team1;
    match.team2 = team2 || match.team2;
    match.matchDate = matchDate || match.matchDate;
    match.status = status ? status.toUpperCase() : match.status;

    const updatedMatch = await match.save();

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE MATCH
export const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    await match.deleteOne();

    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};