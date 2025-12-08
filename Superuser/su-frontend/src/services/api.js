import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // required for cookies
});

// Dynamically attach JWT to all requests
export function setAccessToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

/* ============================================================
   GLOBAL INTERCEPTOR — Handles expired tokens & auto-logout
   ============================================================ */
API.interceptors.response.use(
  (response) => response, // pass through if OK

  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Token expired OR invalid OR unauthorized
      if (status === 401 || status === 403) {
        console.warn("Session expired or unauthorized. Redirecting to login…");

        // Clear stored JWT
        localStorage.removeItem("accessToken");

        // Remove from axios auth header
        setAccessToken(null);

        // Hard redirect so React Router re-initializes session
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
