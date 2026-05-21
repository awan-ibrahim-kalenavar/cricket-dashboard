import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const savedUser = localStorage.getItem('loggedInUser');
    console.log('Profile: Checking localStorage for user:', savedUser);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('Profile: Found user data:', userData);
      setUser({
        ...userData,
        role: userData.role || 'Cricket Fan',
        favoriteTeams: userData.favoriteTeams || ['RCB', 'CSK', 'MI']
      });
    } else {
      console.log('Profile: No user found in localStorage');
    }
    setLoading(false);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    
    alert('Edit Profile feature coming soon!');
  };

  
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
          <h1 className="profile-title">My Profile</h1>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>

        <div className="profile-content">
        
          <div style={{
            background: '#f0f0f0',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            <strong>DEBUG INFO:</strong><br/>
            Current User: {JSON.stringify(user, null, 2)}<br/>
            localStorage: {localStorage.getItem('loggedInUser')}
          </div>

          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span className="avatar-text">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <h2 className="profile-name">{user?.name || 'User'}</h2>
            <p className="profile-email">{user?.email || 'user@example.com'}</p>
            <span className="profile-role">{user?.role || 'Cricket Fan'}</span>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label className="detail-label">Full Name</label>
                  <p className="detail-value">{user?.name || 'User'}</p>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Email Address</label>
                  <p className="detail-value">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Member Since</label>
                  <p className="detail-value">{user?.joinDate || 'Unknown'}</p>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Account Type</label>
                  <p className="detail-value">{user?.role || 'Cricket Fan'}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-title">Cricket Preferences</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label className="detail-label">Favorite Teams</label>
                  <div className="favorite-teams">
                    {(user?.favoriteTeams || ['RCB', 'CSK', 'MI']).map((team, index) => (
                      <span key={index} className="team-badge">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Match Notifications</label>
                  <p className="detail-value">Enabled</p>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Live Score Alerts</label>
                  <p className="detail-value">Enabled</p>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Newsletter</label>
                  <p className="detail-value">Subscribed</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-title">Account Activity</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label className="detail-label">Last Login</label>
                  <p className="detail-value">Today</p>
                </div>
                <div className="detail-item">
                  <label className="detail-label">Profile Views</label>
                  <p className="detail-value">12</p>
                </div>
                
                <div className="detail-item">
                  <label className="detail-label">Prediction Score</label>
                  <p className="detail-value">850 points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
