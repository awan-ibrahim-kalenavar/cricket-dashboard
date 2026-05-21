// Home.js

import React, { useState } from "react";
import "./Home.css";



const matches = [
  {
    id: 1,
    series: "1st Test • Pakistan tour of Bangladesh",
    team1: "BAN",
    score1: "413 & 93-2",
    team2: "PAK",
    score2: "386",
    result: "Day 4: Lunch Break - Bangladesh lead...",
    type: "Test",
  },

  {
    id: 2,
    series: "55th Match • Indian Premier League 2025",
    team1: "Punjab Kings",
    team2: "Delhi Capitals",
    status: "Today • 7:30 PM",
    type: "T20",
  },

  {
    id: 3,
    series: "54th Match • Indian Premier League 2025",
    team1: "MI",
    score1: "166-7 (20)",
    team2: "RCB",
    score2: "167-8 (20)",
    result: "Royal Challengers Bengaluru won by 2...",
    type: "T20",
  },

  {
    id: 4,
    series: "53rd Match • Indian Premier League 2025",
    team1: "LSG",
    score1: "203-8 (20)",
    team2: "CSK",
    score2: "208-5 (19.2)",
    result: "Chennai Super Kings won by 5 wkts",
    type: "T20",
  },

  {
    id: 5,
    series: "52nd Match • Indian Premier League 2025",
    team1: "KKR",
    score1: "189-6 (20)",
    team2: "SRH",
    score2: "190-4 (18.5)",
    result: "Sunrisers Hyderabad won by 6 wkts",
    type: "T20",
  },

  {
    id: 6,
    series: "51st Match • Indian Premier League 2025",
    team1: "RR",
    score1: "178-8 (20)",
    team2: "GT",
    score2: "179-3 (18.3)",
    result: "Gujarat Titans won by 7 wkts",
    type: "T20",
  },

  {
    id: 7,
    series: "50th Match • Indian Premier League 2025",
    team1: "DC",
    score1: "145-9 (20)",
    team2: "PBKS",
    score2: "146-3 (17.4)",
    result: "Punjab Kings won by 7 wkts",
    type: "T20",
  },

  {
    id: 8,
    series: "49th Match • Indian Premier League 2025",
    team1: "CSK",
    score1: "195-4 (20)",
    team2: "MI",
    score2: "196-5 (19.1)",
    result: "Mumbai Indians won by 5 wkts",
    type: "T20",
  },

  {
    id: 9,
    series: "48th Match • Indian Premier League 2025",
    team1: "RCB",
    score1: "212-3 (20)",
    team2: "KKR",
    score2: "213-4 (19.2)",
    result: "Kolkata Knight Riders won by 6 wkts",
    type: "T20",
  },
];

// Sample cricket news data
const latestNews = [
  {
    id: 1,
    title: "Virat Kohli Smashes Century in IPL 2025",
    description: "Royal Challengers Bangalore star Virat Kohli scored a brilliant century against Mumbai Indians, leading his team to a crucial victory in the IPL 2025 season.",
    image: "https://images.unsplash.com/photo-1541252270730-0412e8e2108e?w=400&h=250&fit=crop",
    publishedTime: "2 hours ago",
    isLive: true,
    category: "IPL 2025"
  },
  {
    id: 2,
    title: "CSK Captain Dhoni Announces Retirement Plans",
    description: "Chennai Super Kings captain MS Dhoni hints at retirement after IPL 2025, marking the end of an era in Indian cricket.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951f0974?w=400&h=250&fit=crop",
    publishedTime: "5 hours ago",
    isLive: false,
    category: "Breaking News"
  },
  {
    id: 3,
    title: "IPL 2025: New Record for Highest Team Total",
    description: "Sunrisers Hyderabad set a new IPL record with the highest team total ever, scoring 263/5 against Mumbai Indians at the Wankhede Stadium.",
    image: "https://images.unsplash.com/photo-1605296867424-3045b089a29d?w=400&h=250&fit=crop",
    publishedTime: "8 hours ago",
    isLive: false,
    category: "Records"
  },
  {
    id: 4,
    title: "Rohit Sharma Returns to International Cricket",
    description: "Indian cricket team captain Rohit Sharma makes a successful return to international cricket after injury layoff, scoring 85 runs in the first match.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    publishedTime: "12 hours ago",
    isLive: false,
    category: "Team India"
  },
  {
    id: 5,
    title: "Jasprit Bumrah Becomes World's No.1 Bowler",
    description: "India's fast bowler Jasprit Bumrah achieves the top spot in ICC rankings after his outstanding performance in the recent series.",
    image: "https://images.unsplash.com/photo-1593720213448-28b5c5e846f2?w=400&h=250&fit=crop",
    publishedTime: "1 day ago",
    isLive: false,
    category: "ICC Rankings"
  },
  {
    id: 6,
    title: "Women's IPL 2025 Schedule Announced",
    description: "BCCI announces the complete schedule for Women's IPL 2025, with the tournament set to begin next month with five teams competing.",
    image: "https://images.unsplash.com/photo-1554068384-1cd5b5c8e5c0?w=400&h=250&fit=crop",
    publishedTime: "1 day ago",
    isLive: true,
    category: "Women's Cricket"
  }
];

const Home = () => {

  const [feedbacks, setFeedbacks] = useState([
  {
    name: "Awan Ibrahim",
    message: "Amazing cricket dashboard and live score UI.",
    rating: 5,
  },
  {
    name: "Rahul Sharma",
    message: "Very fast live updates and beautiful design.",
    rating: 4,
  },
]);


  const [name, setName] = useState("");
const [message, setMessage] = useState("");
const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!name || !message) {
    alert("Please fill all fields");
    return;
  }

  const newFeedback = {
    name,
    message,
    rating,
  };

  setFeedbacks([newFeedback, ...feedbacks]);

  setName("");
  setMessage("");
  setRating(5);
};
  return (
    <div className="home-container">

      <div className="matches-slider">

        {matches.map((match) => (
          <div className="match-card" key={match.id}>

            
            <div className="top-row">

              <p className="series">
                {match.series}
              </p>

              <span className={`match-type ${match.type.toLowerCase()}`}>
                {match.type}
              </span>

            </div>

            
            <div className="teams-section">

              <div className="team-row">
                <span>{match.team1}</span>

                {match.score1 && (
                  <strong>{match.score1}</strong>
                )}
              </div>

              <div className="team-row">
                <span>{match.team2}</span>

                {match.score2 && (
                  <strong>{match.score2}</strong>
                )}
              </div>

            </div>

           
            <div className="bottom-section">

              {match.result ? (
                <p className="result">{match.result}</p>
              ) : (
                <p className="schedule">{match.status}</p>
              )}

              <div className="links">
                <span>FORECAST</span>
                <span>TABLE</span>
                <span>SCHEDULE</span>
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Latest Cricket News Section */}
      <div className="news-section">
        <div className="news-header">
          <h2 className="news-title">📰 Latest Cricket News</h2>
          <div className="news-categories">
            <span className="category-tag active">All</span>
            <span className="category-tag">IPL 2025</span>
            <span className="category-tag">Team India</span>
            <span className="category-tag">Breaking</span>
          </div>
        </div>

        <div className="news-grid">
          {latestNews.map((news) => (
            <div key={news.id} className="news-card">
              <div className="news-image-container">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="news-image"
                  loading="lazy"
                />
                {news.isLive && (
                  <span className="live-badge">LIVE</span>
                )}
                <span className="news-category">{news.category}</span>
              </div>

              <div className="news-content">
                <h3 className="news-headline">{news.title}</h3>
                <p className="news-description">{news.description}</p>
                
                <div className="news-meta">
                  <span className="news-time">🕐 {news.publishedTime}</span>
                  <button className="read-more-btn">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="news-footer">
          <button className="view-all-btn">
            View All News →
          </button>
        </div>
      </div>
      <div className="feedback-section">

  <div className="section-header">
    <h2>💬 User Feedback</h2>
    <p>What cricket fans say about CricNova</p>
  </div>

  <div className="feedback-container">

    <div className="feedback-card">
      
          <div className="home-container">

      {/* FEEDBACK FORM */}

      <div className="feedback-form-section">

        <h2>💬 Give Your Feedback</h2>

        <form onSubmit={handleSubmit} className="feedback-form">

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="rating-section">

  <label>Select Rating:</label>

  <div className="stars">

    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={star <= rating ? "star active" : "star"}
        onClick={() => setRating(star)}
      >
        ★
      </span>
    ))}

  </div>

</div>

          <button type="submit">
            Submit Feedback
          </button>

        </form>
      </div>

      {/* FEEDBACK DISPLAY */}

      <div className="feedback-container">

  {feedbacks.map((feedback, index) => (
    <div className="feedback-card" key={index}>

      <div className="feedback-top">

        <div className="user-avatar">
          {feedback.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h4>{feedback.name}</h4>

          <div className="feedback-stars">
            {"★".repeat(feedback.rating)}
            {"☆".repeat(5 - feedback.rating)}
          </div>
        </div>

      </div>

      <p className="feedback-text">
        {feedback.message}
      </p>

    </div>
  ))}

</div>

    </div>


      

     

     
     

     
    </div>

  </div>

</div>

    </div>
  );
};

export default Home;