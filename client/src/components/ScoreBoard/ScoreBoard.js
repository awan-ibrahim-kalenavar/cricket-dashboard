import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ scorecard }) => {
  console.log('ScoreBoard component received scorecard:', scorecard);
  
  if (!scorecard) {
    console.log('No scorecard data available');
    return (
      <div className="scoreboard-no-data">
        <h3>No scorecard data available</h3>
      </div>
    );
  }

  const battingStats = scorecard.batting || [];
  const bowlingStats = scorecard.bowling || [];

  return (
    <div className="scoreboard">
      <div className="scoreboard-section">
        <h2 className="scoreboard-title">Batting Scorecard</h2>
        <div className="scoreboard-table">
          <table>
            <thead>
              <tr className="table-header">
                <th>Batsman</th>
                <th>Runs</th>
                <th>Balls</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {battingStats.map((batsman, index) => (
                <tr key={index} className="table-row">
                  <td className="player-name">
                    <div>
                      <strong>{batsman.name}</strong>
                      {batsman.role && <span className="player-role">({batsman.role})</span>}
                    </div>
                  </td>
                  <td className="runs">{batsman.runs}</td>
                  <td className="balls">{batsman.balls}</td>
                  <td className="fours">{batsman.fours}</td>
                  <td className="sixes">{batsman.sixes}</td>
                  <td className="strike-rate">
                    {batsman.balls > 0 ? ((batsman.runs / batsman.balls) * 100).toFixed(2) : '0.00'}
                  </td>
                  <td className="status">
                    <span className={`status-badge ${batsman.status.toLowerCase()}`}>
                      {batsman.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="scoreboard-section">
        <h2 className="scoreboard-title">Bowling Scorecard</h2>
        <div className="scoreboard-table">
          <table>
            <thead>
              <tr className="table-header">
                <th>Bowler</th>
                <th>Overs</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>Maidens</th>
                <th>Economy</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {bowlingStats.map((bowler, index) => (
                <tr key={index} className="table-row">
                  <td className="player-name">
                    <div>
                      <strong>{bowler.name}</strong>
                      {bowler.role && <span className="player-role">({bowler.role})</span>}
                    </div>
                  </td>
                  <td className="overs">{bowler.overs}</td>
                  <td className="runs">{bowler.runs}</td>
                  <td className="wickets">{bowler.wickets}</td>
                  <td className="maidens">{bowler.maidens}</td>
                  <td className="economy">
                    {bowler.overs && parseFloat(bowler.overs) > 0 ? 
                      (bowler.runs / parseFloat(bowler.overs)).toFixed(2) : '0.00'
                    }
                  </td>
                  <td className="role">{bowler.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
