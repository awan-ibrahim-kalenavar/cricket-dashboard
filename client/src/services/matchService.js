import apiClient from './apiClient';

export const matchService = {
  getLiveMatches: async () => {
    try {
      const response = await apiClient.get('/matches/live');
      return response.data;
    } catch (error) {
      console.error('Error fetching live matches:', error);
      throw error;
    }
  },

  getMatchScorecard: async (matchId) => {
    try {
      const response = await apiClient.get(`/matches/${matchId}/scorecard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match scorecard:', error);
      throw error;
    }
  },

  getMatchDetails: async (matchId) => {
    try {
      const response = await apiClient.get(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match details:', error);
      throw error;
    }
  },

  getUpcomingMatches: async () => {
    try {
      const response = await apiClient.get('/matches/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      throw error;
    }
  },

  getCompletedMatches: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get('/matches/completed', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching completed matches:', error);
      throw error;
    }
  },

  getMatchesByTeam: async (teamId) => {
    try {
      const response = await apiClient.get(`/matches/team/${teamId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team matches:', error);
      throw error;
    }
  },

  searchMatches: async (query) => {
    try {
      const response = await apiClient.get('/matches/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching matches:', error);
      throw error;
    }
  },

  getMatchHighlights: async (matchId) => {
    try {
      const response = await apiClient.get(`/matches/${matchId}/highlights`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match highlights:', error);
      throw error;
    }
  },

  getMatchCommentary: async (matchId) => {
    try {
      const response = await apiClient.get(`/matches/${matchId}/commentary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match commentary:', error);
      throw error;
    }
  }
};

export default matchService;
