import React from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  const lowerQuery = query.toLowerCase();
  const isDetailsSearch = lowerQuery.includes("details");


  const matches = [
    { id: 1, team1: "MI", team2: "CSK", score1: "150/7", score2: "145/8", status: "LIVE" },
    { id: 2, team1: "RCB", team2: "KKR", score1: "200/5", score2: "198/6", status: "COMPLETED" },
    { id: 3, team1: "DC", team2: "SRH", score1: "180/4", score2: "175/5", status: "UPCOMING" },
    { id: 4, team1: "RR", team2: "PBKS", score1: "170/6", score2: "165/7", status: "LIVE" },
    { id: 5, team1: "LSG", team2: "GT", score1: "190/3", score2: "185/4", status: "COMPLETED" }
  ];


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

 
  const cleanQuery = lowerQuery.replace("details", "").trim();

  let selectedTeam = teams.find(
    (t) => t.name.toLowerCase() === cleanQuery
  );

  let teamFromPlayer = null;
  teams.forEach(team => {
    team.players.forEach(player => {
      if (player.name.toLowerCase().includes(lowerQuery)) {
        teamFromPlayer = team;
      }
    });
  });

  const finalTeam = selectedTeam || teamFromPlayer;


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
      <h1>Search Results</h1>
      <p className="showing">Showing results for: "{query}"</p>


      {isDetailsSearch && finalTeam && (
        <div className="team-details">
          <h2>{finalTeam.name} Details</h2>
          <p><b>Captain:</b> {finalTeam.captain}</p>
          <p><b>Coach:</b> {finalTeam.coach}</p>

          <h3>Players:</h3>
          <ul>
            {finalTeam.players.map((p, i) => (
              <li key={i}>
                {p.name} - {p.role}
              </li>
            ))}
          </ul>
        </div>
      )}

     
      {!isDetailsSearch && finalTeam && (
        <>
          <h2>Live Matches</h2>
          <div className="match-grid">
            {live.length ? live.map(m => (
              <div key={m.id} className="match-card">
                <p>{m.team1} vs {m.team2}</p>
                <p>{m.score1} - {m.score2}</p>
                <p className="status live">LIVE</p>
              </div>
            )) : <p>No live matches</p>}
          </div>

          <h2>Completed Matches</h2>
          <div className="match-grid">
            {completed.length ? completed.map(m => (
              <div key={m.id} className="match-card">
                <p>{m.team1} vs {m.team2}</p>
                <p>{m.score1} - {m.score2}</p>
                <p className="status completed">COMPLETED</p>
              </div>
            )) : <p>No completed matches</p>}
          </div>

          <h2>Upcoming Matches</h2>
          <div className="match-grid">
            {upcoming.length ? upcoming.map(m => (
              <div key={m.id} className="match-card">
                <p>{m.team1} vs {m.team2}</p>
                <p className="status upcoming">UPCOMING</p>
              </div>
            )) : <p>No upcoming matches</p>}
          </div>
        </>
      )}

      {query && !finalTeam && <p>No results found</p>}
    </div>
  );
};

export default Search;