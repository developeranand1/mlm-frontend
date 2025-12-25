import api from "./apiService";

export const getProductList = async () => {
  const { data } = await api.get("/products");

  return Array.isArray(data) ? data : (data?.data || []);
};




export const getProductBySlug = async (slug) => {
  try {
    const { data } = await api.get(`/products/product-by-slug/${slug}`);
    return data?.data || data;
  } catch (err) {
    console.error("API ERROR:", err?.response?.status);
    return null; // 👈 IMPORTANT
  }
};