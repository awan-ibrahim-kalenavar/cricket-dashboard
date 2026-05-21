import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { teamService } from '../services/teamService';

// Initial state
const initialState = {
  teams: [],
  selectedTeam: null,
  teamSquad: [],
  teamStats: null,
  teamPerformance: null,
  teamRankings: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    league: null,
    country: null
  }
};

// Action types
const TEAM_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_TEAMS: 'SET_TEAMS',
  SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
  SET_TEAM_SQUAD: 'SET_TEAM_SQUAD',
  SET_TEAM_STATS: 'SET_TEAM_STATS',
  SET_TEAM_PERFORMANCE: 'SET_TEAM_PERFORMANCE',
  SET_TEAM_RANKINGS: 'SET_TEAM_RANKINGS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_FILTERS: 'UPDATE_FILTERS'
};

// Reducer function
const teamReducer = (state, action) => {
  switch (action.type) {
    case TEAM_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case TEAM_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case TEAM_ACTIONS.SET_TEAMS:
      return {
        ...state,
        teams: action.payload.teams || [],
        loading: false,
        error: null
      };

    case TEAM_ACTIONS.SET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: action.payload
      };

    case TEAM_ACTIONS.SET_TEAM_SQUAD:
      return {
        ...state,
        teamSquad: action.payload.players || [],
        loading: false,
        error: null
      };

    case TEAM_ACTIONS.SET_TEAM_STATS:
      return {
        ...state,
        teamStats: action.payload,
        loading: false,
        error: null
      };

    case TEAM_ACTIONS.SET_TEAM_PERFORMANCE:
      return {
        ...state,
        teamPerformance: action.payload,
        loading: false,
        error: null
      };

    case TEAM_ACTIONS.SET_TEAM_RANKINGS:
      return {
        ...state,
        teamRankings: action.payload,
        loading: false,
        error: null
      };

    case TEAM_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case TEAM_ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Create context
const TeamContext = createContext();

// Provider component
export const TeamProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamReducer, initialState);

  // Fetch all teams
  const fetchTeams = async () => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await teamService.getAllTeams();
      dispatch({ type: TEAM_ACTIONS.SET_TEAMS, payload: data });
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Fetch team by ID
  const fetchTeamById = async (teamId) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const team = await teamService.getTeamById(teamId);
      dispatch({ type: TEAM_ACTIONS.SET_SELECTED_TEAM, payload: team });
      return team;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch team squad
  const fetchTeamSquad = async (teamId) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const squad = await teamService.getTeamSquad(teamId);
      dispatch({ type: TEAM_ACTIONS.SET_TEAM_SQUAD, payload: squad });
      return squad;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch team statistics
  const fetchTeamStats = async (teamId, season) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const stats = await teamService.getTeamStats(teamId, season);
      dispatch({ type: TEAM_ACTIONS.SET_TEAM_STATS, payload: stats });
      return stats;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch team performance
  const fetchTeamPerformance = async (teamId, season) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const performance = await teamService.getTeamPerformance(teamId, season);
      dispatch({ type: TEAM_ACTIONS.SET_TEAM_PERFORMANCE, payload: performance });
      return performance;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Fetch team rankings
  const fetchTeamRankings = async (season) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const rankings = await teamService.getTeamRankings(season);
      dispatch({ type: TEAM_ACTIONS.SET_TEAM_RANKINGS, payload: rankings });
      return rankings;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Search teams
  const searchTeams = async (query) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const data = await teamService.searchTeams(query);
      dispatch({ type: TEAM_ACTIONS.SET_TEAMS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Get head-to-head statistics
  const getHeadToHead = async (teamId1, teamId2) => {
    dispatch({ type: TEAM_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const headToHead = await teamService.getTeamHeadToHead(teamId1, teamId2);
      return headToHead;
    } catch (error) {
      dispatch({ type: TEAM_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Select a team
  const selectTeam = (team) => {
    dispatch({ type: TEAM_ACTIONS.SET_SELECTED_TEAM, payload: team });
  };

  // Clear selected team
  const clearSelectedTeam = () => {
    dispatch({ type: TEAM_ACTIONS.SET_SELECTED_TEAM, payload: null });
    dispatch({ type: TEAM_ACTIONS.SET_TEAM_SQUAD, payload: { players: [] } });
    dispatch({ type: TEAM_ACTIONS.SET_TEAM_STATS, payload: null });
    dispatch({ type: TEAM_ACTIONS.SET_TEAM_PERFORMANCE, payload: null });
  };

  // Update filters
  const updateFilters = (filters) => {
    dispatch({ type: TEAM_ACTIONS.UPDATE_FILTERS, payload: filters });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: TEAM_ACTIONS.CLEAR_ERROR });
  };

  // Get filtered teams
  const getFilteredTeams = () => {
    let filtered = [...state.teams];
    
    if (state.filters.search) {
      filtered = filtered.filter(team => 
        team.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        team.shortName.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }
    
    if (state.filters.league) {
      filtered = filtered.filter(team => team.league === state.filters.league);
    }
    
    if (state.filters.country) {
      filtered = filtered.filter(team => team.country === state.filters.country);
    }
    
    return filtered;
  };

  // Load initial data
  useEffect(() => {
    fetchTeams();
  }, []);

  const value = {
    ...state,
    fetchTeams,
    fetchTeamById,
    fetchTeamSquad,
    fetchTeamStats,
    fetchTeamPerformance,
    fetchTeamRankings,
    searchTeams,
    getHeadToHead,
    selectTeam,
    clearSelectedTeam,
    updateFilters,
    clearError,
    getFilteredTeams
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

// Custom hook to use the context
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  return context;
};

export default TeamContext;
