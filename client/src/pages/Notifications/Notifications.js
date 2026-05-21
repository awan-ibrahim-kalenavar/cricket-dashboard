import React, { useState, useEffect } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [stats, setStats] = useState(null);
  const [testNotification, setTestNotification] = useState({ userId: '', type: 'matchReminder' });

  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    preferences: {
      email: true,
      sms: false,
      whatsapp: false,
      matchReminders: true,
      liveAlerts: true,
      resultAlerts: true
    }
  });

  // Fetch users and stats
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [usersResponse, statsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/users'),
        fetch('http://localhost:5000/api/users/stats')
      ]);

      const usersData = await usersResponse.json();
      const statsData = await statsResponse.json();

      if (usersData.success) {
        setUsers(usersData.data);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }

    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddUser(false);
        setNewUser({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          preferences: {
            email: true,
            sms: false,
            whatsapp: false,
            matchReminders: true,
            liveAlerts: true,
            resultAlerts: true
          }
        });
        fetchData(); // Refresh data
      } else {
        setError(data.message || 'Failed to create user');
      }

    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    }
  };

  // Send test notification
  const sendTestNotification = async () => {
    if (!testNotification.userId) {
      setError('Please select a user');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${testNotification.userId}/test-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: testNotification.type }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Test notification sent! Results: ${JSON.stringify(data.results, null, 2)}`);
      } else {
        setError(data.message || 'Failed to send test notification');
      }

    } catch (err) {
      setError('Failed to send test notification');
      console.error(err);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchData(); // Refresh data
      } else {
        setError(data.message || 'Failed to delete user');
      }

    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="notifications-container">
        <div className="loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>🔔 Notification Management</h1>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddUser(true)}
        >
          ➕ Add User
        </button>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{stats.emailUsers}</h3>
            <p>Email Enabled</p>
          </div>
          <div className="stat-card">
            <h3>{stats.smsUsers}</h3>
            <p>SMS Enabled</p>
          </div>
          <div className="stat-card">
            <h3>{stats.whatsappUsers}</h3>
            <p>WhatsApp Enabled</p>
          </div>
        </div>
      )}

      {/* Test Notification */}
      <div className="test-notification">
        <h2>🧪 Send Test Notification</h2>
        <div className="test-form">
          <select 
            value={testNotification.userId}
            onChange={(e) => setTestNotification({...testNotification, userId: e.target.value})}
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          
          <select 
            value={testNotification.type}
            onChange={(e) => setTestNotification({...testNotification, type: e.target.value})}
          >
            <option value="matchReminder">Match Reminder</option>
            <option value="matchStarted">Match Started</option>
            <option value="wicketAlert">Wicket Alert</option>
            <option value="matchResult">Match Result</option>
          </select>
          
          <button onClick={sendTestNotification}>
            📤 Send Test
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="users-section">
        <h2>👥 Users ({users.length})</h2>
        
        {users.length === 0 ? (
          <div className="no-users">
            <p>No users found. Add your first user to start sending notifications!</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map(user => (
              <div key={user._id} className="user-card">
                <div className="user-header">
                  <h3>{user.name}</h3>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="user-info">
                  <p>📧 {user.email}</p>
                  {user.phone && <p>📱 {user.phone}</p>}
                  {user.whatsapp && <p>💬 {user.whatsapp}</p>}
                </div>
                
                <div className="user-preferences">
                  <h4>Preferences:</h4>
                  <div className="preference-tags">
                    {user.preferences.email && <span className="tag email">Email</span>}
                    {user.preferences.sms && <span className="tag sms">SMS</span>}
                    {user.preferences.whatsapp && <span className="tag whatsapp">WhatsApp</span>}
                    {user.preferences.matchReminders && <span className="tag reminder">Reminders</span>}
                    {user.preferences.liveAlerts && <span className="tag live">Live</span>}
                    {user.preferences.resultAlerts && <span className="tag result">Results</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>➕ Add New User</h2>
              <button onClick={() => setShowAddUser(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>
              
              <div className="form-group">
                <label>WhatsApp</label>
                <input
                  type="tel"
                  value={newUser.whatsapp}
                  onChange={(e) => setNewUser({...newUser, whatsapp: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>
              
              <div className="form-group">
                <label>Notification Preferences</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newUser.preferences.email}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        preferences: {...newUser.preferences, email: e.target.checked}
                      })}
                    />
                    Email Notifications
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      checked={newUser.preferences.sms}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        preferences: {...newUser.preferences, sms: e.target.checked}
                      })}
                    />
                    SMS Notifications
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      checked={newUser.preferences.whatsapp}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        preferences: {...newUser.preferences, whatsapp: e.target.checked}
                      })}
                    />
                    WhatsApp Notifications
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      checked={newUser.preferences.matchReminders}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        preferences: {...newUser.preferences, matchReminders: e.target.checked}
                      })}
                    />
                    Match Reminders
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      checked={newUser.preferences.liveAlerts}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        preferences: {...newUser.preferences, liveAlerts: e.target.checked}
                      })}
                    />
                    Live Match Alerts
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      checked={newUser.preferences.resultAlerts}
                      onChange={(e) => setNewUser({
                        ...newUser,
                        preferences: {...newUser.preferences, resultAlerts: e.target.checked}
                      })}
                    />
                    Match Results
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddUser(false)}>
                  Cancel
                </button>
                <button type="submit">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
