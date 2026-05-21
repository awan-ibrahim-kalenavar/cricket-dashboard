import React, { useState } from "react";
import { sendCommentary } from "../../services/socketService";
import "./AdminCommentary.css";

const AdminCommentary = () => {
  const [matchId, setMatchId] = useState("1");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendCommentary(matchId, message);
    setMessage("");
  };

  return (
    <div className="admin-container">
      <h2>🎙️ Admin Commentary Panel</h2>

      <div className="form-group">
        <label>Match ID</label>
        <input
          type="text"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Commentary</label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter live commentary..."
        />
      </div>

      <button onClick={handleSend} className="send-btn">
        🚀 Send Commentary
      </button>
    </div>
  );
};

export default AdminCommentary;