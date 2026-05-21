import { useState, useEffect, useCallback } from 'react';
import { playerService } from '../services/playerService';

const usePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchPlayers = useCallback(async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await playerService.getAllPlayers(page, limit);
      
      setPlayers(data.players || []);
      setPagination({
        page: data.page || 1,
        limit: data.limit || 20,
        total: data.total || 0,
        totalPages: data.totalPages || 0
      });
    } catch (err) {
      setError('Failed to fetch players. Please try again.');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlayerById = useCallback(async (playerId) => {
    try {
      setLoading(true);
      setError(null);
      
      const player = await playerService.getPlayerById(playerId);
      return player;
    } catch (err) {
      setError('Failed to fetch player details. Please try again.');
      console.error('Error fetching player details:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlayerStats = useCallback(async (playerId) => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await playerService.getPlayerStats(playerId);
      return stats;
    } catch (err) {
      setError('Failed to fetch player statistics. Please try again.');
      console.error('Error fetching player stats:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPlayers = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await playerService.searchPlayers(query);
      setPlayers(data.players || []);
      return data;
    } catch (err) {
      setError('Failed to search players. Please try again.');
      console.error('Error searching players:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTopRunScorers = useCallback(async (season, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await playerService.getTopRunScorers(season, limit);
      return data;
    } catch (err) {
      setError('Failed to fetch top run scorers. Please try again.');
      console.error('Error fetching top run scorers:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTopWicketTakers = useCallback(async (season, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await playerService.getTopWicketTakers(season, limit);
      return data;
    } catch (err) {
      setError('Failed to fetch top wicket takers. Please try again.');
      console.error('Error fetching top wicket takers:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlayerForm = useCallback(async (playerId, matches = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const form = await playerService.getPlayerForm(playerId, matches);
      return form;
    } catch (err) {
      setError('Failed to fetch player form. Please try again.');
      console.error('Error fetching player form:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPlayers = useCallback(() => {
    return fetchPlayers(pagination.page, pagination.limit);
  }, [fetchPlayers, pagination.page, pagination.limit]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return {
    players,
    loading,
    error,
    pagination,
    fetchPlayers,
    getPlayerById,
    getPlayerStats,
    searchPlayers,
    getTopRunScorers,
    getTopWicketTakers,
    getPlayerForm,
    refreshPlayers,
    clearError,
  };
};

export default usePlayers;
