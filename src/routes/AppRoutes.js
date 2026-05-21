import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Teams from "../pages/Teams/Teams";
import Players from "../pages/Players/Players";
import Admin from "../pages/Admin/Admin";
import Search from '../pages/Search/Search';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Register />} />

     
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

     
      <Route path="/home" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/players" element={<Players />} />
      <Route path="/admin" element={<Admin />} />

     
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default AppRoutes;