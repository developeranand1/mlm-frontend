import api from "./apiService";

export const getProductList = async () => {
  const { data } = await api.get("/products");
  // agar backend {data: []} ya direct [] bhejta ho to handle:
  return Array.isArray(data) ? data : (data?.data || []);
};
