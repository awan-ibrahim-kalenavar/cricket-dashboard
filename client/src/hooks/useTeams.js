import { useState, useEffect, useCallback } from 'react';
import { teamService } from '../services/teamService';

const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await teamService.getAllTeams();
      setTeams(data.teams || []);
    } catch (err) {
      setError('Failed to fetch teams. Please try again.');
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeamById = useCallback(async (teamId) => {
    try {
      setLoading(true);
      setError(null);
      
      const team = await teamService.getTeamById(teamId);
      setSelectedTeam(team);
      return team;
    } catch (err) {
      setError('Failed to fetch team details. Please try again.');
      console.error('Error fetching team details:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeamSquad = useCallback(async (teamId) => {
    try {
      setLoading(true);
      setError(null);
      
      const squad = await teamService.getTeamSquad(teamId);
      return squad;
    } catch (err) {
      setError('Failed to fetch team squad. Please try again.');
      console.error('Error fetching team squad:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeamStats = useCallback(async (teamId, season) => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await teamService.getTeamStats(teamId, season);
      return stats;
    } catch (err) {
      setError('Failed to fetch team statistics. Please try again.');
      console.error('Error fetching team stats:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeamPerformance = useCallback(async (teamId, season) => {
    try {
      setLoading(true);
      setError(null);
      
      const performance = await teamService.getTeamPerformance(teamId, season);
      return performance;
    } catch (err) {
      setError('Failed to fetch team performance. Please try again.');
      console.error('Error fetching team performance:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchTeams = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await teamService.searchTeams(query);
      setTeams(data.teams || []);
      return data;
    } catch (err) {
      setError('Failed to search teams. Please try again.');
      console.error('Error searching teams:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeamRankings = useCallback(async (season) => {
    try {
      setLoading(true);
      setError(null);
      
      const rankings = await teamService.getTeamRankings(season);
      return rankings;
    } catch (err) {
      setError('Failed to fetch team rankings. Please try again.');
      console.error('Error fetching team rankings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeamHeadToHead = useCallback(async (teamId1, teamId2) => {
    try {
      setLoading(true);
      setError(null);
      
      const headToHead = await teamService.getTeamHeadToHead(teamId1, teamId2);
      return headToHead;
    } catch (err) {
      setError('Failed to fetch head-to-head statistics. Please try again.');
      console.error('Error fetching head-to-head:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const selectTeam = useCallback((team) => {
    setSelectedTeam(team);
  }, []);

  const clearSelectedTeam = useCallback(() => {
    setSelectedTeam(null);
  }, []);

  const refreshTeams = useCallback(() => {
    return fetchTeams();
  }, [fetchTeams]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    teams,
    selectedTeam,
    loading,
    error,
    fetchTeams,
    getTeamById,
    getTeamSquad,
    getTeamStats,
    getTeamPerformance,
    searchTeams,
    getTeamRankings,
    getTeamHeadToHead,
    selectTeam,
    clearSelectedTeam,
    refreshTeams,
    clearError,
  };
};

export default useTeams;
