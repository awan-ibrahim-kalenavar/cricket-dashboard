const express = require('express');
const router = express.Router();

/
let commentaries = [];


const sampleCommentaries = [
  {
    _id: 'c1',
    match: 'match1',
    over: 1,
    ball: 1,
    commentary: "Excellent start by the bowler, pitching it just outside off stump",
    event: 'dot',
    runs: 0,
    wicket: false,
    batsman: 'Rohit Sharma',
    bowler: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    score: '0/0',
    highlights: false,
    emoji: '⚪',
    timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
  },
  {
    _id: 'c2',
    match: 'match1',
    over: 1,
    ball: 2,
    commentary: "FOUR! Beautiful cover drive, perfectly timed",
    event: 'boundary',
    runs: 4,
    wicket: false,
    batsman: 'Rohit Sharma',
    bowler: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    score: '4/0',
    highlights: true,
    emoji: '🏏🏏',
    timestamp: new Date(Date.now() - 1740000) // 29 minutes ago
  },
  {
    _id: 'c3',
    match: 'match1',
    over: 1,
    ball: 3,
    commentary: "SIX! What a shot! Goes deep into the stands",
    event: 'six',
    runs: 6,
    wicket: false,
    batsman: 'Rohit Sharma',
    bowler: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    score: '10/0',
    highlights: true,
    emoji: '🎯',
    timestamp: new Date(Date.now() - 1680000) // 28 minutes ago
  },
  {
    _id: 'c4',
    match: 'match1',
    over: 1,
    ball: 4,
    commentary: "WICKET! Caught at slip! What a catch!",
    event: 'wicket',
    runs: 0,
    wicket: true,
    batsman: 'Rohit Sharma',
    bowler: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    score: '10/1',
    highlights: true,
    emoji: '🏏',
    timestamp: new Date(Date.now() - 1620000) // 27 minutes ago
  },
  {
    _id: 'c5',
    match: 'match1',
    over: 1,
    ball: 5,
    commentary: "New batsman takes guard, nervous energy out there",
    event: 'dot',
    runs: 0,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    score: '10/1',
    highlights: false,
    emoji: '⚪',
    timestamp: new Date(Date.now() - 1560000) // 26 minutes ago
  },
  {
    _id: 'c6',
    match: 'match1',
    over: 1,
    ball: 6,
    commentary: "SIX! SKY goes big! Massive hit over long-on",
    event: 'six',
    runs: 6,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Jasprit Bumrah',
    team: 'Mumbai Indians',
    score: '16/1',
    highlights: true,
    emoji: '🎯',
    timestamp: new Date(Date.now() - 1500000) // 25 minutes ago
  }
];

// Initialize with sample data
if (commentaries.length === 0) {
  commentaries = sampleCommentaries;
}


router.get('/match/:matchId', (req, res) => {
  try {
    const { matchId } = req.params;
    const { limit = 50, page = 1 } = req.query;
    
    const matchCommentaries = commentaries.filter(c => c.match === matchId);
    const total = matchCommentaries.length;
    
    const sortedCommentaries = matchCommentaries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedCommentaries = sortedCommentaries.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      count: paginatedCommentaries.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: paginatedCommentaries.reverse() 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching commentary',
      error: error.message
    });
  }
});

// Get live commentary (most recent)
router.get('/match/:matchId/live', (req, res) => {
  try {
    const { matchId } = req.params;
    const { limit = 10 } = req.query;
    
    const matchCommentaries = commentaries.filter(c => c.match === matchId);
    const sortedCommentaries = matchCommentaries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const limitedCommentaries = sortedCommentaries.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      count: limitedCommentaries.length,
      data: limitedCommentaries.reverse()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching live commentary',
      error: error.message
    });
  }
});

// Add new commentary
router.post('/match/:matchId', (req, res) => {
  try {
    const { matchId } = req.params;
    const commentaryData = {
      ...req.body,
      match: matchId,
      _id: 'c' + Date.now(), // Simple ID generation
      timestamp: new Date()
    };
    
    commentaries.unshift(commentaryData); // Add to beginning
    
    res.status(201).json({
      success: true,
      message: 'Commentary added successfully',
      data: commentaryData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding commentary',
      error: error.message
    });
  }
});

// Get commentary highlights
router.get('/match/:matchId/highlights', async (req, res) => {
  try {
    const { matchId } = req.params;
    const { limit = 20 } = req.query;
    
    const highlights = await Commentary.find({ 
      match: matchId,
      highlights: true 
    })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .populate('match', 'team1 team2 status');
    
    res.json({
      success: true,
      count: highlights.length,
      data: highlights.reverse()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching highlights',
      error: error.message
    });
  }
});

// Get over-by-over summary
router.get('/match/:matchId/overs', async (req, res) => {
  try {
    const { matchId } = req.params;
    
    const overs = await Commentary.aggregate([
      { $match: { match: mongoose.Types.ObjectId(matchId) } },
      {
        $group: {
          _id: '$over',
          balls: { $push: '$$ROOT' },
          totalRuns: { $sum: '$runs' },
          wickets: { $sum: { $cond: ['$wicket', 1, 0] } },
          ballCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      count: overs.length,
      data: overs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching over summary',
      error: error.message
    });
  }
});

// Helper function to update match score
async function updateMatchScore(matchId, commentaryData) {
  try {
    const match = await Match.findById(matchId);
    if (!match) return;
    
    // This is a simplified score update
    // In production, you'd need more complex logic
    if (commentaryData.team === match.team1.toString()) {
      match.score1.runs += commentaryData.runs || 0;
      if (commentaryData.wicket) {
        match.score1.wickets += 1;
      }
    } else {
      match.score2.runs += commentaryData.runs || 0;
      if (commentaryData.wicket) {
        match.score2.wickets += 1;
      }
    }
    
    await match.save();
  } catch (error) {
    console.error('Error updating match score:', error);
  }
}

module.exports = router;
