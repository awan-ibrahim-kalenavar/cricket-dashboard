import axios from "axios";

const API_URL = "https://cricket-dashboard-q54o.onrender.com/api/highlights";

export const highlightService = {
  getHighlights: async () => {
    const response = await axios.get(API_URL);
    // API returns: { success: true, data: [...] }
    return response.data.data || response.data;
  }
};