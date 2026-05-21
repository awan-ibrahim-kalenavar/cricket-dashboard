import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div className="language-selector">
      <div className="language-dropdown">
        <button className="language-button">
          <span className="current-language">
            {availableLanguages.find(lang => lang.code === language)?.flag} {' '}
            {availableLanguages.find(lang => lang.code === language)?.name}
          </span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        <div className="language-options">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
