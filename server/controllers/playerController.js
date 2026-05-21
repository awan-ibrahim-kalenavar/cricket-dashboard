import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const {
      name,
      role,
      team,
      country,
      totalRuns,
      strikeRate,
      battingAverage,
      highestScore,
      wickets,
      economy,
      bowlingAverage,
      photo,
    } = req.body;

    
    if (!name || !role || !team) {
      return res.status(400).json({ message: "Name, role and team are required" });
    }

    const player = await Player.create({
      name,
      role,
      team,
      country,
      totalRuns,
      strikeRate,
      battingAverage,
      highestScore,
      wickets,
      economy,
      bowlingAverage,
      photo,
    });

    res.status(201).json(player);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPlayers = async (req, res) => {
    try{
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player){
            return res.status(404).json ({ message: "Player not found"});

        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePlayer = async (req, res) => {
  try {
    const updates = req.body;

    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    
    Object.keys(updates).forEach((key) => {
      player[key] = updates[key];
    });

    const updatedPlayer = await player.save();

    res.json(updatedPlayer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    await player.deleteOne();

    res.json({ message: "Player deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};