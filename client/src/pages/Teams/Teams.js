import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Teams.css';

const Teams = () => {
  const { t, language } = useLanguage();

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teams");
      const data = await response.json();

      if (data.success) {
        const additionalTeams = [
          {
            id: 11,
            name: "Lucknow Super Giants",
            shortName: "LSG",
            captain: "KL Rahul",
            coach: "Justin Langer",
            homeGround: "Ekana Cricket Stadium, Lucknow",
            founded: 2022,
            titles: 0,
            logo: "https://i.ibb.co/6PjXQ3K/lsg-logo.png",
            squad: [
              { name: "KL Rahul", role: "Batsman", country: "India", image: "/assets/players/kl-rahul.png" },
              { name: "Marcus Stoinis", role: "All-rounder", country: "Australia", image: "/assets/players/stoinis.png" },
              { name: "Ravi Bishnoi", role: "Bowler", country: "India", image: "/assets/players/bishnoi.png" },
              { name: "Quinton de Kock", role: "Wicket-keeper", country: "South Africa", image: "/assets/players/de-kock.png" },
              { name: "Avesh Khan", role: "Bowler", country: "India", image: "/assets/players/avesh.png" }
            ]
          },
          {
            id: 12,
            name: "Gujarat Titans",
            shortName: "GT",
            captain: "Hardik Pandya",
            coach: "Ashish Nehra",
            homeGround: "Narendra Modi Stadium, Ahmedabad",
            founded: 2022,
            titles: 1,
            logo: "https://i.ibb.co/L84yW8j/gt-logo.png",
            squad: [
              { name: "Hardik Pandya", role: "All-rounder", country: "India", image: "/assets/players/hardik.png" },
              { name: "Shubman Gill", role: "Batsman", country: "India", image: "/assets/players/gill.png" },
              { name: "Rashid Khan", role: "Bowler", country: "Afghanistan", image: "/assets/players/rashid.png" },
              { name: "David Miller", role: "Batsman", country: "South Africa", image: "/assets/players/miller.png" },
              { name: "Mohammad Shami", role: "Bowler", country: "India", image: "/assets/players/shami.png" }
            ]
          },
          {
            id: 13,
            name: "Punjab Kings",
            shortName: "PBKS",
            captain: "Shikhar Dhawan",
            coach: "Trevor Bayliss",
            homeGround: "PCA Stadium, Mohali",
            founded: 2008,
            titles: 0,
            logo: "https://i.ibb.co/3s6JQvT/pbks-logo.png",
            squad: [
              { name: "Shikhar Dhawan", role: "Batsman", country: "India", image: "/assets/players/dhawan.png" },
              { name: "Jonny Bairstow", role: "Wicket-keeper", country: "England", image: "/assets/players/bairstow.png" },
              { name: "Kagiso Rabada", role: "Bowler", country: "South Africa", image: "/assets/players/rabada.png" },
              { name: "Liam Livingstone", role: "All-rounder", country: "England", image: "/assets/players/livingstone.png" },
              { name: "Arshdeep Singh", role: "Bowler", country: "India", image: "/assets/players/arshdeep.png" }
            ]
          },
          {
            id: 14,
            name: "Delhi Capitals",
            shortName: "DC",
            captain: "Rishabh Pant",
            coach: "Ricky Ponting",
            homeGround: "Arun Jaitley Stadium, Delhi",
            founded: 2008,
            titles: 0,
            logo: "https://i.ibb.co/68v9gWq/dc-logo.png",
            squad: [
              { name: "Rishabh Pant", role: "Wicket-keeper", country: "India", image: "/assets/players/pant.png" },
              { name: "David Warner", role: "Batsman", country: "Australia", image: "/assets/players/warner.png" },
              { name: "Anrich Nortje", role: "Bowler", country: "South Africa", image: "/assets/players/nortje.png" },
              { name: "Axar Patel", role: "All-rounder", country: "India", image: "/assets/players/axar.png" },
              { name: "Prithvi Shaw", role: "Batsman", country: "India", image: "/assets/players/shaw.png" }
            ]
          },
          {
            id: 15,
            name: "Sunrisers Hyderabad",
            shortName: "SRH",
            captain: "Pat Cummins",
            coach: "Daniel Vettori",
            homeGround: "Rajiv Gandhi Stadium, Hyderabad",
            founded: 2012,
            titles: 1,
            logo: "https://i.ibb.co/0nK6KfG/srh-logo.png",
            squad: [
              { name: "Pat Cummins", role: "Bowler", country: "Australia", image: "/assets/players/cummins.png" },
              { name: "Travis Head", role: "Batsman", country: "Australia", image: "/assets/players/head.png" },
              { name: "Bhuvneshwar Kumar", role: "Bowler", country: "India", image: "/assets/players/bhuvi.png" },
              { name: "Heinrich Klaasen", role: "Wicket-keeper", country: "South Africa", image: "/assets/players/klaasen.png" },
              { name: "Abhishek Sharma", role: "All-rounder", country: "India", image: "/assets/players/abhishek.png" }
            ]
          }
        ];
        
        setTeams([...data.data, ...additionalTeams]);
      } else {
        console.error("Failed to fetch teams:", data.message);
        setTeams([
          {
            id: 11,
            name: "Lucknow Super Giants",
            shortName: "LSG",
            captain: "KL Rahul",
            coach: "Justin Langer",
            homeGround: "Ekana Cricket Stadium, Lucknow",
            founded: 2022,
            titles: 0,
            logo: "https://i.ibb.co/6PjXQ3K/lsg-logo.png",
            squad: [
              { name: "KL Rahul", role: "Batsman", country: "India", image: "/assets/players/kl-rahul.png" },
              { name: "Marcus Stoinis", role: "All-rounder", country: "Australia", image: "/assets/players/stoinis.png" },
              { name: "Ravi Bishnoi", role: "Bowler", country: "India", image: "/assets/players/bishnoi.png" },
              { name: "Quinton de Kock", role: "Wicket-keeper", country: "South Africa", image: "/assets/players/de-kock.png" },
              { name: "Avesh Khan", role: "Bowler", country: "India", image: "/assets/players/avesh.png" }
            ]
          },
          {
            id: 12,
            name: "Gujarat Titans",
            shortName: "GT",
            captain: "Hardik Pandya",
            coach: "Ashish Nehra",
            homeGround: "Narendra Modi Stadium, Ahmedabad",
            founded: 2022,
            titles: 1,
            logo: "https://i.ibb.co/L84yW8j/gt-logo.png",
            squad: [
              { name: "Hardik Pandya", role: "All-rounder", country: "India", image: "/assets/players/hardik.png" },
              { name: "Shubman Gill", role: "Batsman", country: "India", image: "/assets/players/gill.png" },
              { name: "Rashid Khan", role: "Bowler", country: "Afghanistan", image: "/assets/players/rashid.png" },
              { name: "David Miller", role: "Batsman", country: "South Africa", image: "/assets/players/miller.png" },
              { name: "Mohammad Shami", role: "Bowler", country: "India", image: "/assets/players/shami.png" }
            ]
          },
          {
            id: 13,
            name: "Punjab Kings",
            shortName: "PBKS",
            captain: "Shikhar Dhawan",
            coach: "Trevor Bayliss",
            homeGround: "PCA Stadium, Mohali",
            founded: 2008,
            titles: 0,
            logo: "https://i.ibb.co/3s6JQvT/pbks-logo.png",
            squad: [
              { name: "Shikhar Dhawan", role: "Batsman", country: "India", image: "/assets/players/dhawan.png" },
              { name: "Jonny Bairstow", role: "Wicket-keeper", country: "England", image: "/assets/players/bairstow.png" },
              { name: "Kagiso Rabada", role: "Bowler", country: "South Africa", image: "/assets/players/rabada.png" },
              { name: "Liam Livingstone", role: "All-rounder", country: "England", image: "/assets/players/livingstone.png" },
              { name: "Arshdeep Singh", role: "Bowler", country: "India", image: "/assets/players/arshdeep.png" }
            ]
          },
          {
            id: 14,
            name: "Delhi Capitals",
            shortName: "DC",
            captain: "Rishabh Pant",
            coach: "Ricky Ponting",
            homeGround: "Arun Jaitley Stadium, Delhi",
            founded: 2008,
            titles: 0,
            logo: "https://i.ibb.co/68v9gWq/dc-logo.png",
            squad: [
              { name: "Rishabh Pant", role: "Wicket-keeper", country: "India", image: "/assets/players/pant.png" },
              { name: "David Warner", role: "Batsman", country: "Australia", image: "/assets/players/warner.png" },
              { name: "Anrich Nortje", role: "Bowler", country: "South Africa", image: "/assets/players/nortje.png" },
              { name: "Axar Patel", role: "All-rounder", country: "India", image: "/assets/players/axar.png" },
              { name: "Prithvi Shaw", role: "Batsman", country: "India", image: "/assets/players/shaw.png" }
            ]
          },
          {
            id: 15,
            name: "Sunrisers Hyderabad",
            shortName: "SRH",
            captain: "Pat Cummins",
            coach: "Daniel Vettori",
            homeGround: "Rajiv Gandhi Stadium, Hyderabad",
            founded: 2012,
            titles: 1,
            logo: "https://i.ibb.co/0nK6KfG/srh-logo.png",
            squad: [
              { name: "Pat Cummins", role: "Bowler", country: "Australia", image: "/assets/players/cummins.png" },
              { name: "Travis Head", role: "Batsman", country: "Australia", image: "/assets/players/head.png" },
              { name: "Bhuvneshwar Kumar", role: "Bowler", country: "India", image: "/assets/players/bhuvi.png" },
              { name: "Heinrich Klaasen", role: "Wicket-keeper", country: "South Africa", image: "/assets/players/klaasen.png" },
              { name: "Abhishek Sharma", role: "All-rounder", country: "India", image: "/assets/players/abhishek.png" }
            ]
          }
        ]);
      }
    } catch (error) {
      console.error("Server error", error);
      setTeams([
        {
          id: 11,
          name: "Lucknow Super Giants",
          shortName: "LSG",
          captain: "KL Rahul",
          coach: "Justin Langer",
          homeGround: "Ekana Cricket Stadium, Lucknow",
          founded: 2022,
          titles: 0,
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWfahLTtLFMPuP5pZqpKDKgNLuiAjwC2BEg&s",
          squad: [
            { name: "KL Rahul", role: "Batsman", country: "India", image: "/assets/players/kl-rahul.png" },
            { name: "Marcus Stoinis", role: "All-rounder", country: "Australia", image: "/assets/players/stoinis.png" },
            { name: "Ravi Bishnoi", role: "Bowler", country: "India", image: "/assets/players/bishnoi.png" },
            { name: "Quinton de Kock", role: "Wicket-keeper", country: "South Africa", image: "/assets/players/de-kock.png" },
            { name: "Avesh Khan", role: "Bowler", country: "India", image: "/assets/players/avesh.png" }
          ]
        },
        {
          id: 12,
          name: "Gujarat Titans",
          shortName: "GT",
          captain: "Hardik Pandya",
          coach: "Ashish Nehra",
          homeGround: "Narendra Modi Stadium, Ahmedabad",
          founded: 2022,
          titles: 1,
          logo: "https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg",
          squad: [
            { name: "Hardik Pandya", role: "All-rounder", country: "India", image: "/assets/players/hardik.png" },
            { name: "Shubman Gill", role: "Batsman", country: "India", image: "/assets/players/gill.png" },
            { name: "Rashid Khan", role: "Bowler", country: "Afghanistan", image: "/assets/players/rashid.png" },
            { name: "David Miller", role: "Batsman", country: "South Africa", image: "/assets/players/miller.png" },
            { name: "Mohammad Shami", role: "Bowler", country: "India", image: "/assets/players/shami.png" }
          ]
        },
        {
          id: 13,
          name: "Punjab Kings",
          shortName: "PBKS",
          captain: "Shikhar Dhawan",
          coach: "Trevor Bayliss",
          homeGround: "PCA Stadium, Mohali",
          founded: 2008,
          titles: 0,
          logo: "https://i.ibb.co/3s6JQvT/pbks-logo.png",
          squad: [
            { name: "Shikhar Dhawan", role: "Batsman", country: "India", image: "/assets/players/dhawan.png" },
            { name: "Jonny Bairstow", role: "Wicket-keeper", country: "England", image: "/assets/players/bairstow.png" },
            { name: "Kagiso Rabada", role: "Bowler", country: "South Africa", image: "/assets/players/rabada.png" },
            { name: "Liam Livingstone", role: "All-rounder", country: "England", image: "/assets/players/livingstone.png" },
            { name: "Arshdeep Singh", role: "Bowler", country: "India", image: "/assets/players/arshdeep.png" }
          ]
        },
        {
          id: 14,
          name: "Delhi Capitals",
          shortName: "DC",
          captain: "Rishabh Pant",
          coach: "Ricky Ponting",
          homeGround: "Arun Jaitley Stadium, Delhi",
          founded: 2008,
          titles: 0,
          logo: "https://i.ibb.co/68v9gWq/dc-logo.png",
          squad: [
            { name: "Rishabh Pant", role: "Wicket-keeper", country: "India", image: "/assets/players/pant.png" },
            { name: "David Warner", role: "Batsman", country: "Australia", image: "/assets/players/warner.png" },
            { name: "Anrich Nortje", role: "Bowler", country: "South Africa", image: "/assets/players/nortje.png" },
            { name: "Axar Patel", role: "All-rounder", country: "India", image: "/assets/players/axar.png" },
            { name: "Prithvi Shaw", role: "Batsman", country: "India", image: "/assets/players/shaw.png" }
          ]
        },
        {
          id: 15,
          name: "Sunrisers Hyderabad",
          shortName: "SRH",
          captain: "Pat Cummins",
          coach: "Daniel Vettori",
          homeGround: "Rajiv Gandhi Stadium, Hyderabad",
          founded: 2012,
          titles: 1,
          logo: "https://i.ibb.co/0nK6KfG/srh-logo.png",
          squad: [
            { name: "Pat Cummins", role: "Bowler", country: "Australia", image: "/assets/players/cummins.png" },
            { name: "Travis Head", role: "Batsman", country: "Australia", image: "/assets/players/head.png" },
            { name: "Bhuvneshwar Kumar", role: "Bowler", country: "India", image: "/assets/players/bhuvi.png" },
            { name: "Heinrich Klaasen", role: "Wicket-keeper", country: "South Africa", image: "/assets/players/klaasen.png" },
            { name: "Abhishek Sharma", role: "All-rounder", country: "India", image: "/assets/players/abhishek.png" }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team => {
    const name = team.name || "";
    const captain = team.captain || "";
    const coach = team.coach || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (team.shortName && team.shortName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      captain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleTeamClick = (team) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
  };

  return (
    <div className="teams">

      <h1>{t("iplTeams")}</h1>

     
      <input
        type="text"
        placeholder={t("search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      {loading ? (
        <p>{t("loadingTeams")}...</p>
      ) : (
        <>
          <div className="teams-grid">
            {filteredTeams.map(team => (
              <div
                key={team._id || team.id}
                className="team-card"
                onClick={() => handleTeamClick(team)}
              >
                <img src={team.logo || '/assets/default-logo.png'} alt={team.name} />

                <h3>{team.name}</h3>

                <div className="team-info">
  <div className="info-row">
    <span>{t("captain")}:</span>
    <span>{team.captain}</span>
  </div>

  <div className="info-row">
    <span>{t("coach")}:</span>
    <span>{team.coach}</span>
  </div>

  <div className="info-row">
    <span>{t("home")}:</span>
    <span>{team.homeGround}</span>
  </div>

  <div className="info-row">
    <span>{t("founded")}:</span>
    <span>{team.founded || 2008}</span>
  </div>

  <div className="info-row">
    <span>{t("titles")}:</span>
    <span>{team.titles || 0}</span>
  </div>
</div>
              </div>
            ))}
          </div>

          
          {selectedTeam && (
            <div className="players-section">
              <h2>{selectedTeam.name} {t("squad")}</h2>

              <div className="players-grid">
                {selectedTeam.squad && selectedTeam.squad.length > 0 ? (
                  selectedTeam.squad.map((player, index) => (
                    <div key={player._id || index} className="player-card">
                      <img src={player.image || '/assets/default-player.png'} alt={player.name} />

                      <h4>{player.name}</h4>
                      <p>{player.role}</p>
                      <p>{player.country}</p>
                    </div>
                  ))
                ) : (
                  <p>No squad data available</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Teams;