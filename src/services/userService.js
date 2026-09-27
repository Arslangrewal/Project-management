import apiClient from "@/lib/apiClient";

const API_URL = "/api/users";

export const getUsers = () => apiClient.get(API_URL);

export const getUser = (id) =>
  apiClient.get(`${API_URL}/${id}`);

export const createUser = (data) =>
  apiClient.post(API_URL, data);

export const updateUser = (id, data) =>
  apiClient.put(`${API_URL}/${id}`, data);

export const deleteUser = (id) =>
  apiClient.delete(`${API_URL}/${id}`);

/**
 * Update a user's role
 */
export const updateUserRole = (id, role) =>
  apiClient.patch(`${API_URL}/${id}/role`, {
    role,
  });