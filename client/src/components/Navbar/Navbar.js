import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { BsSearch, BsPerson, BsBell, BsGear, BsHeart, BsBoxArrowRight } from 'react-icons/bs';
import { useLanguage } from '../../context/LanguageContext';


const Navbar = () => {
  const {t} = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const dropdownRef = useRef(null);
  
  const [user, setUser] = useState(() => {
    // Get user data from localStorage or use default
    const savedUser = localStorage.getItem('loggedInUser');
    console.log('Checking localStorage for user:', savedUser);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('Found user data:', userData);
      return {
        name: userData.name || 'User',
        email: userData.email || 'user@example.com',
        joinDate: userData.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        role: 'Cricket Fan',
        favoriteTeams: ['RCB', 'CSK', 'MI']
      };
    }
    console.log('No user found in localStorage, using guest');
    return {
      name: 'Guest User',
      email: 'guest@example.com',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      role: 'Cricket Fan',
      favoriteTeams: ['RCB', 'CSK', 'MI']
    };
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('loggedInUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(prev => ({
          ...prev,
          name: userData.name || 'User',
          email: userData.email || 'user@example.com',
          joinDate: userData.joinDate || prev.joinDate
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleStorageChange);
    
    // Check on mount
    handleStorageChange();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleStorageChange);
    };
  }, []);

  const menuItems = [
  { path: '/', label: t('home') },
  { path: '/live-matches', label: t('liveMatches') },
  { path: '/teams', label: t('teams') },
  { path: '/players', label: t('players') },
  { path: '/statistics', label: t('statistics') },
  { path: '/admin', label: t('admin') },
  { path: '/notifications', label: '🔔 Notifications' },
  { path: '/highlights', label: t('highlights') },
];
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setMenuOpen(false); 
    }
  };

  const handleProfileClick = () => {
    setProfileDropdown(!profileDropdown);
  };

  // Test function to simulate user login (for testing purposes)
  const simulateUserLogin = (userName, userEmail) => {
    const userData = {
      name: userName,
      email: userEmail,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    
    // Update state immediately
    setUser(prev => ({
      ...prev,
      name: userName,
      email: userEmail,
      joinDate: userData.joinDate
    }));
    
    console.log('Simulated login for:', userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser({
      name: 'Guest User',
      email: 'guest@example.com',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      role: 'Cricket Fan',
      favoriteTeams: ['RCB', 'CSK', 'MI']
    });
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        
        <div className="logo" onClick={() => navigate('/')}>
          🏏 CricNova
        </div>

      
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <BsSearch />
          </button>
          {/* Temporary test button - remove in production */}
          <button 
            onClick={() => simulateUserLogin('awan ibrahim', 'awanibrahim200182@gmail.com')}
            style={{
              marginLeft: '10px',
              padding: '8px 12px',
              background: '#009270',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Test Login
          </button>
        </div>

        
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false); 
              }}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="profile-section">
          <div className="profile-container" onClick={handleProfileClick}>
            <div className="profile-avatar">
              <BsPerson />
            </div>
            {notifications > 0 && (
              <div className="notification-badge">
                {notifications}
              </div>
            )}
          </div>
          
          {profileDropdown && (
            <div className="profile-dropdown" ref={dropdownRef}>
              <div className="dropdown-header">
                <div className="dropdown-user-info">
                  <div className="dropdown-name">{user.name}</div>
                  <div className="dropdown-email">{user.email}</div>
                </div>
              </div>
              
              <div className="dropdown-menu-items">
                <div className="dropdown-item" onClick={() => {navigate('/profile'); setProfileDropdown(false);}}>
                  <BsPerson className="dropdown-icon" />
                  <span>My Profile</span>
                </div>
                
                <div className="dropdown-item" onClick={() => {navigate('/notifications'); setProfileDropdown(false);}}>
                  <BsBell className="dropdown-icon" />
                  <span>Notifications</span>
                  {notifications > 0 && (
                    <span className="notification-count">{notifications}</span>
                  )}
                </div>
                
                <div className="dropdown-item" onClick={() => {navigate('/favorites'); setProfileDropdown(false);}}>
                  <BsHeart className="dropdown-icon" />
                  <span>Favorite Teams</span>
                </div>
                
                <div className="dropdown-item" onClick={() => {navigate('/settings'); setProfileDropdown(false);}}>
                  <BsGear className="dropdown-icon" />
                  <span>Settings</span>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-item logout-item" onClick={() => {logout(); setProfileDropdown(false);}}>
                  <BsBoxArrowRight className="dropdown-icon" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;