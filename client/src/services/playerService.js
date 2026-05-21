import apiClient from './apiClient';

export const playerService = {
  getAllPlayers: async (page = 1, limit = 20) => {
    try {
      const response = await apiClient.get('/players', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  },

  getPlayerById: async (playerId) => {
    try {
      const response = await apiClient.get(`/players/${playerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player details:', error);
      throw error;
    }
  },

  getPlayerStats: async (playerId) => {
    try {
      const response = await apiClient.get(`/players/${playerId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player stats:', error);
      throw error;
    }
  },

  getPlayerCareer: async (playerId) => {
    try {
      const response = await apiClient.get(`/players/${playerId}/career`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player career:', error);
      throw error;
    }
  },

  getPlayersByTeam: async (teamId) => {
    try {
      const response = await apiClient.get(`/players/team/${teamId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team players:', error);
      throw error;
    }
  },

  searchPlayers: async (query) => {
    try {
      const response = await apiClient.get('/players/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching players:', error);
      throw error;
    }
  },

  getTopRunScorers: async (season, limit = 10) => {
    try {
      const response = await apiClient.get('/players/top/runs', {
        params: { season, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top run scorers:', error);
      throw error;
    }
  },

  getTopWicketTakers: async (season, limit = 10) => {
    try {
      const response = await apiClient.get('/players/top/wickets', {
        params: { season, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top wicket takers:', error);
      throw error;
    }
  },

  getPlayerRankings: async (type, format) => {
    try {
      const response = await apiClient.get('/players/rankings', {
        params: { type, format }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching player rankings:', error);
      throw error;
    }
  },

  getPlayerForm: async (playerId, matches = 10) => {
    try {
      const response = await apiClient.get(`/players/${playerId}/form`, {
        params: { matches }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching player form:', error);
      throw error;
    }
  },

  getPlayerComparison: async (playerId1, playerId2) => {
    try {
      const response = await apiClient.get('/players/compare', {
        params: { player1: playerId1, player2: playerId2 }
      });
      return response.data;
    } catch (error) {
      console.error('Error comparing players:', error);
      throw error;
    }
  }
};

export default playerService;
