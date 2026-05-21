import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from '../../context/LanguageContext';
import "./Search.css";

const Search = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  const lowerQuery = query.toLowerCase();
  const isDetailsSearch = lowerQuery.includes("details");

  // ✅ MATCHES
  const matches = [
    { id: 1, team1: "MI", team2: "CSK", score1: "150/7", score2: "145/8", status: "LIVE" },
    { id: 2, team1: "RCB", team2: "KKR", score1: "200/5", score2: "198/6", status: "COMPLETED" },
    { id: 3, team1: "DC", team2: "SRH", score1: "180/4", score2: "175/5", status: "UPCOMING" },
    { id: 4, team1: "RR", team2: "PBKS", score1: "170/6", score2: "165/7", status: "LIVE" },
    { id: 5, team1: "LSG", team2: "GT", score1: "190/3", score2: "185/4", status: "COMPLETED" }
  ];

  // ✅ TEAMS WITH FULL DETAILS
  const teams = [
    {
      name: "MI",
      captain: "Rohit Sharma",
      coach: "Mark Boucher",
      players: [
        { name: "Rohit Sharma", role: "Batsman" },
        { name: "Jasprit Bumrah", role: "Bowler" }
      ]
    },
    {
      name: "CSK",
      captain: "MS Dhoni",
      coach: "Stephen Fleming",
      players: [
        { name: "MS Dhoni", role: "Wicket Keeper" },
        { name: "Ravindra Jadeja", role: "All-rounder" },
        { name: "Ruturaj Gaikwad", role: "Batsman" }
      ]
    },
    {
      name: "RCB",
      captain: "Virat Kohli",
      coach: "Andy Flower",
      players: [
        { name: "Virat Kohli", role: "Batsman" }
      ]
    },
    {
      name: "KKR",
      captain: "Shreyas Iyer",
      coach: "Chandrakant Pandit",
      players: [
        { name: "Andre Russell", role: "All-rounder" }
      ]
    }
  ];

  const teamLogos = {
    RCB: "https://i.pinimg.com/750x/a6/40/a6/a640a6cd05dc2dfb58ce3ff3467df677.jpg",
    CSK: "https://media.crictracker.com/media/attachments/1674543242945_CSK-Logo.jpeg",
    MI: "https://i.pinimg.com/736x/28/09/a8/2809a841bb08827603ccac5c6aee8b33.jpg",
    KKR: "https://i.pinimg.com/564x/04/2f/ae/042fae399944c19581c330f89adf18bf.jpg"
  };

  // ✅ FIND TEAM BY NAME
  const cleanQuery = lowerQuery.replace("details", "").trim();

  let selectedTeam = teams.find(
    (t) => t.name.toLowerCase() === cleanQuery
  );

  // ✅ FIND TEAM FROM PLAYER
  let teamFromPlayer = null;
  teams.forEach(team => {
    team.players.forEach(player => {
      if (player.name.toLowerCase().includes(lowerQuery)) {
        teamFromPlayer = team;
      }
    });
  });

  const finalTeam = selectedTeam || teamFromPlayer;

  // ✅ FILTER MATCHES
  const results = matches.filter(match => {
    return (
      finalTeam &&
      (match.team1 === finalTeam.name || match.team2 === finalTeam.name)
    );
  });

  const live = results.filter(m => m.status === "LIVE");
  const completed = results.filter(m => m.status === "COMPLETED");
  const upcoming = results.filter(m => m.status === "UPCOMING");

  return (
    <div className="search-page">
      <h1>{t('searchResults')}</h1>
      <p className="showing">{t('showingResultsFor')} "{query}"</p>

      {/* ✅ TEAM DETAILS */}
      {isDetailsSearch && finalTeam && (
        <div className="team-details">
          <h2>{finalTeam.name} {t('details')}</h2>
          <p><b>{t('captain')}:</b> {finalTeam.captain}</p>
          <p><b>{t('coach')}:</b> {finalTeam.coach}</p>

          <h3>{t('players')}:</h3>
          <ul>
            {finalTeam.players.map((p, i) => (
              <li key={i}>
                {p.name} - {p.role}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ MATCHES */}
      {!isDetailsSearch && finalTeam && (
        <>
          <h2>{t('liveMatches')}</h2>
          <div className="match-grid">
            {live.length ? live.map(m => (
              <div key={m.id} className="match-card">
                <p>{m.team1} vs {m.team2}</p>
                <p>{m.score1} - {m.score2}</p>
                <p className="status live">{t('live')}</p>
              </div>
            )) : <p>{t('noLiveMatches')}</p>}
          </div>

          <h2>{t('completedMatches')}</h2>
          <div className="match-grid">
            {completed.length ? completed.map(m => (
              <div key={m.id} className="match-card">
                <p>{m.team1} vs {m.team2}</p>
                <p>{m.score1} - {m.score2}</p>
                <p className="status completed">{t('completed')}</p>
              </div>
            )) : <p>{t('noCompletedMatches')}</p>}
          </div>

          <h2>{t('upcomingMatches')}</h2>
          <div className="match-grid">
            {upcoming.length ? upcoming.map(m => (
              <div key={m.id} className="match-card">
                <p>{m.team1} vs {m.team2}</p>
                <p className="status upcoming">{t('upcoming')}</p>
              </div>
            )) : <p>{t('noUpcomingMatches')}</p>}
          </div>
        </>
      )}

      {/* ❌ NO RESULT */}
      {query && !finalTeam && <p>{t('noResultsFound')}</p>}
    </div>
  );
};

export default Search;