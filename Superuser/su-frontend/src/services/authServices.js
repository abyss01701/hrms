import API, { setAccessToken } from "./api";

export async function loginUser(email, password) {
  const res = await API.post("/auth/login", { email, password });

  const { accessToken, user } = res.data;

  // ACCESS TOKEN ONLY
  setAccessToken(accessToken);
  localStorage.setItem("accessToken", accessToken); // optional, for reloads

  return { user, accessToken };
}

export async function fetchProfile() {
  const res = await API.get("/auth/me");
  return res.data;
}

// Now refresh uses cookies only
export async function refreshTokens() {
  const res = await API.post("/auth/refresh"); // cookie sent automatically

  const { accessToken, user } = res.data;

  setAccessToken(accessToken);
  localStorage.setItem("accessToken", accessToken); // optional

  return { user, accessToken };
}

export async function logoutUser() {
  await API.post("/auth/logout");
  localStorage.removeItem("accessToken");
  setAccessToken(null);
}