import React, { createContext, useContext, useState, useEffect } from 'react';

// Language translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    liveMatches: 'Live Matches',
    liveCricketMatches: 'Live Cricket Matches',
    refresh: 'Refresh',
    lastUpdated: 'Last updated',
    loadingStatistics: 'Loading statistics',
    cricketStatistics: 'Cricket Statistics',
    matchStats: 'Match Stats',
    teamStats: 'Team Stats',
    playerStats: 'Player Statistics',
    matchStatistics: 'Match Statistics',
    totalMatches: 'Total Matches',
    totalTeams: 'Total Teams',
    totalPlayers: 'Total Players',
    add: 'Add',
    delete: 'Delete',
    manageTeams: 'Manage Teams',
    managePlayers: 'Manage Players',
    team1: 'Team 1',
    team2: 'Team 2',
    playerName: 'Player Name',
    selectedTeam: 'Selected Team',
    none: 'None',
    playersCount: 'Players Count',
    menu: 'Menu',
    failedToFetchStats: 'Failed to fetch statistics. Please try again.',
    recentCompletedMatches: 'Recent Completed Matches',
    noMatchesAvailable: 'No matches currently available',
    checkBackLater: 'Please check back later for live matches',
    teams: 'Teams',
    iplTeams: 'IPL Teams',
    loadingTeams: 'Loading teams',
    players: 'Players',
    statistics: 'Statistics',
    admin: 'Admin',
    search: 'Search...',

    failedToFetchPlayers: 'Failed to fetch players. Please try again.',
totalRuns: 'Total Runs',
battingAverage: 'Batting Average',
economyRate: 'Economy Rate',
viewDetails: 'View Details',
battingStatistics: 'Batting Statistics',
bowlingStatistics: 'Bowling Statistics',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    noData: 'No data available',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    
    // Teams
    teamName: 'Team Name',
    captain: 'Captain',
    coach: 'Coach',
    home: 'Home',
    founded: 'Founded',
    titles: 'Titles',
    title: 'Title',
    viewSquad: 'View Squad',
    players: 'Players',
    squad: 'Squad',
    
    // Players
    playerName: 'Player Name',
    role: 'Role',
    team: 'Team',
    matches: 'Matches',
    runs: 'Runs',
    wickets: 'Wickets',
    average: 'Average',
    strikeRate: 'Strike Rate',
    highest: 'Highest',
    // Player Roles
    batsman: 'Batsman',
    wicketkeeper: 'Wicket Keeper',
    allrounder: 'All-rounder',
    bowler: 'Bowler',
    fastbowler: 'Fast Bowler',
    
    // Live Matches
    live: 'LIVE',
    completed: 'COMPLETED',
    upcoming: 'UPCOMING',
    iplMatch: 'IPL Match',
    t20: 'T20',
    
    // Search
    searchResults: 'Search Results',
showingResultsFor: 'Showing results for',
details: 'Details',
completedMatches: 'Completed Matches',
upcomingMatches: 'Upcoming Matches',
noLiveMatches: 'No Live Matches',
noCompletedMatches: 'No Completed Matches',
noUpcomingMatches: 'No Upcoming Matches',
noResultsFound: 'No Results Found',
    
    // Login/Register
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    loginSuccess: 'Login successful!',
    invalidCredentials: 'Invalid Credentials',
    registerSuccess: 'Registration successful!',
    passwordsDoNotMatch: 'Passwords do not match',
    createAccount: 'CREATE ACCOUNT',
    enterYourName: 'Enter Your Name',
    enterEmail: 'Enter Email',
    enterPassword: 'Enter Password',
    
    // Home
    welcome: 'IPL Dashboard',
    subtitle: 'Get all the latest IPL updates, scores, team information, and player statistics in one place',
    features: 'Features',
    liveScores: 'Live Scores',
    teamInfo: 'Team Information',
    playerStats: 'Player Statistics',
    loadingPlayerStats: 'Loading player statistics',
    battingStats: 'Batting Stats',
    bowlingStats: 'Bowling Stats',
    getStarted: 'Get Started',
    explore: 'Explore',
    liveMatchesDescription: 'Watch live cricket matches with real-time scores and updates',
    matchScorecards: 'Match Scorecards',
    matchScorecardsDescription: 'Detailed scorecards with batting and bowling statistics',
    teamsDescription: 'Explore team information, squads, and performance stats',
    playersDescription: 'Player profiles, statistics, and performance analysis',
    realTimeCricketData: 'Real-Time Cricket Data',
    realTimeCricketDataDescription: 'Get instant access to live cricket matches, player statistics, and team performance metrics',
    viewLiveMatches: 'View Live Matches',
    
    // Admin
    dashboard: 'Dashboard',
    addMatch: 'Add Match',
    addTeam: 'Add Team',
    addPlayer: 'Add Player',
    manageData: 'Manage Data',
    
    // Statistics
    topRunScorers: 'Top Run Scorers',
    topWicketTakers: 'Top Wicket Takers',
    teamPerformance: 'Team Performance',
    playerPerformance: 'Player Performance'
  },
  
  hi: {
    // Navigation
    home: 'होम',
    liveMatches: 'लाइव मैच',
    liveCricketMatches: 'लाइव क्रिकेट मैच',
    refresh: 'रिफ्रेश',
    lastUpdated: 'अंतिम अपडेट',
    loadingStatistics: 'आँकड़े लोड हो रहे हैं...',
    cricketStatistics: 'क्रिकेट आँकड़े',
    matchStats: 'मैच आँकड़े',
    teamStats: 'टीम आँकड़े',
    playerStats: 'खिलाड़ी आँकड़े',
    matchStatistics: 'मैच आँकड़े',
    totalMatches: 'कुल मैच',
    totalTeams: 'कुल टीमें',
    totalPlayers: 'कुल खिलाड़ी',
    add: 'जोड़ें',
    delete: 'हटाएं',
    manageTeams: 'टीमें प्रबंधित करें',
    managePlayers: 'खिलाड़ियों का प्रबंधन करें',
    team1: 'टीम 1',
    team2: 'टीम 2',
    playerName: 'खिलाड़ी का नाम',
    selectedTeam: 'चयनित टीम',
    none: 'कोई नहीं',
    playersCount: 'खिलाड़ियों की संख्या',
    menu: 'मेन्यू',
    failedToFetchStats: 'आँकड़े लाने में विफल। कृपया फिर से कोशिश करें।',
    recentCompletedMatches: 'हाल ही में पूरे हुए मैच',
    noMatchesAvailable: 'वर्तमान में कोई मैच उपलब्ध नहीं',
    checkBackLater: 'लाइव मैच के लिए बाद में जांच करें',
    teams: 'टीमें',
    iplTeams: 'आईपीएल टीमें',
    loadingTeams: 'टीमें लोड हो रही हैं...',
    players: 'खिलाड़ी',
    statistics: 'आँकड़े',
    admin: 'एडमिन',
    search: 'खोजें...',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    noData: 'कोई डेटा उपलब्ध नहीं',
    retry: 'फिर से कोशिश करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    back: 'पीछे',
    next: 'अगला',
    previous: 'पिछला',
    
    // Teams
    teamName: 'टीम का नाम',
    captain: 'कप्तान',
    coach: 'कोच',
    home: 'घर',
    founded: 'स्थापित',
    titles: 'खिताब',
    title: 'खिताब',
    viewSquad: 'स्क्वाड देखें',
    players: 'खिलाड़ी',
    squad: 'स्क्वाड',
    
    // Players
    playerName: 'खिलाड़ी का नाम',
    role: 'भूमिका',
    team: 'टीम',
    matches: 'मैच',
    runs: 'रन',
    wickets: 'विकेट',
    average: 'औसत',
    strikeRate: 'स्ट्राइक रेट',
    highest: 'उच्चतम',
    // Player Roles
    batsman: 'बल्लेबाज़',
    wicketkeeper: 'विकेटकीपर',
    allrounder: 'ऑलराउंडर',
    bowler: 'गेंदबाज़',
    fastbowler: 'तेज़ गेंदबाज़',
    failedToFetchPlayers: 'खिलाड़ियों को लाने में विफल। कृपया पुनः प्रयास करें।',
totalRuns: 'कुल रन',
battingAverage: 'बैटिंग औसत',
economyRate: 'इकोनॉमी रेट',
viewDetails: 'विवरण देखें',
battingStatistics: 'बैटिंग आँकड़े',
bowlingStatistics: 'बॉलिंग आँकड़े',
    
    // Live Matches
    live: 'लाइव',
    completed: 'समाप्त',
    upcoming: 'आगामी',
    iplMatch: 'आईपीएल मैच',
    t20: 'टी20',
    
    // Search
    searchPlaceholder: 'टीमें, खिलाड़ी, मैच खोजें...',
    searchResults: 'खोज परिणाम',
    showingResults: 'के लिए परिणाम दिखा रहे हैं',
    noResults: 'कोई परिणाम नहीं मिला',
    teamDetails: 'टीम विवरण',
    
    // Login/Register
    login: 'लॉगिन',
    register: 'रजिस्टर',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    email: 'ईमेल',
    fullName: 'पूरा नाम',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    alreadyHaveAccount: 'पहले से ही खाता है?',
    dontHaveAccount: 'खाता नहीं है?',
    loginSuccess: 'लॉगिन सफल!',
    invalidCredentials: 'अमान्य क्रेडेंशियल्स',
    registerSuccess: 'रजिस्ट्रेशन सफल!',
    passwordsDoNotMatch: 'पासवर्ड मेल नहीं खाते',
    createAccount: 'खाता बनाएं',
    enterYourName: 'अपना नाम दर्ज करें',
    enterEmail: 'ईमेल दर्ज करें',
    enterPassword: 'पासवर्ड दर्ज करें',
    
    // Home
    welcome: 'आईपीएल डैशबोर्ड में आपका स्वागत है',
    subtitle: 'सभी नवीनतम आईपीएल अपडेट, स्कोर, टीम जानकारी और खिलाड़ी आँकड़े एक ही जगह पर प्राप्त करें',
    features: 'विशेषताएं',
    liveScores: 'लाइव स्कोर',
    teamInfo: 'टीम जानकारी',
    playerStats: 'खिलाड़ी आँकड़े',
    loadingPlayerStats: 'खिलाड़ी आँकड़े लोड हो रहे हैं...',
    battingStats: 'बल्लेबाजी आँकड़े',
    bowlingStats: 'गेंदबाजी आँकड़े',
    getStarted: 'शुरू करें',
    explore: 'एक्सप्लोर करें',
    liveMatchesDescription: 'रीयल-टाइम स्कोर और अपडेट के साथ लाइव क्रिकेट मैच देखें',
    matchScorecards: 'मैच स्कोरकार्ड',
    matchScorecardsDescription: 'बल्लेबाजी और गेंदबाजी आँकड़ों के साथ विस्तृत स्कोरकार्ड',
    teamsDescription: 'टीम की जानकारी, स्क्वाड और प्रदर्शन आँकड़ों का अन्वेषण करें',
    playersDescription: 'खिलाड़ी प्रोफाइल, आँकड़े और प्रदर्शन विश्लेषण',
    realTimeCricketData: 'रीयल-टाइम क्रिकेट डेटा',
    realTimeCricketDataDescription: 'लाइव क्रिकेट मैच, खिलाड़ी आँकड़ों और टीम प्रदर्शन मेट्रिक्स तक तत्काल पहुंच प्राप्त करें',
    viewLiveMatches: 'लाइव मैच देखें',
    
    // Admin
    dashboard: 'डैशबोर्ड',
    addMatch: 'मैच जोड़ें',
    addTeam: 'टीम जोड़ें',
    addPlayer: 'खिलाड़ी जोड़ें',
    manageData: 'डेटा प्रबंधित करें',
    
    // Statistics
    topRunScorers: 'शीर्ष रन स्कोरर',
    topWicketTakers: 'शीर्ष विकेट लेने वाले',
    teamPerformance: 'टीम प्रदर्शन',
    playerPerformance: 'खिलाड़ी प्रदर्शन'
  },
  
  kn: {
    // Navigation
    home: 'ಹೋಮ್',
    liveMatches: 'ಲೈವ್ ಪಂದ್ಯಗಳು',
    liveCricketMatches: 'ಲೈವ್ ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಗಳು',
    refresh: 'ರಿಫ್ರೆಶ್',
    lastUpdated: 'ಕೊನೆಯ ಅಪ್‌ಡೇಟ್',
    loadingStatistics: 'ಅಂಕಿಗಳು ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    cricketStatistics: 'ಕ್ರಿಕೆಟ್ ಅಂಕಿಗಳು',
    matchStats: 'ಪಂದ್ಯ ಅಂಕಿಗಳು',
    teamStats: 'ತಂಡ ಅಂಕಿಗಳು',
    playerStats: 'ಆಟಗಾರರ ಅಂಕಿಗಳು',
    matchStatistics: 'ಪಂದ್ಯ ಅಂಕಿಗಳು',
    totalMatches: 'ಒಟ್ಟು ಪಂದ್ಯಗಳು',
    totalTeams: 'ಒಟ್ಟು ತಂಡಗಳು',
    totalPlayers: 'ಒಟ್ಟು ಆಟಗಾರರು',
    add: 'ಸೇರಿಸಿ',
    delete: 'ಅಳಿಸಿ',
    manageTeams: 'ತಂಡಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
    managePlayers: 'ಆಟಗಾರರನ್ನು ನಿರ್ವಹಿಸಿ',
    team1: 'ತಂಡ 1',
    team2: 'ತಂಡ 2',
    playerName: 'ಆಟಗಾರನ ಹೆಸರು',
    selectedTeam: 'ಆಯ್ಕೆಂದ ತಂಡ',
    none: 'ಯಾವುದೇ ಇಲ್ಲ',
    playersCount: 'ಆಟಗಾರರ ಎಣಿಕೆ',
    menu: 'ಮೆನು',
    failedToFetchStats: 'ಅಂಕಿಗಳನ್ನು ತರುವಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    recentCompletedMatches: 'ಇತ್ತೀಚೆಣ ಪೂರ್ಣಗೊಂಡ ಪಂದ್ಯಗಳು',
    noMatchesAvailable: 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ಪಂದ್ಯಗಳು ಲಭ್ಯವಿಲ್ಲ',
    checkBackLater: 'ಲೈವ್ ಪಂದ್ಯಗಳಿಗಾಗಿ ನಂತರ ಪರಿಶೀಲಿಸಿ',
    teams: 'ತಂಡಗಳು',
    iplTeams: 'ಐಪಿಎಲ್ ತಂಡಗಳು',
    loadingTeams: 'ತಂಡಗಳು ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    players: 'ಆಟಗಾರರು',
    statistics: 'ಅಂಕಿಗಳು',
    admin: 'ಅಡ್ಮಿನ್',
    search: 'ಹುಡುಕಿ...',
    
    // Common
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    error: 'ದೋಷ',
    noData: 'ಯಾವುದೇ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ',
    retry: 'ಮರು ಪ್ರಯತ್ನಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    save: 'ಉಳಿಸಿ',
    delete: 'ಅಳಿಸಿ',
    edit: 'ಸಂಪಾದಿಸಿ',
    view: 'ನೋಡಿ',
    back: '�ಿಂದೆ',
    next: 'ಮುಂದೆ',
    previous: 'ಹಿಂದಿನ',
    
    // Teams
    teamName: 'ತಂಡದ ಹೆಸರು',
    captain: 'ನಾಯಕ',
    coach: 'ತರಬೇತುದಾರ',
    home: 'ಮನೆ',
    founded: 'ಸ್ಥಾಪನೆ',
    titles: 'ಪ್ರಶಸ್ತಿಗಳು',
    title: 'ಪ್ರಶಸ್ತಿ',
    viewSquad: 'ತಂಡವನ್ನು ನೋಡಿ',
    players: 'ಆಟಗಾರರು',
    squad: 'ತಂಡ',
    
    // Players
    playerName: 'ಆಟಗಾರನ ಹೆಸರು',
    role: 'ಪಾತ್ರ',
    team: 'ತಂಡ',
    matches: 'ಪಂದ್ಯಗಳು',
    runs: 'ರನ್‌ಗಳು',
    wickets: 'ವಿಕೆಟ್‌ಗಳು',
    average: 'ಸರಾಸರಿ',
    strikeRate: 'ಸ್ಟ್ರೈಕ್ ರೇಟ್',
    highest: 'ಅತ್ಯಧಿಕ',
    // Player Roles
    batsman: 'ಬ್ಯಾಟ್ಸ್‌ಮನ್',
    wicketkeeper: 'ವಿಕೆಟ್‌ಕೀಪರ್',
    allrounder: 'ಆಲ್‌ರೌಂಡರ್',
    bowler: 'ಬೌಲರ್',
    fastbowler: 'ಫಾಸ್ಟ್ ಬೌಲರ್',
    failedToFetchPlayers: 'ಆಟಗಾರರನ್ನು ತರಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
totalRuns: 'ಒಟ್ಟು ರನ್‌ಗಳು',
battingAverage: 'ಬ್ಯಾಟಿಂಗ್ ಸರಾಸರಿ',
economyRate: 'ಇಕಾನಮಿ ರೇಟ್',
viewDetails: 'ವಿವರ ನೋಡಿ',
battingStatistics: 'ಬ್ಯಾಟಿಂಗ್ ಅಂಕಿಗಳು',
bowlingStatistics: 'ಬೌಲಿಂಗ್ ಅಂಕಿಗಳು',
    // Live Matches
    live: 'ಲೈವ್',
    completed: 'ಪೂರ್ಣಗೊಂಡ',
    upcoming: 'ಮುಂದಾಗಬಹುದು',
    iplMatch: 'ಐಪಿಎಲ್ ಪಂದ್ಯ',
    t20: 'ಟಿ20',
    
    // Search
    searchPlaceholder: 'ತಂಡಗಳು, ಆಟಗಾರರು, ಪಂದ್ಯಗಳನ್ನು ಹುಡುಕಿ...',
    searchResults: 'ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು',
    showingResults: 'ಕ್ಕಾಗಿ ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸುತ್ತಿದೆ',
    noResults: 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಸಿಗಲಿಲ್ಲ',
    teamDetails: 'ತಂಡದ ವಿವರಣೆ',
    
    // Login/Register
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    username: 'ಬಳಕೆದಾರರ ಹೆಸರು',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    email: 'ಇಮೇಲ್',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    loginSuccess: 'ಲಾಗಿನ್ ಯಶಸ್ವಿ!',
    invalidCredentials: 'ಅಮಾನ್ಯ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಸ್',
    registerSuccess: 'ನೋಂದಣಿ ಯಶಸ್ವಿ!',
    passwordsDoNotMatch: 'ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಿಲ್ಲ',
    createAccount: 'ಖಾತೆ ಸೃಷ್ಟಿಸಿ',
    enterYourName: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
    enterEmail: 'ಇಮೇಲ್ ನಮೂದಿಸಿ',
    enterPassword: 'ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    
    // Home
    welcome: 'ಐಪಿಎಲ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಸ್ವಾಗತ',
    subtitle: 'ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ಐಪಿಎಲ್ ಅಪ್‌ಡೇಟ್‌ಗಳು, ಸ್ಕೋರ್‌ಗಳು, ತಂಡದ ಮಾಹಿತಿ ಮತ್ತು ಆಟಗಾರರ ಅಂಕಿಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪಡೆಯಿರಿ',
    features: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    liveScores: 'ಲೈವ್ ಸ್ಕೋರ್‌ಗಳು',
    teamInfo: 'ತಂಡದ ಮಾಹಿತಿ',
    playerStats: 'ಆಟಗಾರರ ಅಂಕಿಗಳು',
    loadingPlayerStats: 'ಆಟಗಾರರ ಅಂಕಿಗಳು ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    battingStats: 'ಬ್ಯಾಟಿಂಗ್ ಅಂಕಿಗಳು',
    bowlingStats: 'ಬೌಲಿಂಗ್ ಅಂಕಿಗಳು',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    explore: 'ಅನ್ವೇಷಿಸಿ',
    liveMatchesDescription: 'ರಿಯಲ್-ಟೈಮ್ ಸ್ಕೋರ್‌ಗಳು ಮತ್ತು ಅಪ್‌ಡೇಟ್‌ಗಳೊಂದಿಗೆ ಲೈವ್ ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    matchScorecards: 'ಪಂದ್ಯ ಸ್ಕೋರ್‌ಕಾರ್ಡ್‌ಗಳು',
    matchScorecardsDescription: 'ಬ್ಯಾಟಿಂಗ್ ಮತ್ತು ಬೌಲಿಂಗ್ ಅಂಕಿಗಳೊಂದಿಗೆ ವಿವರವಾದ ಸ್ಕೋರ್‌ಕಾರ್ಡ್‌ಗಳು',
    teamsDescription: 'ತಂಡದ ಮಾಹಿತಿ, ಸ್ಕ್ವಾಡ್ ಮತ್ತು ಪ್ರದರ್ಶನ ಅಂಕಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    playersDescription: 'ಆಟಗಾರರ ಪ್ರೊಫೈಲ್‌ಗಳು, ಅಂಕಿಗಳು ಮತ್ತು ಪ್ರದರ್ಶನ ವಿಶ್ಲೇಷಣೆ',
    realTimeCricketData: 'ರಿಯಲ್-ಟೈಮ್ ಕ್ರಿಕೆಟ್ ಡೇಟಾ',
    realTimeCricketDataDescription: 'ಲೈವ್ ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಗಳು, ಆಟಗಾರರ ಅಂಕಿಗಳು ಮತ್ತು ತಂಡದ ಪ್ರದರ್ಶನ ಮೆಟ್ರಿಕ್ಸ್‌ಗೆ ತಕ್ಷಣ ಪ್ರವೇಶ',
    viewLiveMatches: 'ಲೈವ್ ಪಂದ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    
    // Admin
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    addMatch: 'ಪಂದ್ಯ ಸೇರಿಸಿ',
    addTeam: 'ತಂಡ ಸೇರಿಸಿ',
    addPlayer: 'ಆಟಗಾರನನ್ನು ಸೇರಿಸಿ',
    manageData: 'ಡೇಟಾ ನಿರ್ವಹಿಸಿ',
    
    // Statistics
    topRunScorers: 'ಶ್ರೇಷ್ಠ ರನ್ ಸ್ಕೋರರ್‌ಗಳು',
    topWicketTakers: 'ಶ್ರೇಷ್ಠ ವಿಕೆಟ್ ತೆಗೆದುವವರು',
    teamPerformance: 'ತಂಡದ ಪ್ರದರ್ಶನ',
    playerPerformance: 'ಆಟಗಾರನ ಪ್ರದರ್ಶನ'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
      { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
