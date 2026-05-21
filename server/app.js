const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require("http");
const { Server } = require("socket.io");
const axios = require('axios');
require('dotenv').config();
const connectDB = require("./config/db");

connectDB();

// Import cron jobs for notifications
require("./cron/matchNotifier");

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store io globally
app.set("io", io);

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, '../client/src/assets')));

const commentaryRoutes = require('./routes/commentary');
const matchesRoutes = require('./routes/matches');
const usersRoutes = require('./routes/users');

app.use('/api/commentary', commentaryRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/users', usersRoutes);

// Store commentary data
let commentaryData = [];

// Live Score API Configuration
const LIVE_SCORE_API = {
  baseURL: 'https://api.sports.roanuz.com/v5',
  apiKey: 'd59948c8-a168-44d0-aa92-5f82d589d84a',
  projectKey: 'cricket-dashboard'
};

// Cache for API responses
let apiCache = {
  token: null,
  tokenExpiry: null,
  matches: [],
  lastUpdate: null
};

// Authenticate with Roanuz API
const authenticate = async () => {
  try {
    if (apiCache.token && apiCache.tokenExpiry && new Date() < apiCache.tokenExpiry) {
      return apiCache.token;
    }

    const response = await axios.post(
      `${LIVE_SCORE_API.baseURL}/core/${LIVE_SCORE_API.projectKey}/auth/`,
      { api_key: LIVE_SCORE_API.apiKey }
    );

    if (response.data && response.data.data && response.data.data.access_token) {
      apiCache.token = response.data.data.access_token;
      apiCache.tokenExpiry = new Date(Date.now() + 23 * 60 * 60 * 1000); // 23 hours
      return apiCache.token;
    }
    
    throw new Error('Failed to authenticate with Roanuz API');
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Get live matches from API
const getLiveMatchesFromAPI = async () => {
  try {
    const token = await authenticate();
    if (!token) return [];

    const response = await axios.get(
      `${LIVE_SCORE_API.baseURL}/cricket/featured-matches/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.data) {
      return response.data.data.map(match => ({
        _id: match.key,
        team1: {
          _id: match.teams.a.code,
          name: match.teams.a.name,
          shortName: match.teams.a.short_name
        },
        team2: {
          _id: match.teams.b.code,
          name: match.teams.b.name,
          shortName: match.teams.b.short_name
        },
        status: match.status.toUpperCase(),
        venue: match.venue || 'Stadium',
        date: new Date(match.start_at),
        score1: match.score_a || { runs: 0, wickets: 0, overs: '0.0' },
        score2: match.score_b || { runs: 0, wickets: 0, overs: '0.0' },
        result: match.result || 'Match in progress',
        tournament: match.tournament?.name || 'Cricket Match',
        key: match.key,
        isLiveAPI: true // Flag to identify API matches
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching live matches from API:', error);
    return [];
  }
};

// Commentary API endpoints
app.post("/api/commentary", (req, res) => {
  const { matchId, text } = req.body;

  const newComment = {
    id: Date.now(),
    matchId,
    text,
    time: new Date().toLocaleTimeString(),
  };

  commentaryData.push(newComment);

  // Emit to frontend
  const io = req.app.get("io");
  io.emit("newCommentary", newComment);

  res.json({ success: true, data: newComment });
});

app.get("/api/commentary/:matchId", (req, res) => {
  const matchComments = commentaryData.filter(
    (c) => c.matchId === req.params.matchId
  );

  res.json({ success: true, data: matchComments });
});

const users = [
  { id: 1, username: 'awan', password: '1234', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' }
];

const teams = [
  { _id: 'team1', name: 'Mumbai Indians', shortName: 'MI', captain: 'Rohit Sharma', coach: 'Mark Boucher', founded: 2008, titles: 5, homeGround: 'Wankhede Stadium' },
  { _id: 'team2', name: 'Chennai Super Kings', shortName: 'CSK', captain: 'MS Dhoni', coach: 'Stephen Fleming', founded: 2008, titles: 4, homeGround: 'M.A. Chidambaram Stadium' },
  { _id: 'team3', name: 'Royal Challengers Bangalore', shortName: 'RCB', captain: 'Faf du Plessis', coach: 'Andy Flower', founded: 2008, titles: 0, homeGround: 'M. Chinnaswamy Stadium' },
  { _id: 'team4', name: 'Kolkata Knight Riders', shortName: 'KKR', captain: 'Shreyas Iyer', coach: 'Chandrakant Pandit', founded: 2008, titles: 2, homeGround: 'Eden Gardens' }
];


const matches = [
  { _id: 'match1', team1: teams[0], team2: teams[1], date: new Date(), venue: 'Wankhede Stadium, Mumbai', status: 'LIVE', score1: { runs: 150, wickets: 7, overs: 18.5 }, score2: { runs: 145, wickets: 8, overs: 19.2 }, result: 'In Progress' },
  { _id: 'match2', team1: teams[2], team2: teams[3], date: new Date(), venue: 'M. Chinnaswamy Stadium, Bangalore', status: 'COMPLETED', score1: { runs: 200, wickets: 5, overs: 20 }, score2: { runs: 198, wickets: 6, overs: 20 }, result: 'RCB won by 2 runs' },
  { _id: 'match3', team1: teams[0], team2: teams[2], date: new Date(), venue: 'Wankhede Stadium, Mumbai', status: 'UPCOMING', result: 'Match to be played' }
];


const highlights = [
  {
    _id: "h1",
    title: "MI vs CSK – Last Over Thriller 🔥",
    videoUrl: "https://www.youtube.com/embed/WW8NzcnVong",
    description: "Mumbai Indians vs Chennai Super Kings full highlights",
    date: "28 Apr 2026"
  },
  {
    _id: "h2",
    title: "RCB vs KKR – Kohli Masterclass 💥",
    videoUrl: "https://www.youtube.com/embed/ZsSjesWT9hI",
    description: "RCB vs KKR full highlights",
    date: "27 Apr 2026"
  },
  {
    _id: "h3",
    title: "RCB vs CSK 💥",
    videoUrl: "https://www.youtube.com/embed/RX1Je0GFlUQ",
    description: "RCB vs CSK full highlights",
    date: "28 Apr 2026"
  },
  {
    _id: "h4",
    title: "SRH vs RR",
    videoUrl: "https://www.youtube.com/embed/dvX8kOkOfgM",
    description: "SRH vs RR full highlights",
    date: "29 Apr 2026"
  }
];




app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = Buffer.from(`${user.id}:${user.username}`).toString('base64');

    return res.json({
      success: true,
      message: 'Login successful',
      jwt_token: token,
      user
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
});


app.get('/api/teams', (req, res) => {
  res.json({
    success: true,
    count: teams.length,
    data: teams
  });
});

app.get('/api/matches', async (req, res) => {
  try {
    // Get live matches from API
    const apiMatches = await getLiveMatchesFromAPI();
    
    // Combine local matches with API matches
    const allMatches = [...apiMatches, ...matches];
    
    // Remove duplicates based on match key/id
    const uniqueMatches = allMatches.filter((match, index, self) => 
      index === self.findIndex((m) => (m.key || m._id) === (match.key || match._id))
    );

    res.json({
      success: true,
      count: uniqueMatches.length,
      data: uniqueMatches
    });
  } catch (error) {
    console.error('Error in matches endpoint:', error);
    // Fallback to local matches if API fails
    res.json({
      success: true,
      count: matches.length,
      data: matches
    });
  }
});

// Live score updates endpoint
app.get('/api/live-scores/:matchKey', async (req, res) => {
  try {
    const { matchKey } = req.params;
    const token = await authenticate();
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }

    const response = await axios.get(
      `${LIVE_SCORE_API.baseURL}/cricket/match/${matchKey}/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.data) {
      const match = response.data.data;
      const scoreData = {
        matchKey: match.key,
        status: match.status,
        team1Score: match.score_a,
        team2Score: match.score_b,
        currentOver: match.current_over,
        currentBatsmen: match.current_batsmen,
        currentBowler: match.current_bowler,
        lastBall: match.last_ball,
        runRate: match.run_rate,
        requiredRunRate: match.required_run_rate,
        result: match.result,
        timestamp: new Date().toISOString()
      };

      // Emit real-time update to all connected clients
      const io = req.app.get("io");
      io.emit("liveScoreUpdate", scoreData);

      res.json({ success: true, data: scoreData });
    } else {
      res.json({ success: false, message: 'No match data found' });
    }
  } catch (error) {
    console.error('Error fetching live score:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch live score' });
  }
});

// Ball-by-ball updates endpoint
app.get('/api/ball-by-ball/:matchKey', async (req, res) => {
  try {
    const { matchKey } = req.params;
    const token = await authenticate();
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }

    const response = await axios.get(
      `${LIVE_SCORE_API.baseURL}/cricket/match/${matchKey}/ball-by-ball/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.data) {
      const ballData = response.data.data.map(ball => ({
        over: ball.over,
        ball: ball.ball,
        batsman: ball.batsman,
        bowler: ball.bowler,
        runs: ball.runs,
        isWicket: ball.is_wicket,
        isBoundary: ball.is_boundary,
        commentary: ball.commentary,
        timestamp: ball.timestamp
      }));

      res.json({ success: true, data: ballData });
    } else {
      res.json({ success: false, message: 'No ball data found' });
    }
  } catch (error) {
    console.error('Error fetching ball-by-ball data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ball data' });
  }
});

app.get('/api/highlights', (req, res) => {
  res.json({
    success: true,
    count: highlights.length,
    data: highlights
  });
});


app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'IPL Dashboard API is running',
    timestamp: new Date().toISOString()
  });
});




app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
  console.log(`Socket.IO: Connected`);
});

module.exports = app;