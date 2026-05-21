import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchCard.css';

// Props Explanation: match is an object containing match data
const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleViewScorecard = () => {
    navigate(`/scorecard/${match.id}`);
  };

  // Sample live video URLs (in production, these would come from the match data)
  const getLiveVideoUrl = (matchId) => {
    const videoUrls = {
      'match1': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample video
      'match2': 'https://www.youtube.com/embed/ScMzIvxBSi4', // Sample video
      'match3': 'https://www.youtube.com/embed/LXb3EKWsInQ', // Sample video
      'match4': 'https://www.youtube.com/embed/9bZkp7q19f0'  // Sample video
    };
    return videoUrls[matchId] || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  };

  return (
    <div className={`match-card ${match.status === 'live' ? 'live-match' : ''}`}>
      {/* Match Header with venue and type */}
      <div className="match-header">
        <div className="match-info">
          {/* Conditional rendering - show LIVE indicator only for live matches */}
          {match.status === 'live' && (
            <span className="live-chip">
              <span className="live-icon">🔴</span>
              LIVE
            </span>
          )}
          <span className="match-venue">{match.venue}</span>
          <span className="match-type">{match.matchType}</span>
        </div>
      </div>
      
      {/* Teams Section - displays both teams */}
      <div className="match-teams">
        <div className="team">
          <h3 className="team-name">{match.team1.name}</h3>
          <p className="team-score">{match.team1.score}</p>
          <p className="team-overs">{match.team1.overs} overs</p>
        </div>
        
        <div className="vs-divider">VS</div>
        
        <div className="team">
          <h3 className="team-name">{match.team2.name}</h3>
          <p className="team-score">{match.team2.score}</p>
          <p className="team-overs">{match.team2.overs} overs</p>
        </div>
      </div>
      
      {/* Match Result */}
      <div className="match-result">
        <p>{match.result}</p>
      </div>
      
      {/* Live Video Section - Only for live matches */}
      {match.status === 'live' && (
        <div className="live-video-section">
          <div className="video-header">
            <h4>📺 Live Stream</h4>
          </div>
          
          <div className="video-container">
            <iframe
              src={getLiveVideoUrl(match.id)}
              title={`${match.team1.name} vs ${match.team2.name} Live Stream`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="live-video-iframe"
            />
            <div className="video-overlay">
              <div className="live-indicator-video">
                <span className="live-dot"></span>
                LIVE
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Action Button */}
      <div className="match-actions">
        <button onClick={handleViewScorecard} className="view-scorecard-btn">
          View Scorecard
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
