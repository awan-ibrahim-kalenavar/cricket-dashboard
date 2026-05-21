import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import LiveMatches from '../pages/LiveMatches/LiveMatches';
import Teams from '../pages/Teams/Teams';
import Players from '../pages/Players/Players';
import Statistics from '../pages/Statistics/Statistics';
import MatchDetails from '../pages/MatchDetails/MatchDetails';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Admin from '../pages/Admin/Admin';
import Search from '../pages/Search/Search';
import Highlights from "../pages/Highlights/Highlights";
import Notifications from '../pages/Notifications/Notifications';
import Profile from '../pages/Profile/Profile';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/live-matches" element={<LiveMatches />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/players" element={<Players />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/search" element={<Search />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/scorecard/:matchId" element={<MatchDetails />} />
      <Route path="/highlights" element={<Highlights />} />
    </Routes>
  );
};

export default AppRoutes;