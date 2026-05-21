import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './PlayerCard.css';

// Props explanation:
// - player: Object containing player information
// - showStats: Boolean to show/hide detailed stats
// - onClick: Function to handle card clicks
const PlayerCard = ({ 
  player, 
  showStats = false, 
  onClick = () => {} 
}) => {
  const { theme } = useTheme();

  return (
    <div className={`player-card ${theme.mode}`}>
      <div className="player-header">
        <div className="player-info">
          <h3 className="player-name">{player.name}</h3>
          <div className="player-details">
            <span className="player-role">{player.role}</span>
            <span className="player-country">{player.country}</span>
          </div>
        </div>
        <div className="player-avatar">
          <span className="avatar-text">
            {player.name.split(' ').map(n => n[0]).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Conditional rendering based on showStats prop */}
      {showStats ? (
        <div className="player-stats">
          <div className="stat-row">
            <span className="stat-label">Total Runs:</span>
            <span className="stat-value">{player.totalRuns || 0}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Strike Rate:</span>
            <span className="stat-value">{player.strikeRate || '0.00'}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Average:</span>
            <span className="stat-value">{player.battingAverage || '0.00'}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Highest Score:</span>
            <span className="stat-value">{player.highestScore || 0}</span>
          </div>
        </div>
      ) : (
        <div className="player-summary">
          <p>{player.role} from {player.country}</p>
        </div>
      )}

      <div className="player-actions">
        <button 
          onClick={() => onClick(player)}
          className="view-details-btn"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
