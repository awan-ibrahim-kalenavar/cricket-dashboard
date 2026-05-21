import React, { useEffect, useState } from "react";
import { highlightService } from "../../services/highlightService";
import NewsSidebar from "../../components/NewsSidebar/NewsSidebar";
import "./Highlights.css";

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHighlights = async () => {
    try {
      const data = await highlightService.getHighlights();
      console.log("Highlights:", data);
      
      
      if (Array.isArray(data)) {
        setHighlights(data);
      } else {
        console.error('Expected array of highlights, got:', typeof data);
        setHighlights([]);
      }
    } catch (error) {
      console.error("Error fetching highlights:", error);
      setHighlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  if (loading) return <h2>Loading highlights...</h2>;

 return (
  <div className="page-layout">

  
    <div className="main-content">
      <h1>🎥 Match Highlights</h1>

      {highlights.length === 0 ? (
        <p>No highlights available</p>
      ) : (
        <div className="highlight-grid">
          {highlights.map((item) => (
            <div key={item._id} className="highlight-card">
              
              <iframe
                width="100%"
                height="220"
                src={item.videoUrl}
                title={item.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.date}</small>

            </div>
          ))}
        </div>
      )}
    </div>

   
    <NewsSidebar />

  </div>
);
};

export default Highlights;