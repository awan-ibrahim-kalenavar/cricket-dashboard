import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Admin.css';

const Admin = () => {
  const { t } = useLanguage();

  // ---------------- STATE ----------------
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  // Match Inputs
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [score, setScore] = useState('');

  // Team Inputs
  const [teamName, setTeamName] = useState('');
  const [captain, setCaptain] = useState('');
  const [coach, setCoach] = useState('');

  // Player Inputs
  const [playerName, setPlayerName] = useState('');
  const [role, setRole] = useState('');
  const [runs, setRuns] = useState('');
  const [average, setAverage] = useState('');

  // Commentary
  const [commentaryText, setCommentaryText] = useState('');
  const [selectedMatchId, setSelectedMatchId] = useState('');

  // ---------------- DEFAULT MATCHES (FIX) ----------------
  useEffect(() => {
    const defaultMatches = [
      {
        id: 1,
        team1: "Mumbai Indians",
        team2: "Chennai Super Kings",
        score: "120/3",
        status: "LIVE"
      },
      {
        id: 2,
        team1: "Royal Challengers Bangalore",
        team2: "Kolkata Knight Riders",
        score: "150/5",
        status: "LIVE"
      }
    ];

    setMatches(defaultMatches);
  }, []);

  // ---------------- MATCH ----------------
  const addMatch = () => {
    if (!team1 || !team2) return;

    const newMatch = {
      id: Date.now(),
      team1,
      team2,
      score,
      status: 'LIVE'
    };

    setMatches([...matches, newMatch]);

    setTeam1('');
    setTeam2('');
    setScore('');
  };

  const deleteMatch = (id) => {
    setMatches(matches.filter(match => match.id !== id));
  };

  // ---------------- TEAM ----------------
  const addTeam = () => {
    const newTeam = {
      teamId: Date.now(),
      teamName,
      captain,
      coach
    };

    setTeams([...teams, newTeam]);

    setTeamName('');
    setCaptain('');
    setCoach('');
  };

  const deleteTeam = (id) => {
    setTeams(teams.filter(team => team.teamId !== id));
  };

  // ---------------- PLAYER ----------------
  const addPlayer = () => {
    const newPlayer = {
      playerId: Date.now(),
      name: playerName,
      role,
      runs,
      average
    };

    setPlayers([...players, newPlayer]);

    setPlayerName('');
    setRole('');
    setRuns('');
    setAverage('');
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.playerId !== id));
  };

  // ---------------- COMMENTARY ----------------
  const sendCommentary = () => {
    if (!commentaryText || !selectedMatchId) {
      alert("Select match and enter commentary");
      return;
    }

    const message = {
      matchId: selectedMatchId,
      text: commentaryText,
      time: new Date().toLocaleTimeString()
    };

    // WebSocket (future backend)
    if (window.socket) {
      window.socket.emit('sendCommentary', message);
    }

    console.log("📢 Commentary:", message);

    setCommentaryText('');
  };

  // ---------------- UI ----------------
  return (
    <div className="admin">

      {/* DASHBOARD */}
      <div className='dashboard'>
        <h3>{t('totalMatches')}: {matches.length}</h3>
        <h3>{t('liveMatches')}: {matches.filter(m => m.status === 'LIVE').length}</h3>
        <h3>{t('totalTeams')}: {teams.length}</h3>
        <h3>{t('totalPlayers')}: {players.length}</h3>
      </div>

      {/* ADD MATCH */}
      <h3 className='heading'>{t('addMatch')}</h3>

      <input className='input' placeholder={t('team1')} value={team1} onChange={(e) => setTeam1(e.target.value)} />
      <input className='input' placeholder={t('team2')} value={team2} onChange={(e) => setTeam2(e.target.value)} />
      <input className='input' placeholder={t('score')} value={score} onChange={(e) => setScore(e.target.value)} />

      <button className='button' onClick={addMatch}>{t('add')}</button>

      {matches.map(match => (
        <div className='card' key={match.id}>
          <p>{match.team1} vs {match.team2}</p>
          <button className='delete-button' onClick={() => deleteMatch(match.id)}>
            {t('delete')}
          </button>
        </div>
      ))}

      {/* LIVE COMMENTARY */}
      <h3 className='heading'>🎤 Live Commentary</h3>

      <select
        className='input'
        value={selectedMatchId}
        onChange={(e) => setSelectedMatchId(Number(e.target.value))}
      >
        <option value="">Select Match</option>
        {matches.map(match => (
          <option key={match.id} value={match.id}>
            {match.team1} vs {match.team2}
          </option>
        ))}
      </select>

      <input
        className='input'
        placeholder="Enter commentary..."
        value={commentaryText}
        onChange={(e) => setCommentaryText(e.target.value)}
      />

      <button className='button' onClick={sendCommentary}>
        Send Commentary
      </button>

      {/* TEAM */}
      <h3 className='heading'>{t('manageTeams')}</h3>

      <input className='input' placeholder={t('teamName')} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
      <input className='input' placeholder={t('captain')} value={captain} onChange={(e) => setCaptain(e.target.value)} />
      <input className='input' placeholder={t('coach')} value={coach} onChange={(e) => setCoach(e.target.value)} />

      <button className='button' onClick={addTeam}>{t('add')}</button>

      {teams.map(team => (
        <div className='card' key={team.teamId}>
          <p>{t('teamName')}: {team.teamName}</p>
          <p>{t('captain')}: {team.captain}</p>
          <p>{t('coach')}: {team.coach}</p>

          <button className='delete-button' onClick={() => deleteTeam(team.teamId)}>
            {t('delete')}
          </button>
        </div>
      ))}

      {/* PLAYER */}
      <h3 className='heading'>{t('managePlayers')}</h3>

      <input className='input' placeholder={t('playerName')} value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      <input className='input' placeholder={t('role')} value={role} onChange={(e) => setRole(e.target.value)} />
      <input className='input' placeholder={t('runs')} value={runs} onChange={(e) => setRuns(e.target.value)} />
      <input className='input' placeholder={t('average')} value={average} onChange={(e) => setAverage(e.target.value)} />

      <button className='button' onClick={addPlayer}>{t('add')}</button>

      {players.map(player => (
        <div className='card' key={player.playerId}>
          <p>{t('name')}: {player.name}</p>
          <p>{t('role')}: {player.role}</p>
          <p>{t('runs')}: {player.runs}</p>
          <p>{t('average')}: {player.average}</p>

          <button className='delete-button' onClick={() => deletePlayer(player.playerId)}>
            {t('delete')}
          </button>
        </div>
      ))}

    </div>
  );
};

export default Admin;