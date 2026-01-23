// services/rankService.js
import api from "./apiService";

export const getUserRankProgress = async (userId, next = 5) => {
  const { data } = await api.get(`/rank-progress/users/${userId}/rank-progress`, {
    params: { next },
  });
  return data;
};
