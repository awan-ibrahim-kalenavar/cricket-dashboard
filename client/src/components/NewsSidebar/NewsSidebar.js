import React, { useEffect, useState } from "react";
import { newsService } from "../../services/newsService";
import "./NewsSidebar.css";

const NewsSidebar = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getNews();
        setNews(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-sidebar">
      <h3 className="news-title">📰 Latest News</h3>

      {news.map((item) => (
        <div key={item._id} className="news-card">
          <img src={item.image} alt="news" />
          <div>
            <p className="news-text">{item.title}</p>
            <span className="news-time">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSidebar;