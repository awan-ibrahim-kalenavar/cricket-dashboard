import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';
import './Players.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Players = () => {
  const { t, language } = useLanguage();

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError(null);

      const mockPlayers = [
        {
          id: 1,
          name: {
            en: 'Virat Kohli',
            hi: 'विराट कोहली',
            kn: 'ವಿರಾಟ್ ಕೊಹ್ಲಿ'
          },
          team: {
            en: 'Royal Challengers Bangalore',
            hi: 'रॉयल चैलेंजर्स बैंगलोर',
            kn: 'ರಾಯಲ್ ಚಾಲೆಂಜರ್ಸ್ ಬೆಂಗಳೂರು'
          },
          role: 'Batsman',
          country: {
            en: 'India',
            hi: 'भारत',
            kn: 'ಭಾರत'
          },
          totalRuns: 7263,
          strikeRate: 130.73,
          battingAverage: 37.39,
          highestScore: 183,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Virat_Kohli_in_PMO_New_Delhi.jpg/250px-Virat_Kohli_in_PMO_New_Delhi.jpg',
          age: 35,
          born: 'November 5, 1988',
          birthPlace: 'Delhi, India',
          battingStyle: 'Right-handed',
          bowlingStyle: 'Right-arm medium',
          matches: 237,
          centuries: 7,
          halfCenturies: 50,
          catches: 102,
          description: 'Virat Kohli is one of the greatest batsmen in modern cricket. He is known for his consistency, aggressive batting style, and exceptional fitness. Kohli has numerous records to his name including the fastest player to reach 8,000, 9,000, 10,000, 11,000, and 12,000 runs in ODI cricket.'
        },
        {
          id: 2,
          name: {
            en: 'MS Dhoni',
            hi: 'एमएस धोनी',
            kn: 'ಎಂಎಸ್ ಧೋನಿ'
          },
          team: {
            en: 'Chennai Super Kings',
            hi: 'चेन्नई सुपर किंग्स',
            kn: 'ಚೆನ್ನೈ ಸೂಪರ್ ಕಿಂಗ್ಸ್'
          },
          role: 'Wicket Keeper',
          country: {
            en: 'India',
            hi: 'भारत',
            kn: 'ಭಾರತ'
          },
          totalRuns: 5082,
          strikeRate: 135.2,
          battingAverage: 39.09,
          highestScore: 84,
          photo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrMxI97-lD1SEgrmETUpLa6dYpqmZ5voRnbA&s',
          age: 42,
          born: 'July 7, 1981',
          birthPlace: 'Ranchi, Bihar (now Jharkhand), India',
          battingStyle: 'Right-handed',
          bowlingStyle: 'Right-arm medium',
          matches: 250,
          centuries: 0,
          halfCenturies: 24,
          catches: 234,
          stumpings: 42,
          description: 'Mahendra Singh Dhoni, commonly known as MS Dhoni, is one of the most successful captains in cricket history. Known as "Captain Cool," Dhoni led India to victory in the 2007 ICC World Twenty20, 2011 ICC Cricket World Cup, and 2013 ICC Champions Trophy. He is famous for his calm demeanor, helicopter shot, and exceptional finishing abilities.'
        },
        {
          id: 3,
          name: {
            en: 'Jasprit Bumrah',
            hi: 'जसप्रीत बुमराह',
            kn: 'ಜಸ್ಪ್ರೀತ್ ಬುಮ್ರಾ'
          },
          team: {
            en: 'Mumbai Indians',
            hi: 'मुंबई इंडियंस',
            kn: 'ಮುಂಬೈ ಇಂಡಿಯನ್ಸ್'
          },
          role: 'Fast Bowler',
          country: {
            en: 'India',
            hi: 'भारत',
            kn: 'ಭಾರತ'
          },
          totalRuns: 145,
          strikeRate: 98.64,
          bowlingAverage: 21.91,
          economy: 6.78,
          wickets: 145,
          photo: 'https://documents.iplt20.com/ipl/IPLHeadshot2025/9.png'
        },
        {
          id: 4,
          name: {
            en: 'Ravindra Jadeja',
            hi: 'रवींद्र जडेजा',
            kn: 'ರವೀಂದ್ರ ಜಡೇಜಾ'
          },
          team: {
            en: 'Chennai Super Kings',
            hi: 'चेन्नई सुपर किंग्स',
            kn: 'ಚೆನ್ನೈ ಸೂಪರ್ ಕಿಂಗ್ಸ್'
          },
          role: 'All-rounder',
          country: {
            en: 'India',
            hi: 'भारत',
            kn: 'ಭಾರತ'
          },
          totalRuns: 2345,
          strikeRate: 125.89,
          battingAverage: 26.45,
          bowlingAverage: 32.15,
          economy: 7.89,
          wickets: 188,
          photo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhI43UgDPgKAUV-7NKyRan2KW8V6jZqQCFQ&s'
        }
      ];

      setPlayers(mockPlayers);
    } catch (err) {
      setError(t('failedToFetchPlayers'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(selectedPlayer?.id === player.id ? null : player);
  };

  const handleViewDetails = (player) => {
    setSelectedPlayer(player);
    setShowPlayerDetails(true);
  };

  const handleCloseDetails = () => {
    setShowPlayerDetails(false);
    setSelectedPlayer(null);
  };

  const battingChartData = {
    labels: players.map((p) => p.name[language]),
    datasets: [
      {
        label: t('totalRuns'),
        data: players.map((p) => p.totalRuns || 0),
        backgroundColor: 'rgba(25,118,210,0.6)'
      },
      {
        label: t('battingAverage'),
        data: players.map((p) => p.battingAverage || 0),
        backgroundColor: 'rgba(54,162,235,0.6)'
      }
    ]
  };

  const bowlingChartData = {
    labels: players.map((p) => p.name[language]),
    datasets: [
      {
        label: t('wickets'),
        data: players.map((p) => p.wickets || 0),
        backgroundColor: 'rgba(255,99,132,0.6)'
      },
      {
        label: t('economyRate'),
        data: players.map((p) => p.economy || 0),
        backgroundColor: 'rgba(75,192,192,0.6)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: t('playerStatistics')
      }
    }
  };

  return (
    <div className="players">
      <div className="page-header">
        <h1 className="page-title">👤 {t('playerStatistics')}</h1>
      </div>

      {error && <div className="error-message">❌ {error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('loadingPlayerStats')}...</p>
        </div>
      ) : (
        <div className="players-container">
          <div className="tabs">
            <button
              className={`tab ${tabValue === 0 ? 'active' : ''}`}
              onClick={() => setTabValue(0)}
            >
              📊 {t('battingStatistics')}
            </button>

            <button
              className={`tab ${tabValue === 1 ? 'active' : ''}`}
              onClick={() => setTabValue(1)}
            >
              🎯 {t('bowlingStatistics')}
            </button>
          </div>

          <div className="players-grid">
            {players.map((player) => (
              <div
                key={player.id}
                className={`player-card ${
                  selectedPlayer?.id === player.id ? 'selected' : ''
                }`}
                onClick={() => handlePlayerClick(player)}
              >
                <div className="player-header">
                  <div className="player-photo">
                    <img
                      src={player.photo}
                      alt={player.name[language]}
                      className="player-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          player.name[language]
                        )}&background=1976d2&color=fff`;
                      }}
                    />
                  </div>

                  <div className="player-info">
                    <h3 className="player-name">{player.name[language]}</h3>

                    <p className="player-role">
                      {t(
                        player.role
                          .toLowerCase()
                          .replace(/\s+/g, '')
                          .replace('-', '')
                      )}
                    </p>

                    <p className="player-country">
                      {player.country[language]}
                    </p>

                    <p className="player-team">
                      {player.team[language]}
                    </p>
                  </div>
                </div>

                <div className="player-stats">
                  <div className="stat-item">
                    <span>{t('runs')}:</span>
                    <span>{player.totalRuns}</span>
                  </div>

                  {player.battingAverage && (
                    <div className="stat-item">
                      <span>{t('average')}:</span>
                      <span>{player.battingAverage}</span>
                    </div>
                  )}

                  <div className="stat-item">
                    <span>{t('strikeRate')}:</span>
                    <span>{player.strikeRate}</span>
                  </div>

                  {player.highestScore && (
                    <div className="stat-item">
                      <span>{t('highest')}:</span>
                      <span>{player.highestScore}</span>
                    </div>
                  )}
                </div>

                <div className="player-actions">
                  <button
                    className="view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(player);
                    }}
                  >
                    {t('viewDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tabValue === 0 && (
            <div className="chart-section">
              <h2>{t('battingStatistics')}</h2>
              <Bar data={battingChartData} options={chartOptions} />
            </div>
          )}

          {tabValue === 1 && (
            <div className="chart-section">
              <h2>{t('bowlingStatistics')}</h2>
              <Bar data={bowlingChartData} options={chartOptions} />
            </div>
          )}

          {/* Player Details Modal */}
          {showPlayerDetails && selectedPlayer && (
            <div className="player-details-modal">
              <div className="modal-overlay" onClick={handleCloseDetails}></div>
              <div className="modal-content">
                <div className="modal-header">
                  <h2>{selectedPlayer.name[language]} - Player Details</h2>
                  <button className="close-btn" onClick={handleCloseDetails}>×</button>
                </div>
                
                <div className="player-detail-content">
                  <div className="player-detail-photo">
                    <img
                      src={selectedPlayer.photo}
                      alt={selectedPlayer.name[language]}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          selectedPlayer.name[language]
                        )}&background=1976d2&color=fff&size=200`;
                      }}
                    />
                  </div>
                  
                  <div className="player-detail-info">
                    <div className="detail-section">
                      <h3>Personal Information</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Full Name:</strong> {selectedPlayer.name[language]}
                        </div>
                        <div className="info-item">
                          <strong>Age:</strong> {selectedPlayer.age} years
                        </div>
                        <div className="info-item">
                          <strong>Born:</strong> {selectedPlayer.born}
                        </div>
                        <div className="info-item">
                          <strong>Birth Place:</strong> {selectedPlayer.birthPlace}
                        </div>
                        <div className="info-item">
                          <strong>Country:</strong> {selectedPlayer.country[language]}
                        </div>
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h3>Cricket Information</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Team:</strong> {selectedPlayer.team[language]}
                        </div>
                        <div className="info-item">
                          <strong>Role:</strong> {selectedPlayer.role}
                        </div>
                        <div className="info-item">
                          <strong>Batting Style:</strong> {selectedPlayer.battingStyle}
                        </div>
                        <div className="info-item">
                          <strong>Bowling Style:</strong> {selectedPlayer.bowlingStyle}
                        </div>
                        <div className="info-item">
                          <strong>Matches:</strong> {selectedPlayer.matches}
                        </div>
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h3>Performance Statistics</h3>
                      <div className="stats-grid">
                        <div className="stat-box">
                          <div className="stat-value">{selectedPlayer.totalRuns}</div>
                          <div className="stat-label">Total Runs</div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-value">{selectedPlayer.battingAverage || selectedPlayer.bowlingAverage}</div>
                          <div className="stat-label">Average</div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-value">{selectedPlayer.strikeRate}</div>
                          <div className="stat-label">Strike Rate</div>
                        </div>
                        <div className="stat-box">
                          <div className="stat-value">{selectedPlayer.highestScore}</div>
                          <div className="stat-label">Highest Score</div>
                        </div>
                        {selectedPlayer.centuries !== undefined && (
                          <div className="stat-box">
                            <div className="stat-value">{selectedPlayer.centuries}</div>
                            <div className="stat-label">Centuries</div>
                          </div>
                        )}
                        {selectedPlayer.halfCenturies !== undefined && (
                          <div className="stat-box">
                            <div className="stat-value">{selectedPlayer.halfCenturies}</div>
                            <div className="stat-label">Half Centuries</div>
                          </div>
                        )}
                        {selectedPlayer.catches !== undefined && (
                          <div className="stat-box">
                            <div className="stat-value">{selectedPlayer.catches}</div>
                            <div className="stat-label">Catches</div>
                          </div>
                        )}
                        {selectedPlayer.stumpings !== undefined && (
                          <div className="stat-box">
                            <div className="stat-value">{selectedPlayer.stumpings}</div>
                            <div className="stat-label">Stumpings</div>
                          </div>
                        )}
                        {selectedPlayer.wickets !== undefined && (
                          <div className="stat-box">
                            <div className="stat-value">{selectedPlayer.wickets}</div>
                            <div className="stat-label">Wickets</div>
                          </div>
                        )}
                        {selectedPlayer.economy !== undefined && (
                          <div className="stat-box">
                            <div className="stat-value">{selectedPlayer.economy}</div>
                            <div className="stat-label">Economy</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h3>About</h3>
                      <p className="player-description">
                        {selectedPlayer.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Players;