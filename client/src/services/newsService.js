import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

export const newsService = {
  getNews: async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
  }
};