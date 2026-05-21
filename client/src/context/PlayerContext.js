import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { playerService } from '../services/playerService';

// Initial state
const initialState = {
  players: [],
  selectedPlayer: null,
  playerStats: null,
  topRunScorers: [],
  topWicketTakers: [],
  playerRankings: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },
  filters: {
    team: null,
    role: null,
    country: null,
    search: ''
  }
};

// Action types
const PLAYER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_SELECTED_PLAYER: 'SET_SELECTED_PLAYER',
  SET_PLAYER_STATS: 'SET_PLAYER_STATS',
  SET_TOP_RUN_SCORERS: 'SET_TOP_RUN_SCORERS',
  SET_TOP_WICKET_TAKERS: 'SET_TOP_WICKET_TAKERS',
  SET_PLAYER_RANKINGS: 'SET_PLAYER_RANKINGS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION'
};

// Reducer function
const playerReducer = (state, action) => {
  switch (action.type) {
    case PLAYER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case PLAYER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case PLAYER_ACTIONS.SET_PLAYERS:
      return {
        ...state,
        players: action.payload.players || [],
        loading: false,
        error: null
      };

    case PLAYER_ACTIONS.SET_SELECTED_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload
      };

    case PLAYER_ACTIONS.SET_PLAYER_STATS:
      return {
        ...state,
        playerStats: action.payload,
        loading: false,
        error: null
      };

    case PLAYER_ACTIONS.SET_TOP_RUN_SCORERS:
      return {
        ...state,
        topRunScorers: action.payload,
        loading: false,
        error: null
      };

    case PLAYER_ACTIONS.SET_TOP_WICKET_TAKERS:
      return {
        ...state,
        topWicketTakers: action.payload,
        loading: false,
        error: null
      };

    case PLAYER_ACTIONS.SET_PLAYER_RANKINGS:
      return {
        ...state,
        playerRankings: action.payload,
        loading: false,
        error: null
      };

    case PLAYER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case PLAYER_ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case PLAYER_ACTIONS.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Create context
const PlayerContext = createContext();

// Provider component
export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Fetch all players
  const fetchPlayers = async (page = 1, limit = 20) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await playerService.getAllPlayers(page, limit);
      dispatch({ type: PLAYER_ACTIONS.SET_PLAYERS, payload: data });
      dispatch({ type: PLAYER_ACTIONS.UPDATE_PAGINATION, payload: {
        page: data.page || 1,
        limit: data.limit || 20,
        total: data.total || 0,
        totalPages: data.totalPages || 0
      }});
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Fetch player by ID
  const fetchPlayerById = async (playerId) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const player = await playerService.getPlayerById(playerId);
      dispatch({ type: PLAYER_ACTIONS.SET_SELECTED_PLAYER, payload: player });
      return player;
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch player statistics
  const fetchPlayerStats = async (playerId) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const stats = await playerService.getPlayerStats(playerId);
      dispatch({ type: PLAYER_ACTIONS.SET_PLAYER_STATS, payload: stats });
      return stats;
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Search players
  const searchPlayers = async (query) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await playerService.searchPlayers(query);
      dispatch({ type: PLAYER_ACTIONS.SET_PLAYERS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch top run scorers
  const fetchTopRunScorers = async (season, limit = 10) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await playerService.getTopRunScorers(season, limit);
      dispatch({ type: PLAYER_ACTIONS.SET_TOP_RUN_SCORERS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch top wicket takers
  const fetchTopWicketTakers = async (season, limit = 10) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await playerService.getTopWicketTakers(season, limit);
      dispatch({ type: PLAYER_ACTIONS.SET_TOP_WICKET_TAKERS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch player rankings
  const fetchPlayerRankings = async (type, format) => {
    dispatch({ type: PLAYER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await playerService.getPlayerRankings(type, format);
      dispatch({ type: PLAYER_ACTIONS.SET_PLAYER_RANKINGS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: PLAYER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Select a player
  const selectPlayer = (player) => {
    dispatch({ type: PLAYER_ACTIONS.SET_SELECTED_PLAYER, payload: player });
  };

  // Clear selected player
  const clearSelectedPlayer = () => {
    dispatch({ type: PLAYER_ACTIONS.SET_SELECTED_PLAYER, payload: null });
    dispatch({ type: PLAYER_ACTIONS.SET_PLAYER_STATS, payload: null });
  };

  // Update filters
  const updateFilters = (filters) => {
    dispatch({ type: PLAYER_ACTIONS.UPDATE_FILTERS, payload: filters });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: PLAYER_ACTIONS.CLEAR_ERROR });
  };

  // Get filtered players
  const getFilteredPlayers = () => {
    let filtered = [...state.players];
    
    if (state.filters.search) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }
    
    if (state.filters.team) {
      filtered = filtered.filter(player => player.team === state.filters.team);
    }
    
    if (state.filters.role) {
      filtered = filtered.filter(player => player.role === state.filters.role);
    }
    
    if (state.filters.country) {
      filtered = filtered.filter(player => player.country === state.filters.country);
    }
    
    return filtered;
  };

  // Load initial data
  useEffect(() => {
    fetchPlayers();
  }, []);

  const value = {
    ...state,
    fetchPlayers,
    fetchPlayerById,
    fetchPlayerStats,
    searchPlayers,
    fetchTopRunScorers,
    fetchTopWicketTakers,
    fetchPlayerRankings,
    selectPlayer,
    clearSelectedPlayer,
    updateFilters,
    clearError,
    getFilteredPlayers
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the context
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};

export default PlayerContext;
