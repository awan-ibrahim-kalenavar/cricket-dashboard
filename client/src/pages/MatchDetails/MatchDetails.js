import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matchService } from '../../services/matchService';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import './MatchDetails.css';

const MatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [scorecard, setScorecard] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScorecard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching scorecard for matchId:', matchId);
      
      const mockScorecard = {
        batting: [
          { name: 'Rohit Sharma', runs: 45, balls: 32, fours: 6, sixes: 2, status: 'Caught', role: 'Captain' },
          { name: 'Ishan Kishan', runs: 38, balls: 28, fours: 4, sixes: 1, status: 'Bowled', role: 'Wicket Keeper' },
          { name: 'Suryakumar Yadav', runs: 67, balls: 45, fours: 8, sixes: 2, status: 'Not Out', role: 'Batsman' },
          { name: 'Tilak Varma', runs: 23, balls: 18, fours: 3, sixes: 0, status: 'Run Out', role: 'Batsman' },
          { name: 'Hardik Pandya', runs: 15, balls: 12, fours: 1, sixes: 1, status: 'Not Out', role: 'All-rounder' },
        ],
        bowling: [
          { name: 'Deepak Chahar', overs: '4.0', runs: 38, wickets: 2, maidens: 0, role: 'Fast Bowler' },
          { name: 'Ravindra Jadeja', overs: '4.0', runs: 32, wickets: 1, maidens: 0, role: 'All-rounder' },
          { name: 'Moeen Ali', overs: '4.0', runs: 28, wickets: 0, maidens: 0, role: 'All-rounder' },
          { name: 'Dwaine Pretorius', overs: '3.5', runs: 45, wickets: 1, maidens: 0, role: 'Fast Bowler' },
        ]
      };

      const mockMatchInfo = {
        id: matchId || '1',
        team1: { name: 'Mumbai Indians', score: '188/4', overs: '20.0' },
        team2: { name: 'Chennai Super Kings', score: '165/8', overs: '20.0' },
        matchType: 'T20',
        venue: 'Wankhede Stadium, Mumbai',
        date: 'March 13, 2026',
        result: 'Mumbai Indians won by 23 runs',
        status: 'completed'
      };

      setScorecard(mockScorecard);
      setMatchInfo(mockMatchInfo);
      console.log('Scorecard data loaded:', mockScorecard);
      console.log('Match info loaded:', mockMatchInfo);
    } catch (err) {
      setError('Failed to fetch scorecard. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (matchId) {
      fetchScorecard();
    } else {
  
      const defaultMatchId = '1';
      fetchScorecard();
    }
  }, [matchId, fetchScorecard]);

  if (loading) {
    return (
      <div className="match-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-details">
        <div className="error-message">
          ❌ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="match-details">
      <div className="page-header">
        <button 
          onClick={() => navigate('/live-matches')}
          className="back-button"
        >
          ← Back to Live Matches
        </button>
        
        <h1 className="page-title">
          🏏 Match Scorecard
        </h1>
      </div>

      {matchInfo && (
        <div className="match-info-card">
          <h2 className="match-title">
            {matchInfo.team1?.name} vs {matchInfo.team2?.name}
          </h2>
          
          <div className="teams-comparison">
            <div className="team-info">
              <h3 className="team-name">{matchInfo.team1?.name}</h3>
              <div className="team-score">{matchInfo.team1?.score}</div>
              <div className="team-overs">{matchInfo.team1?.overs} overs</div>
            </div>
            
            <div className="vs-divider">VS</div>
            
            <div className="team-info">
              <h3 className="team-name">{matchInfo.team2?.name}</h3>
              <div className="team-score">{matchInfo.team2?.score}</div>
              <div className="team-overs">{matchInfo.team2?.overs} overs</div>
            </div>
          </div>
          
          <div className="match-result">
            <h3 className="result-text">{matchInfo.result}</h3>
            <p className="match-details">{matchInfo.venue} • {matchInfo.date}</p>
          </div>
        </div>
      )}

      <ScoreBoard scorecard={scorecard} />
    </div>
  );
};

export default MatchDetails;
