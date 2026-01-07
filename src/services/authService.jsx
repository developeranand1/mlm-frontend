import api from "./apiService";

const extractMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.response?.data?.msg ||
  fallback;

// export const authLogin = async (payload) => {
//   try {
//     const identifier = (payload?.identifier || "").trim();
//     const password = (payload?.password || "").trim();

//     // If user already passes email/username directly, keep it
//     const email = (payload?.email || "").trim();
//     const username = (payload?.username || "").trim();

//     // Build backend-friendly payload
//     let body = { password };

//     if (email) body.email = email;
//     else if (username) body.username = username;
//     else if (identifier) {
//       // ✅ Map identifier to email/username
//       if (identifier.includes("@")) body.email = identifier;
//       else body.username = identifier;

//       // (Optional) some backends accept both; can send both:
//       // body = { email: identifier, username: identifier, password };
//     }

//     const res = await api.post("/auths/login", body);
//     return res.data;
//   } catch (error) {
//     throw new Error(extractMessage(error, "Login failed. Please try again."));
//   }
// };

export const authLogin = async ({ identifier, password }) => {
  try {
    const body = {
      identifier: String(identifier || "").trim(),
      password: String(password || "").trim(),
    };

    const res = await api.post("/auths/login", body); // ✅ yaha apna exact backend path rakho
    return res.data;
  } catch (error) {
    throw new Error(extractMessage(error, "Login failed. Please try again."));
  }
};

export const authSignUp = async (payload) => {
  try {
    const res = await api.post("/auths/register", payload);
    return res.data;
  } catch (error) {
    throw new Error(extractMessage(error, "Signup failed. Please try again."));
  }
};

export const userDetails = async (userId) => {
  const resp = await api.get(`/auths/users/${userId}`);
  // ✅ unwrap backend shape
  return resp.data?.user;
};

export const userRankDetails = async (userId) => {
  const resp = await api.get(`/auths/status/${userId}`);
  // ✅ unwrap backend shape
  return resp.data?.rank;
};

export const userWalletDetails = async (userId) => {
  const resp = await api.get(`/wallet/by-user/${userId}`);
  // ✅ unwrap backend shape
  return resp.data;
};

export const kycDetail = async (userId) => {
  try {
    const resp = await api.get(`/kyc/user/${userId}`);
    return resp.data;
  } catch (error) {
    throw new Error(
      extractMessage(error, "Kyc details failed. Please try again.")
    );
  }
};

export const kycUpdate = async (userId, formData) => {
  try {
    const res = await api.put(`/users/updateKYC/${userId}`, formData, {
      // ✅ IMPORTANT: let browser set boundary automatically
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw new Error(extractMessage(error, "Failed to update KYC details."));
  }
};

export const userProfile = async (userId) => {
  try {
    const resp = await api.get(`/users/user/${userId}`);
    return resp.data;
  } catch (error) {
    throw new Error(
      extractMessage(error, "Kyc details failed. Please try again.")
    );
  }
};

export const updateUserProfile = async (userId, payload) => {
  try {
    const resp = await api.put(`auths/users/${userId}`, payload);

   
    if (!resp?.data?.ok) {
      throw new Error(resp?.data?.error || "Update failed");
    }

    return resp.data.user; // updated user object
  } catch (error) {
    throw new Error(
      extractMessage(error, "Profile update failed. Please try again.")
    );
  }
};
