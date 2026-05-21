import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      id: 1,
      icon: '📺',
      title: t('liveMatches'),
      description: t('liveMatchesDescription'),
      path: '/live-matches',
      color: '#FF6B6B'
    },
    {
      id: 2,
      icon: '📊',
      title: t('matchScorecards'),
      description: t('matchScorecardsDescription'),
      path: '/scorecard',
      color: '#4ECDC4'
    },
    {
      id: 3,
      icon: '👥',
      title: t('teams'),
      description: t('teamsDescription'),
      path: '/teams',
      color: '#45B7D1'
    },
    {
      id: 4,
      icon: '👤',
      title: t('players'),
      description: t('playersDescription'),
      path: '/players',
      color: '#96CEB4'
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home">

    
      <div className="features-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="feature-card"
            onClick={() => handleNavigate(feature.path)}
            style={{ borderColor: feature.color }}
          >
            <div
              className="feature-icon"
              style={{ color: feature.color }}
            >
              {feature.icon}
            </div>

            <h3 className="feature-title">
              {feature.title}
            </h3>

            <p className="feature-description">
              {feature.description}
            </p>

            <button
              className="feature-button"
              style={{ backgroundColor: feature.color }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent double click bubbling
                handleNavigate(feature.path);
              }}
            >
              {t('explore')}
            </button>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <div className="cta-card">
          <h2 className="cta-title">
            📈 {t('realTimeCricketData')}
          </h2>

          <p className="cta-description">
            {t('realTimeCricketDataDescription')}
          </p>

          <button
            className="cta-button"
            onClick={() => handleNavigate('/live-matches')}
          >
            📺 {t('viewLiveMatches')}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;