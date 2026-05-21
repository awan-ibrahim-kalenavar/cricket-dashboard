import apiClient from "./apiClient";

// Get all matches
export const getMatches = async () => {
  const response = await apiClient.get("/matches");
  return response.data;
};

// Add match
export const createMatch = async (data) => {
  const response = await apiClient.post("/matches", data);
  return response.data;
};