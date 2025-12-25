import api from "./apiService";

const extractMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.response?.data?.msg ||
  fallback;

/**
 * Accepts:
 *  - { identifier, password }  ✅ (your UI)
 *  - OR { email, password }
 *  - OR { username, password }
 */
export const authLogin = async (payload) => {
  try {
    const identifier = (payload?.identifier || "").trim();
    const password = (payload?.password || "").trim();

    // If user already passes email/username directly, keep it
    const email = (payload?.email || "").trim();
    const username = (payload?.username || "").trim();

    // Build backend-friendly payload
    let body = { password };

    if (email) body.email = email;
    else if (username) body.username = username;
    else if (identifier) {
      // ✅ Map identifier to email/username
      if (identifier.includes("@")) body.email = identifier;
      else body.username = identifier;

      // (Optional) some backends accept both; can send both:
      // body = { email: identifier, username: identifier, password };
    }

    const res = await api.post("/auth/login", body);
    return res.data;
  } catch (error) {
    throw new Error(extractMessage(error, "Login failed. Please try again."));
  }
};

export const authSignUp = async (payload) => {
  try {
    const res = await api.post("/auth/register", payload);
    return res.data;
  } catch (error) {
    throw new Error(extractMessage(error, "Signup failed. Please try again."));
  }
};
