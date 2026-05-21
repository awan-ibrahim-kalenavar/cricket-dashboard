import axios from "axios";

const API_URL = "https://cricket-dashboard-q54o.onrender.com/api/news";

export const newsService = {
  getNews: async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
  }
};