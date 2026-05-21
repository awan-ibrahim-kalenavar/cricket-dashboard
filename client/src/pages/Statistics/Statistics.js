import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Statistics = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      
     
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError(t('failedToFetchStats'))
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const matchStats = {
    totalMatches: 75,
    totalRuns: 12450,
    averageScore: 166,
    highestScore: 245,
    centuries: 45
  };

  const teamStats = {
    mumbaiIndians: { wins: 45, losses: 30},
    chennaiSuperKings: { wins: 38, losses: 37},
    royalChallengers: { wins: 42, losses: 33}
  };

  const playerStats = {
    topRunScorer: { name: 'Virat Kohli', runs: 7263, average: 52.3 },
    topWicketTaker: { name: 'Jasprit Bumrah', wickets: 145, average: 21.5 },
    mostSixes: { name: 'Chris Gayle', sixes: 355, season: '2019' }
  };

  const performanceData = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'Mumbai Indians',
        data: [45, 52, 48, 55, 58],
        borderColor: 'rgb(25, 118, 210)',
        backgroundColor: 'rgba(25, 118, 210, 0.6)',
      },
      {
        label: 'Chennai Super Kings',
        data: [38, 42, 45, 40, 35],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Royal Challengers Bangalore',
        data: [42, 38, 45, 50, 48],
        borderColor: 'rgb(255, 139, 7)',
        backgroundColor: 'rgba(196, 76, 21, 0.6)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Team Performance',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  const pieData = {
    labels: ['Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bangalore', 'Others'],
    datasets: [
      {
        data: [45, 38, 42, 15],
        backgroundColor: [
          'rgba(25, 118, 210, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 193, 7, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderWidth: 2
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Title Distribution',
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="statistics">
      <div className="page-header">
        <h1 className="page-title">
          📊 {t('cricketStatistics')}
        </h1>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('loadingStatistics')}...</p>
        </div>
      ) : (
        <div className="stats-container">
          <div className="tabs">
            <button 
              className={`tab ${tabValue === 0 ? 'active' : ''}`}
              onClick={() => setTabValue(0)}
            >
              📈 {t('matchStats')}
            </button>
            <button 
              className={`tab ${tabValue === 1 ? 'active' : ''}`}
              onClick={() => setTabValue(1)}
            >
              👥 {t('teamStats')}
            </button>
            <button 
              className={`tab ${tabValue === 2 ? 'active' : ''}`}
              onClick={() => setTabValue(2)}
            >
              👤 {t('playerStats')}
            </button>
          </div>

          {tabValue === 0 && (
            <div className="stats-grid">
              <div className="stat-card">
                <h2 className="stat-title">{t('matchStatistics')}</h2>
                <div className="stat-item">
                  <span className="stat-label">{t('totalMatches')}:</span>
                  <span className="stat-value">{matchStats.totalMatches}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Runs:</span>
                  <span className="stat-value">{matchStats.totalRuns}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Average Score:</span>
                  <span className="stat-value">{matchStats.averageScore}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Highest Score:</span>
                  <span className="stat-value">{matchStats.highestScore}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Centuries:</span>
                  <span className="stat-value">{matchStats.centuries}</span>
                </div>
              </div>
            </div>
          )}

          {tabValue === 1 && (
            <div className="stats-grid">
              <div className="stat-card">
                <h2 className="stat-title">Team Performance</h2>
                <div className="team-stats">
                  {Object.entries(teamStats).map(([team, stats]) => (
                    <div key={team} className="team-stat">
                      <h3 className="team-name">{team.replace(/([A-Z])/g, ' $1').replace(/([a-z])/g, (match) => match.toUpperCase())}</h3>
                      <div className="team-stats-grid">
                        <div className="stat-item">
                          <span className="stat-label">Wins:</span>
                          <span className="stat-value">{stats.wins}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Losses:</span>
                          <span className="stat-value">{stats.losses}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Titles:</span>
                          <span className="stat-value">{stats.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabValue === 2 && (
            <div className="stats-grid">
              <div className="stat-card">
                <h2 className="stat-title">Player Performance</h2>
                <div className="player-stats">
                  <div className="player-stat">
                    <h3 className="player-title">🏏 Top Run Scorer</h3>
                    <div className="player-details">
                      <p className="player-name">{playerStats.topRunScorer.name}</p>
                      <p className="player-stat">Runs: {playerStats.topRunScorer.runs}</p>
                      <p className="player-stat">Average: {playerStats.topRunScorer.average}</p>
                    </div>
                  </div>
                  <div className="player-stat">
                    <h3 className="player-title">🎯 Top Wicket Taker</h3>
                    <div className="player-details">
                      <p className="player-name">{playerStats.topWicketTaker.name}</p>
                      <p className="player-stat">Wickets: {playerStats.topWicketTaker.wickets}</p>
                      <p className="player-stat">Average: {playerStats.topWicketTaker.average}</p>
                    </div>
                  </div>
                  <div className="player-stat">
                    <h3 className="player-title">💥 Most Sixes</h3>
                    <div className="player-details">
                      <p className="player-name">{playerStats.mostSixes.name}</p>
                      <p className="player-stat">Sixes: {playerStats.mostSixes.sixes}</p>
                      <p className="player-stat">Season: {playerStats.mostSixes.season}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="chart-section">
            <h2 className="chart-title">Team Performance Chart</h2>
            <div className="chart-container">
              <Line data={performanceData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-section">
            <h2 className="chart-title">Team Performance</h2>
            <div className="chart-container">
              <Doughnut data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
