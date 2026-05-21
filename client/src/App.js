import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';



const AppContent = () => {
  const location = useLocation();


  const [viewMode, setViewMode] = useState("desktop");

  const showNavbarRoutes = [
    '/home',
    '/live-matches',
    '/teams',
    '/players',
    '/statistics',
    '/admin',
    '/profile'
  ];

  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div className={`app ${viewMode}`}>
      

      <div className="view-toggle">
        <button
          className={viewMode === "desktop" ? "active" : ""}
          onClick={() => setViewMode("desktop")}
        >
          🖥️
        </button>

        <button
          className={viewMode === "mobile" ? "active" : ""}
          onClick={() => setViewMode("mobile")}
        >
          📱
        </button>
      </div>

    
      <Header />

   
      {shouldShowNavbar && <Navbar />}

      <main>
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;