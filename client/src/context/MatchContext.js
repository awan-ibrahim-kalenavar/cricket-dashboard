import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { matchService } from '../services/matchService';

// Initial state
const initialState = {
  matches: [],
  liveMatches: [],
  completedMatches: [],
  upcomingMatches: [],
  selectedMatch: null,
  loading: false,
  error: null,
  lastUpdated: null,
  filters: {
    status: 'all', // all, live, completed, upcoming
    team: null,
    venue: null,
    date: null
  }
};

// Action types
const MATCH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_MATCHES: 'SET_MATCHES',
  SET_LIVE_MATCHES: 'SET_LIVE_MATCHES',
  SET_COMPLETED_MATCHES: 'SET_COMPLETED_MATCHES',
  SET_UPCOMING_MATCHES: 'SET_UPCOMING_MATCHES',
  SET_SELECTED_MATCH: 'SET_SELECTED_MATCH',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  REFRESH_MATCHES: 'REFRESH_MATCHES'
};

// Reducer function
const matchReducer = (state, action) => {
  switch (action.type) {
    case MATCH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case MATCH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case MATCH_ACTIONS.SET_MATCHES:
      return {
        ...state,
        matches: action.payload,
        loading: false,
        error: null,
        lastUpdated: new Date()
      };

    case MATCH_ACTIONS.SET_LIVE_MATCHES:
      return {
        ...state,
        liveMatches: action.payload,
        loading: false,
        error: null
      };

    case MATCH_ACTIONS.SET_COMPLETED_MATCHES:
      return {
        ...state,
        completedMatches: action.payload,
        loading: false,
        error: null
      };

    case MATCH_ACTIONS.SET_UPCOMING_MATCHES:
      return {
        ...state,
        upcomingMatches: action.payload,
        loading: false,
        error: null
      };

    case MATCH_ACTIONS.SET_SELECTED_MATCH:
      return {
        ...state,
        selectedMatch: action.payload
      };

    case MATCH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case MATCH_ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case MATCH_ACTIONS.REFRESH_MATCHES:
      return {
        ...state,
        loading: true,
        error: null
      };

    default:
      return state;
  }
};

// Create context
const MatchContext = createContext();

// Provider component
export const MatchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  // Fetch all matches
  const fetchMatches = async () => {
    dispatch({ type: MATCH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const matches = await matchService.getLiveMatches();
      dispatch({ type: MATCH_ACTIONS.SET_MATCHES, payload: matches });
      
      // Categorize matches
      const live = matches.filter(match => match.status === 'live');
      const completed = matches.filter(match => match.status === 'completed');
      const upcoming = matches.filter(match => match.status === 'upcoming');
      
      dispatch({ type: MATCH_ACTIONS.SET_LIVE_MATCHES, payload: live });
      dispatch({ type: MATCH_ACTIONS.SET_COMPLETED_MATCHES, payload: completed });
      dispatch({ type: MATCH_ACTIONS.SET_UPCOMING_MATCHES, payload: upcoming });
    } catch (error) {
      dispatch({ type: MATCH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Fetch live matches only
  const fetchLiveMatches = async () => {
    dispatch({ type: MATCH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const matches = await matchService.getLiveMatches();
      const live = matches.filter(match => match.status === 'live');
      dispatch({ type: MATCH_ACTIONS.SET_LIVE_MATCHES, payload: live });
    } catch (error) {
      dispatch({ type: MATCH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Fetch match details
  const fetchMatchDetails = async (matchId) => {
    dispatch({ type: MATCH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const match = await matchService.getMatchDetails(matchId);
      dispatch({ type: MATCH_ACTIONS.SET_SELECTED_MATCH, payload: match });
      return match;
    } catch (error) {
      dispatch({ type: MATCH_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Select a match
  const selectMatch = (match) => {
    dispatch({ type: MATCH_ACTIONS.SET_SELECTED_MATCH, payload: match });
  };

  // Clear selected match
  const clearSelectedMatch = () => {
    dispatch({ type: MATCH_ACTIONS.SET_SELECTED_MATCH, payload: null });
  };

  // Update filters
  const updateFilters = (filters) => {
    dispatch({ type: MATCH_ACTIONS.UPDATE_FILTERS, payload: filters });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: MATCH_ACTIONS.CLEAR_ERROR });
  };

  // Refresh matches
  const refreshMatches = () => {
    dispatch({ type: MATCH_ACTIONS.REFRESH_MATCHES });
    fetchMatches();
  };

  // Get filtered matches
  const getFilteredMatches = () => {
    let filtered = [...state.matches];
    
    if (state.filters.status !== 'all') {
      filtered = filtered.filter(match => match.status === state.filters.status);
    }
    
    if (state.filters.team) {
      filtered = filtered.filter(match => 
        match.team1?.name === state.filters.team || 
        match.team2?.name === state.filters.team
      );
    }
    
    if (state.filters.venue) {
      filtered = filtered.filter(match => match.venue === state.filters.venue);
    }
    
    if (state.filters.date) {
      filtered = filtered.filter(match => match.date === state.filters.date);
    }
    
    return filtered;
  };

  // Auto-refresh live matches every 30 seconds
  useEffect(() => {
    fetchMatches();
    
    const interval = setInterval(() => {
      fetchLiveMatches();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    ...state,
    fetchMatches,
    fetchLiveMatches,
    fetchMatchDetails,
    selectMatch,
    clearSelectedMatch,
    updateFilters,
    clearError,
    refreshMatches,
    getFilteredMatches
  };

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
};

// Custom hook to use the context
export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatchContext must be used within a MatchProvider');
  }
  return context;
};

export default MatchContext;
