const mongoose = require('mongoose');
require('dotenv').config();

// Sample commentary data
const sampleCommentaries = [
  {
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
    emoji: '⚪'
  },
  {
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
    emoji: '🏏🏏'
  },
  {
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
    emoji: '🎯'
  },
  {
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
    emoji: '🏏'
  },
  {
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
    emoji: '⚪'
  },
  {
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
    emoji: '🎯'
  },
  {
    over: 2,
    ball: 1,
    commentary: "Wide ball, too much width outside off",
    event: 'wide',
    runs: 1,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '17/1',
    highlights: false,
    emoji: '➡️'
  },
  {
    over: 2,
    ball: 2,
    commentary: "Single pushed to mid-wicket, good running",
    event: 'run',
    runs: 1,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '18/1',
    highlights: false,
    emoji: '🏏'
  },
  {
    over: 2,
    ball: 3,
    commentary: "FOUR! Classic cover drive, timing is sublime",
    event: 'boundary',
    runs: 4,
    wicket: false,
    batsman: 'Ishan Kishan',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '22/1',
    highlights: true,
    emoji: '🏏🏏'
  },
  {
    over: 2,
    ball: 4,
    commentary: "Defended back to the bowler, solid defensive shot",
    event: 'dot',
    runs: 0,
    wicket: false,
    batsman: 'Ishan Kishan',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '22/1',
    highlights: false,
    emoji: '⚪'
  },
  {
    over: 2,
    ball: 5,
    commentary: "SIX! That's enormous! Goes into the crowd",
    event: 'six',
    runs: 6,
    wicket: false,
    batsman: 'Ishan Kishan',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '28/1',
    highlights: true,
    emoji: '🎯'
  },
  {
    over: 2,
    ball: 6,
    commentary: "FOUR! Square of the wicket, finds the gap perfectly",
    event: 'boundary',
    runs: 4,
    wicket: false,
    batsman: 'Ishan Kishan',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '32/1',
    highlights: true,
    emoji: '🏏🏏'
  },
  {
    over: 3,
    ball: 1,
    commentary: "WICKET! Bowled him! Clean bowled! What a delivery!",
    event: 'wicket',
    runs: 0,
    wicket: true,
    batsman: 'Ishan Kishan',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '32/2',
    highlights: true,
    emoji: '🏏'
  },
  {
    over: 3,
    ball: 2,
    commentary: "New batsman at the crease, big wicket for CSK",
    event: 'dot',
    runs: 0,
    wicket: false,
    batsman: 'Tilak Varma',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '32/2',
    highlights: false,
    emoji: '⚪'
  },
  {
    over: 3,
    ball: 3,
    commentary: "Single to deep cover, good running between wickets",
    event: 'run',
    runs: 1,
    wicket: false,
    batsman: 'Tilak Varma',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '33/2',
    highlights: false,
    emoji: '🏏'
  },
  {
    over: 3,
    ball: 4,
    commentary: "FOUR! Lovely shot through the covers",
    event: 'boundary',
    runs: 4,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '37/2',
    highlights: true,
    emoji: '🏏🏏'
  },
  {
    over: 3,
    ball: 5,
    commentary: "SIX! SKY is on fire! Another maximum!",
    event: 'six',
    runs: 6,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '43/2',
    highlights: true,
    emoji: '🎯'
  },
  {
    over: 3,
    ball: 6,
    commentary: "Dot ball to end the over, 11 runs from it",
    event: 'dot',
    runs: 0,
    wicket: false,
    batsman: 'Suryakumar Yadav',
    bowler: 'Ravindra Jadeja',
    team: 'Mumbai Indians',
    score: '43/2',
    highlights: false,
    emoji: '⚪'
  }
];

// Generate commentary function
const generateCommentary = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ipl_dashboard');
    console.log('Connected to MongoDB');

    const Commentary = require('./models/Commentary');
    const Match = require('./models/Match');

    // Get first match (or create a dummy one)
    let match = await Match.findOne();
    if (!match) {
      // Create a dummy match if none exists
      const Team = require('./models/Team');
      const teams = await Team.find();
      
      if (teams.length >= 2) {
        match = new Match({
          team1: teams[0]._id,
          team2: teams[1]._id,
          date: new Date(),
          venue: 'Wankhede Stadium, Mumbai',
          status: 'LIVE',
          score1: { runs: 43, wickets: 2, overs: 3 },
          score2: { runs: 0, wickets: 0, overs: 0 },
          result: 'In Progress'
        });
        await match.save();
        console.log('Created dummy match');
      } else {
        console.log('No teams found, please create teams first');
        return;
      }
    }

    // Clear existing commentary
    await Commentary.deleteMany({ match: match._id });
    console.log('Cleared existing commentary');

    // Add sample commentary with timestamps
    const commentaryWithTimestamps = sampleCommentaries.map((item, index) => ({
      ...item,
      match: match._id,
      timestamp: new Date(Date.now() - (sampleCommentaries.length - index) * 30000) // 30 seconds apart
    }));

    await Commentary.insertMany(commentaryWithTimestamps);
    console.log(`Generated ${commentaryWithTimestamps.length} commentary items`);

    console.log('Commentary generation completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating commentary:', error);
    process.exit(1);
  }
};

// Run the function
generateCommentary();
