import Team from "../models/Team.js";


export const createTeam = async (req, res) => {
  try {
    const { name, city, coach, captain, logo } = req.body;

    
    if (!name || !city) {
      return res.status(400).json({ message: "Name and city are required" });
    }

    const teamExists = await Team.findOne({ name });
    if (teamExists) {
      return res.status(400).json({ message: "Team already exists" });
    }

    const team = await Team.create({
      name,
      city,
      coach,
      captain,
      logo,
    });

    res.status(201).json(team);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    res.json(teams);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTeam = async (req, res) => {
  try {
    const updates = req.body;

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    
    Object.keys(updates).forEach((key) => {
      team[key] = updates[key];
    });

    const updatedTeam = await team.save();

    res.json(updatedTeam);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
    try{
        const team = await Team.findById(req.params.id);
        if(!team){
            return res.status(404).json({message: "Team not found"});
        }
        await team.deleteOne();
        res.json({message: "Team deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});

    }
}
