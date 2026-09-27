import apiClient from "@/lib/apiClient";

const API_URL = "/api/teams";

export const getTeams = () => apiClient.get(API_URL);

export const getTeam = (id) =>
  apiClient.get(`${API_URL}/${id}`);

export const createTeam = (data) =>
  apiClient.post(API_URL, data);

export const updateTeam = (id, data) =>
  apiClient.put(`${API_URL}/${id}`, data);

export const deleteTeam = (id) =>
  apiClient.delete(`${API_URL}/${id}`);