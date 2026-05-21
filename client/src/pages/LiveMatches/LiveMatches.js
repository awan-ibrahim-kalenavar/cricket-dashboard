import React, { useState, useEffect } from "react";
import { matchService } from "../../services/matchService";
import { useLanguage } from "../../context/LanguageContext";

// ================= STYLES =================
const styles = `
.live-matches {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
}

.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.refresh-button {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.refresh-button:hover {
  opacity: 0.9;
}

.last-updated {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #93c5fd;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 20px;
}

.matches-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.matches-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.matches-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 850px;
  margin: auto;
}

.video-match-card {
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}

.video-header {
  padding: 20px;
  background: rgba(0,0,0,0.3);
}

.match-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.live-badge {
  background: red;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.match-info {
  color: #cbd5e1;
  font-size: 14px;
}

.score-box {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.08);
}

.team-score h4 {
  margin: 0;
  font-size: 18px;
}

.team-score p {
  margin: 5px 0 0;
  color: #38bdf8;
  font-weight: bold;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.video-iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
}

.no-matches {
  text-align: center;
  padding: 60px 20px;
}

@media(max-width:768px) {
  .page-title {
    font-size: 2rem;
  }

  .header-content {
    flex-direction: column;
  }

  .score-box {
    flex-direction: column;
    gap: 15px;
  }
}
`;

const LiveMatches = () => {
  const { t } = useLanguage();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await matchService.getLiveMatches();

      const apiResponse = response.data || response;
      const data = apiResponse.data || apiResponse;

      if (!Array.isArray(data)) {
        setError("Invalid data format received");
        return;
      }

      const formattedMatches = data.map((match) => ({
        id: match._id,

        team1: {
          name: match.team1?.name || "Team 1",
          score: `${match.score1?.runs || 0}/${match.score1?.wickets || 0}`,
          overs: match.score1?.overs || "0.0",
        },

        team2: {
          name: match.team2?.name || "Team 2",
          score: `${match.score2?.runs || 0}/${match.score2?.wickets || 0}`,
          overs: match.score2?.overs || "0.0",
        },

        status: match.status?.toLowerCase(),
        matchType: match.matchType || "T20",
        venue: match.venue || "Unknown Venue",
        result: match.result || "",
      }));

      setMatches(formattedMatches);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      setError("Failed to fetch live matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const liveMatches = matches.filter(
    (match) => match.status === "live"
  );

  const getLiveVideoUrl = (matchId) => {
    const videoUrls = {
      match1: "https://www.youtube.com/embed/yrT_nxF2hxk",
      match2: "https://www.youtube.com/embed/lF_YQc0UkAc",
      match3: "https://www.youtube.com/embed/WW8NzcnVong",
      match4: "https://www.youtube.com/embed/LXb3EKWsInQ",
    };

    return (
      videoUrls[matchId] ||
      "https://www.youtube.com/embed/aqz-KE-bpKQ"
    );
  };

  return (
    <>
      <style>{styles}</style>

      <div className="live-matches">

       
        <div className="page-header">
          <div className="header-content">

            <h1 className="page-title">
              📺 {t("liveCricketMatches")}
            </h1>

            <button
              className="refresh-button"
              onClick={fetchLiveMatches}
              disabled={loading}
            >
              🔄 {t("refresh")}
            </button>

          </div>
        </div>

      
        {lastUpdated && (
          <div className="last-updated">
            {t("lastUpdated")}:
            {" "}
            {lastUpdated.toLocaleTimeString()}
          </div>
        )}

      
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        
        {loading ? (
          <div className="loading-container">
            <p>{t("loadingMatches")}...</p>
          </div>
        ) : (
          <div className="matches-container">

          
            {liveMatches.length > 0 ? (
              <div className="matches-section">

                <h2 className="section-title">
                  🔴 Live Matches ({liveMatches.length})
                </h2>

                <div className="matches-grid">

                  {liveMatches.map((match) => (
                    <div
                      key={match.id}
                      className="video-match-card"
                    >

                      
                      <div className="video-header">

                        <h3 className="match-title">

                          <span className="live-badge">
                            LIVE
                          </span>

                          {match.team1.name} vs {match.team2.name}

                        </h3>

                        <p className="match-info">
                          📍 {match.venue} • 🏏 {match.matchType}
                        </p>

                      </div>

                      
                      <div className="score-box">

                        <div className="team-score">
                          <h4>{match.team1.name}</h4>
                          <p>
                            {match.team1.score}
                            {" "}
                            ({match.team1.overs})
                          </p>
                        </div>

                        <div className="team-score">
                          <h4>{match.team2.name}</h4>
                          <p>
                            {match.team2.score}
                            {" "}
                            ({match.team2.overs})
                          </p>
                        </div>

                      </div>

                     
                      <div className="video-container">

                        <iframe
                          className="video-iframe"
                          src={getLiveVideoUrl(match.id)}
                          title={`${match.team1.name} vs ${match.team2.name}`}
                          allowFullScreen
                        ></iframe>

                      </div>

                    </div>
                  ))}

                </div>
              </div>
            ) : (
              <div className="no-matches">

                <h2>
                  📭 {t("noMatchesAvailable")}
                </h2>

                <p>
                  {t("checkBackLater")}
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </>
  );
};

export default LiveMatches;