import React, { useEffect, useState } from "react";
import socket, {
  joinMatch,
  listenCommentary
} from "../../services/socketService";
import "./CommentaryBox.css";

const CommentaryBox = ({ matchId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!matchId) return;

    // Join specific match room
    joinMatch(matchId);

    // Listen for live commentary
    listenCommentary((message) => {
      setMessages((prev) => [
        {
          text: message,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    });

    // Cleanup (important to avoid duplicate listeners)
    return () => {
      socket.off("receiveCommentary");
    };
  }, [matchId]);

  return (
    <div className="commentary-box">
      <div className="commentary-header">
        <h4>📢 Live Commentary</h4>
      </div>

      <div className="commentary-list">
        {messages.length === 0 ? (
          <p className="no-commentary">No commentary yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="commentary-item">
              <span className="commentary-time">{msg.time}</span>
              <span className="commentary-text">{msg.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentaryBox;