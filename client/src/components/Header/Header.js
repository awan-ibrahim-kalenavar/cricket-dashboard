import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import './Header.css';

const Header = () => {
  const { t } = useLanguage();
  const [darkMode, setDarkMode] = useState(() => {

    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });


  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
      <div className="header-container">
        <div className="header-content">
        
          <div className="header-controls">
            <LanguageSelector />
            <button 
              className="header-theme-toggle"
              onClick={toggleDarkMode}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
