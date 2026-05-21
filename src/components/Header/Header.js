import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme.mode}`}>
      <div className="header-container">
        <div className="header-content">
          <h1 className='heading'>IPL Dashboard</h1>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
