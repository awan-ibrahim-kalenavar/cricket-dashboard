import React, { useState, useEffect } from 'react';
import './LiveCommentary.css';

const LiveCommentary = ({ matchId, isLive = false }) => {
  const [commentaries, setCommentaries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(matchId || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(isLive);
  const [newCommentary, setNewCommentary] = useState({
    over: 1,
    ball: 1,
    commentary: '',
    event: 'run',
    runs: 0,
    wicket: false,
    batsman: '',
    bowler: '',
    team: ''
  });

  // Fetch teams and matches
  const fetchTeamsAndMatches = async () => {
    try {
      // Fetch teams
      const teamsResponse = await fetch('http://localhost:5000/api/teams');
      const teamsData = await teamsResponse.json();
      if (teamsData.success) {
        setTeams(teamsData.data);
      }

      // Fetch matches
      const matchesResponse = await fetch('http://localhost:5000/api/matches');
      const matchesData = await matchesResponse.json();
      if (matchesData.success) {
        setMatches(matchesData.data);
      }
    } catch (error) {
      console.error('Error fetching teams/matches:', error);
    }
  };

  // Fetch commentary
  const fetchCommentary = async () => {
    if (!selectedMatch) return;
    
    try {
      setLoading(true);
      const endpoint = isLive ? `/api/commentary/match/${selectedMatch}/live` : `/api/commentary/match/${selectedMatch}`;
      const response = await fetch(`http://localhost:5000${endpoint}`);
      const data = await response.json();
      
      if (data.success) {
        setCommentaries(data.data);
      } else {
        setError('Failed to fetch commentary');
      }
    } catch (error) {
      setError('Error fetching commentary');
    } finally {
      setLoading(false);
    }
  };

  // Add new commentary (for admin)
  const addCommentary = async (e) => {
    e.preventDefault();
    if (!selectedMatch) {
      setError('Please select a match first');
      return;
    }
    
    try {
      // Create commentary text from form data
      let commentaryText = newCommentary.commentary;
      if (newCommentary.event === 'wicket' && newCommentary.wicket) {
        commentaryText = `🔥 WICKET! ${newCommentary.batsman} out! ${newCommentary.commentary}`;
      } else if (newCommentary.event === 'boundary' && newCommentary.runs === 4) {
        commentaryText = `💥 FOUR! ${newCommentary.batsman} finds the boundary!`;
      } else if (newCommentary.event === 'boundary' && newCommentary.runs === 6) {
        commentaryText = `🎤 SIX! ${newCommentary.batsman} sends it into the stands!`;
      } else if (newCommentary.runs > 0) {
        commentaryText = `🏏 ${newCommentary.runs} run${newCommentary.runs > 1 ? 's' : ''} ${newCommentary.commentary}`;
      }

      const response = await fetch(`http://localhost:5000/api/commentary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId: selectedMatch,
          text: commentaryText
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setCommentaries([data.data, ...commentaries]);
        // Reset form
        setNewCommentary({
          over: newCommentary.over + (newCommentary.ball === 6 ? 1 : 0),
          ball: newCommentary.ball === 6 ? 1 : newCommentary.ball + 1,
          commentary: '',
          event: 'run',
          runs: 0,
          wicket: false,
          batsman: newCommentary.batsman,
          bowler: newCommentary.bowler,
          team: newCommentary.team
        });
      }
    } catch (error) {
      setError('Error adding commentary');
    }
  };

  // Auto-refresh for live matches
  useEffect(() => {
    if (autoRefresh && selectedMatch) {
      const interval = setInterval(fetchCommentary, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedMatch]);

  // Initial fetch
  useEffect(() => {
    fetchTeamsAndMatches();
  }, []);

  // Fetch commentary when match changes
  useEffect(() => {
    if (selectedMatch) {
      fetchCommentary();
    }
  }, [selectedMatch]);

  // Get event emoji
  const getEventEmoji = (event, runs) => {
    const emojis = {
      'run': runs > 0 ? '🏏' : '⚪',
      'wicket': '🏏',
      'boundary': '🏏🏏',
      'six': '🎯',
      'wide': '➡️',
      'no-ball': '⚠️',
      'bye': '🏃',
      'leg-bye': '🏃',
      'dot': '⚪',
      'review': '📹',
      'injury': '🏥',
      'partnership': '🤝'
    };
    return emojis[event] || '🏏';
  };

  // Format commentary text
  const formatCommentary = (commentary) => {
    return commentary.split(' ').map((word, index) => {
      if (word.includes('FOUR') || word.includes('4')) return <span key={index} className="highlight-four">{word} </span>;
      if (word.includes('SIX') || word.includes('6')) return <span key={index} className="highlight-six">{word} </span>;
      if (word.includes('WICKET') || word.includes('OUT')) return <span key={index} className="highlight-wicket">{word} </span>;
      return word + ' ';
    });
  };

  if (loading) {
    return <div className="commentary-loading">Loading commentary...</div>;
  }

  if (error) {
    return <div className="commentary-error">Error: {error}</div>;
  }

  return (
    <div className="live-commentary-container">
      <div className="commentary-header">
        <h3>📢 Live Commentary</h3>
        {isLive && (
          <div className="live-controls">
            <span className="live-indicator">🔴 LIVE</span>
            <button 
              className={`refresh-toggle ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? '⏸️ Auto-refresh ON' : '▶️ Auto-refresh OFF'}
            </button>
          </div>
        )}
      </div>

      {/* Match Selection */}
      <div className="match-selection">
        <h4>Select Match:</h4>
        <select 
          value={selectedMatch} 
          onChange={(e) => setSelectedMatch(e.target.value)}
          className="match-select"
        >
          <option value="">Choose a match...</option>
          {matches.map(match => (
            <option key={match._id} value={match._id}>
              {match.team1?.name || 'Team 1'} vs {match.team2?.name || 'Team 2'} - {match.status}
            </option>
          ))}
        </select>
      </div>

      {/* Admin Panel for adding commentary */}
      <div className="admin-panel">
        <h4>Add Commentary</h4>
        <form onSubmit={addCommentary} className="commentary-form">
          <div className="form-row">
            <input
              type="number"
              placeholder="Over"
              value={newCommentary.over}
              onChange={(e) => setNewCommentary({...newCommentary, over: parseInt(e.target.value)})}
              className="over-input"
              min="1"
            />
            <span>.</span>
            <input
              type="number"
              placeholder="Ball"
              value={newCommentary.ball}
              onChange={(e) => setNewCommentary({...newCommentary, ball: parseInt(e.target.value)})}
              className="ball-input"
              min="1"
              max="6"
            />
            <select
              value={newCommentary.event}
              onChange={(e) => setNewCommentary({...newCommentary, event: e.target.value})}
              className="event-select"
            >
              <option value="run">Run</option>
              <option value="wicket">Wicket</option>
              <option value="boundary">Boundary</option>
              <option value="six">Six</option>
              <option value="wide">Wide</option>
              <option value="no-ball">No Ball</option>
              <option value="dot">Dot Ball</option>
            </select>
            <input
              type="number"
              placeholder="Runs"
              value={newCommentary.runs}
              onChange={(e) => setNewCommentary({...newCommentary, runs: parseInt(e.target.value)})}
              className="runs-input"
              min="0"
              max="6"
            />
            <label className="wicket-checkbox">
              <input
                type="checkbox"
                checked={newCommentary.wicket}
                onChange={(e) => setNewCommentary({...newCommentary, wicket: e.target.checked})}
              />
              Wicket
            </label>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Batsman"
              value={newCommentary.batsman}
              onChange={(e) => setNewCommentary({...newCommentary, batsman: e.target.value})}
              className="player-input"
            />
            <input
              type="text"
              placeholder="Bowler"
              value={newCommentary.bowler}
              onChange={(e) => setNewCommentary({...newCommentary, bowler: e.target.value})}
              className="player-input"
            />
            <select
              value={newCommentary.team}
              onChange={(e) => setNewCommentary({...newCommentary, team: e.target.value})}
              className="team-select"
            >
              <option value="">Select Team...</option>
              {teams.map(team => (
                <option key={team._id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <textarea
              placeholder="Enter commentary text..."
              value={newCommentary.commentary}
              onChange={(e) => setNewCommentary({...newCommentary, commentary: e.target.value})}
              className="commentary-textarea"
              rows="3"
              required
            />
            <button type="submit" className="add-commentary-btn">
              📢 Add Commentary
            </button>
          </div>
        </form>
      </div>

      {/* Commentary List */}
      <div className="commentary-list">
        {commentaries.length === 0 ? (
          <div className="no-commentary">No commentary available yet</div>
        ) : (
          commentaries.map((commentary, index) => (
            <div key={commentary._id} className={`commentary-item ${commentary.highlights ? 'highlight' : ''}`}>
              <div className="commentary-header-info">
                <span className="over-info">
                  Over {commentary.over}.{commentary.ball}
                </span>
                <span className="timestamp">
                  {new Date(commentary.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="commentary-content">
                <span className="event-emoji">
                  {getEventEmoji(commentary.event, commentary.runs)}
                </span>
                <span className="commentary-text">
                  {formatCommentary(commentary.commentary)}
                </span>
                {commentary.runs > 0 && (
                  <span className="runs-badge">+{commentary.runs}</span>
                )}
                {commentary.wicket && (
                  <span className="wicket-badge">🏏</span>
                )}
              </div>
              <div className="commentary-details">
                <span className="players">
                  {commentary.batsman} vs {commentary.bowler}
                </span>
                <span className="team">
                  {commentary.team} • {commentary.score}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <div className="commentary-footer">
        <button onClick={fetchCommentary} className="refresh-btn">
          🔄 Refresh
        </button>
        <span className="commentary-count">
          {commentaries.length} commentary updates
        </span>
      </div>
    </div>
  );
};

export default LiveCommentary;
