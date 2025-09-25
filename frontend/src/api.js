// Determine API base URL from Vite environment variables.
// Prefer VITE_API_BASE_URL (Vite convention), but also support legacy BACKEND_URL if present.
const RAW_BASE = import.meta.env.VITE_API_BASE_URL  || 'https://trustnet.onrender.com';
// Normalize to avoid trailing slash
const API_BASE = RAW_BASE.replace(/\/$/, '');

async function http(url, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

const api = {
  // POST /api/auth/login -> { token, user }
  login: async (email, password) => {
    return http('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // POST /api/auth/register then login to obtain token
  register: async (name, email, password, role) => {
    await http('/api/auth/register', {
      method: 'POST',
      body: { name, email, password, role },
    });
    // Immediately login to get token and user payload
    return http('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // GET /api/dashboard (auth required)
  getDashboard: async (token) => {
    return http('/api/dashboard', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default api;