const API_URL = "http://localhost:3000";

// ---------------- GET LIST ----------------
export const getCompanies = async () => {
  const res = await fetch(`${API_URL}/clients`);
  return res.json();
};

// ---------------- STATS ----------------
export const getSystemStats = async () => {
  const res = await fetch(`${API_URL}/clients/stats`);
  return res.json();
};

// ---------------- ADD COMPANY ----------------
export const onboardCompany = async (payload) => {
  const res = await fetch(`${API_URL}/clients/onboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return { ok: res.ok, data: await res.json() };
};

// ---------------- UPDATE MODULES ----------------
export const updateCompanyModules = async (id, modules) => {
  return fetch(`${API_URL}/clients/${id}/modules`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modules }),
  }).then((r) => r.json());
};

// ---------------- STATUS TOGGLE ----------------
export const updateCompanyStatus = async (id, status) => {
  return fetch(`${API_URL}/clients/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).then((r) => r.json());
};

// ---------------- DELETE / OFFLOAD ----------------
export const removeCompany = async (id, mode) => {
  const res = await fetch(`${API_URL}/clients/${id}?mode=${mode}`, {
    method: "DELETE"
  });

  return { ok: res.ok, data: await res.json() };
};


