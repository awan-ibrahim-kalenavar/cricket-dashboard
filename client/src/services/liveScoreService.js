import axios from 'axios';

// Roanuz Cricket API Configuration
const API_CONFIG = {
  baseURL: 'https://api.sports.roanuz.com/v5',
  apiKey: 'd59948c8-a168-44d0-aa92-5f82d589d84a',
  projectKey: 'cricket-dashboard' // You can get this from your Roanuz dashboard
};

// Cache for API responses
const cache = {
  token: null,
  tokenExpiry: null,
  matches: {},
  scores: {}
};

// Authenticate with Roanuz API
const authenticate = async () => {
  try {
    // Check if token is still valid
    if (cache.token && cache.tokenExpiry && new Date() < cache.tokenExpiry) {
      return cache.token;
    }

    const response = await axios.post(
      `${API_CONFIG.baseURL}/core/${API_CONFIG.projectKey}/auth/`,
      { api_key: API_CONFIG.apiKey }
    );

    if (response.data && response.data.data && response.data.data.access_token) {
      cache.token = response.data.data.access_token;
      // Token expires every 24 hours
      cache.tokenExpiry = new Date(Date.now() + 23 * 60 * 60 * 1000); // 23 hours
      return cache.token;
    }
    
    throw new Error('Failed to authenticate with Roanuz API');
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

// Get authenticated axios instance
const getAuthenticatedClient = async () => {
  const token = await authenticate();
  return axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

// Live Score Service
export const liveScoreService = {
  // Get featured matches (live and upcoming)
  getFeaturedMatches: async () => {
    try {
      const client = await getAuthenticatedClient();
      const response = await client.get(`/cricket/featured-matches/`);
      
      if (response.data && response.data.data) {
        return response.data.data.map(match => ({
          id: match.key,
          team1: {
            name: match.teams.a.name,
            shortName: match.teams.a.short_name,
            code: match.teams.a.code
          },
          team2: {
            name: match.teams.b.name,
            shortName: match.teams.b.short_name,
            code: match.teams.b.code
          },
          status: match.status,
          venue: match.venue,
          date: new Date(match.start_at),
          score1: match.score_a || {},
          score2: match.score_b || {},
          result: match.result || 'Match in progress',
          tournament: match.tournament,
          key: match.key
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching featured matches:', error);
      return [];
    }
  },

  // Get detailed match information
  getMatchDetails: async (matchKey) => {
    try {
      const client = await getAuthenticatedClient();
      const response = await client.get(`/cricket/match/${matchKey}/`);
      
      if (response.data && response.data.data) {
        const match = response.data.data;
        return {
          id: match.key,
          team1: {
            name: match.teams.a.name,
            shortName: match.teams.a.short_name,
            code: match.teams.a.code,
            score: match.score_a
          },
          team2: {
            name: match.teams.b.name,
            shortName: match.teams.b.short_name,
            code: match.teams.b.code,
            score: match.score_b
          },
          status: match.status,
          venue: match.venue,
          date: new Date(match.start_at),
          currentOver: match.current_over,
          currentBatsmen: match.current_batsmen || [],
          currentBowler: match.current_bowler,
          tournament: match.tournament,
          result: match.result
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching match details:', error);
      return null;
    }
  },

  // Get ball-by-ball commentary
  getBallByBall: async (matchKey) => {
    try {
      const client = await getAuthenticatedClient();
      const response = await client.get(`/cricket/match/${matchKey}/ball-by-ball/`);
      
      if (response.data && response.data.data) {
        return response.data.data.map(ball => ({
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
      }
      return [];
    } catch (error) {
      console.error('Error fetching ball-by-ball data:', error);
      return [];
    }
  },

  // Get match overs summary
  getOversSummary: async (matchKey) => {
    try {
      const client = await getAuthenticatedClient();
      const response = await client.get(`/cricket/match/${matchKey}/overs-summary/`);
      
      if (response.data && response.data.data) {
        return response.data.data.map(over => ({
          over: over.over,
          runs: over.runs,
          wickets: over.wickets,
          team: over.team,
          batsmen: over.batsmen,
          bowler: over.bowler
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching overs summary:', error);
      return [];
    }
  },

  // Get live score updates (polling endpoint)
  getLiveScore: async (matchKey) => {
    try {
      const client = await getAuthenticatedClient();
      const response = await client.get(`/cricket/match/${matchKey}/`);
      
      if (response.data && response.data.data) {
        const match = response.data.data;
        return {
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
          result: match.result
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching live score:', error);
      return null;
    }
  },

  // Get tournament matches
  getTournamentMatches: async (tournamentKey) => {
    try {
      const client = await getAuthenticatedClient();
      const response = await client.get(`/cricket/tournament/${tournamentKey}/matches/`);
      
      if (response.data && response.data.data) {
        return response.data.data.map(match => ({
          id: match.key,
          team1: match.teams.a,
          team2: match.teams.b,
          status: match.status,
          date: new Date(match.start_at),
          venue: match.venue
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching tournament matches:', error);
      return [];
    }
  }
};

// Utility function to format scores
export const formatScore = (score) => {
  if (!score) return '0/0 (0.0)';
  return `${score.runs || 0}/${score.wickets || 0} (${score.overs || '0.0'})`;
};

// Utility function to get match status with emoji
export const getMatchStatusWithEmoji = (status) => {
  const statusMap = {
    'live': '🔴 LIVE',
    'upcoming': '⏰ UPCOMING',
    'completed': '✅ COMPLETED',
    'abandoned': '❌ ABANDONED',
    'no_result': '🤝 NO RESULT'
  };
  return statusMap[status] || status;
};

// Utility function to check if match is live
export const isMatchLive = (status) => {
  return status === 'live' || status === 'in_progress';
};

export default liveScoreService;
