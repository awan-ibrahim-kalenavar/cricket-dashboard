const express = require('express');
const router = express.Router();

// In-memory matches storage (we already have this in app.js, but let's create a separate module)
let matches = [];

// Sample matches data
const sampleMatches = [
  {
    _id: 'match1',
    team1: { _id: 'team1', name: 'Mumbai Indians', shortName: 'MI' },
    team2: { _id: 'team2', name: 'Chennai Super Kings', shortName: 'CSK' },
    date: new Date(),
    venue: 'Wankhede Stadium, Mumbai',
    status: 'LIVE',
    score1: { runs: 150, wickets: 7, overs: 18.5 },
    score2: { runs: 145, wickets: 8, overs: 19.2 },
    result: 'In Progress',
    matchType: 'T20',
    tournament: 'IPL 2024'
  },
  {
    _id: 'match2',
    team1: { _id: 'team3', name: 'Royal Challengers Bangalore', shortName: 'RCB' },
    team2: { _id: 'team4', name: 'Kolkata Knight Riders', shortName: 'KKR' },
    date: new Date(),
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'COMPLETED',
    score1: { runs: 200, wickets: 5, overs: 20 },
    score2: { runs: 198, wickets: 6, overs: 20 },
    result: 'RCB won by 2 runs',
    matchType: 'T20',
    tournament: 'IPL 2024'
  },
  {
    _id: 'match3',
    team1: { _id: 'team1', name: 'Mumbai Indians', shortName: 'MI' },
    team2: { _id: 'team3', name: 'Royal Challengers Bangalore', shortName: 'RCB' },
    date: new Date(Date.now() + 86400000), // Tomorrow
    venue: 'Wankhede Stadium, Mumbai',
    status: 'UPCOMING',
    score1: { runs: 0, wickets: 0, overs: 0 },
    score2: { runs: 0, wickets: 0, overs: 0 },
    result: 'Match to be played',
    matchType: 'T20',
    tournament: 'IPL 2024'
  },
  {
    _id: 'match4',
    team1: { _id: 'team2', name: 'Chennai Super Kings', shortName: 'CSK' },
    team2: { _id: 'team4', name: 'Kolkata Knight Riders', shortName: 'KKR' },
    date: new Date(),
    venue: 'M.A. Chidambaram Stadium, Chennai',
    status: 'LIVE',
    score1: { runs: 180, wickets: 4, overs: 19.0 },
    score2: { runs: 175, wickets: 6, overs: 18.3 },
    result: 'In Progress',
    matchType: 'T20',
    tournament: 'IPL 2024'
  }
];

// Initialize with sample data
if (matches.length === 0) {
  matches = sampleMatches;
}

// Get all matches
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let filteredMatches = matches;
    if (status) {
      filteredMatches = matches.filter(match => 
        match.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedMatches = filteredMatches.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      count: paginatedMatches.length,
      total: filteredMatches.length,
      pages: Math.ceil(filteredMatches.length / limit),
      currentPage: parseInt(page),
      data: paginatedMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message
    });
  }
});

// Get live matches
router.get('/live', (req, res) => {
  try {
    const liveMatches = matches.filter(match => 
      match.status.toLowerCase() === 'live'
    );
    
    res.json({
      success: true,
      count: liveMatches.length,
      data: liveMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching live matches',
      error: error.message
    });
  }
});

// Get upcoming matches
router.get('/upcoming', (req, res) => {
  try {
    const upcomingMatches = matches.filter(match => 
      match.status.toLowerCase() === 'upcoming'
    );
    
    res.json({
      success: true,
      count: upcomingMatches.length,
      data: upcomingMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming matches',
      error: error.message
    });
  }
});

// Get completed matches
router.get('/completed', (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const completedMatches = matches.filter(match => 
      match.status.toLowerCase() === 'completed'
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedMatches = completedMatches.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      count: paginatedMatches.length,
      total: completedMatches.length,
      pages: Math.ceil(completedMatches.length / limit),
      currentPage: parseInt(page),
      data: paginatedMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching completed matches',
      error: error.message
    });
  }
});

// Get match by ID
router.get('/:id', (req, res) => {
  try {
    const match = matches.find(m => m._id === req.params.id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }
    
    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching match',
      error: error.message
    });
  }
});

// Get match scorecard
router.get('/:id/scorecard', (req, res) => {
  try {
    const match = matches.find(m => m._id === req.params.id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }
    
    // Mock scorecard data
    const scorecard = {
      match: match,
      team1: {
        name: match.team1.name,
        score: match.score1,
        players: [
          { name: 'Rohit Sharma', runs: 45, balls: 32, fours: 4, sixes: 2, strikeRate: 140.63 },
          { name: 'Ishan Kishan', runs: 38, balls: 28, fours: 3, sixes: 1, strikeRate: 135.71 },
          { name: 'Suryakumar Yadav', runs: 25, balls: 18, fours: 2, sixes: 1, strikeRate: 138.89 }
        ]
      },
      team2: {
        name: match.team2.name,
        score: match.score2,
        players: [
          { name: 'MS Dhoni', runs: 32, balls: 25, fours: 2, sixes: 1, strikeRate: 128.00 },
          { name: 'Ruturaj Gaikwad', runs: 28, balls: 22, fours: 3, sixes: 0, strikeRate: 127.27 },
          { name: 'Ravindra Jadeja', runs: 15, balls: 12, fours: 1, sixes: 0, strikeRate: 125.00 }
        ]
      }
    };
    
    res.json({
      success: true,
      data: scorecard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scorecard',
      error: error.message
    });
  }
});

module.exports = router;
