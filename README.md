# Fraud Prevention System (Hackathon)

A proof-of-concept web application aimed at helping elderly users and their caregivers detect and prevent fraudulent financial activity. The current implementation focuses on a modern React + Vite frontend with Tailwind CSS, and a placeholder backend to be implemented.


## Tech Stack

- Frontend
  - React 19
  - Vite 7
  - Tailwind CSS 4 (via @tailwindcss/vite plugin)
  - ESLint (React Hooks + React Refresh plugins)
- Backend
  - Node.js (placeholder; not yet implemented)


## Requirements

- Node.js >= 18 (recommended: latest LTS or newer)
- npm >= 9
- OS: Windows/macOS/Linux

Check versions:
- node -v
- npm -v


## Project Structure

```
fraud-prevention-system/
├─ backend/
│  ├─ index.js                # Placeholder (not implemented)
│  └─ package.json            # Backend npm metadata
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/          # UI components (some stubs)
│  │  ├─ api.js               # Mock API (no backend required)
│  │  ├─ App.jsx              # Root app component
│  │  ├─ main.jsx             # React bootstrap
│  │  ├─ index.css            # Tailwind entry (@import "tailwindcss")
│  │  └─ App.css
│  ├─ index.html
│  ├─ vite.config.js          # Vite + React + Tailwind plugin
│  └─ package.json
└─ README.md
```


## Getting Started

### 1) Install dependencies (frontend)

```
cd frontend
npm install
```

### 2) Start development server (frontend)

```
npm run dev
```

Open the printed URL (default: http://localhost:5173).

Note: The app currently uses a mock API (src/api.js). No backend is required for basic flows.


## Frontend Scripts

From the frontend/ directory:

- Development: `npm run dev`
- Build: `npm run build`
- Preview built app: `npm run preview`
- Lint: `npm run lint`


## Tailwind CSS Setup

- Plugin: `@tailwindcss/vite` is configured in `vite.config.js`.
- Entry: `src/index.css` contains `@import "tailwindcss";` which pulls in Tailwind’s base, components, and utilities.
- You can customize styling by adding your own CSS files or using Tailwind utility classes in components.


## Mock API (No backend required)

The app simulates authentication and transactional data in `src/api.js`.

- Login with one of the demo emails (any password):
  - savita@example.com (ELDERLY)
  - rohan@example.com (CAREGIVER)
- register(name, email, password, role) returns a fake token and a user object.
- getDashboard(token) returns mock transactions and user details for the token.

Auth state is stored in localStorage under `authToken` and `authUser`.


## Backend Status

- The backend folder is currently a placeholder. You can implement an API in `backend/index.js` (e.g., Express) and then point the frontend to it (e.g., via fetch or axios). Optionally configure a Vite dev server proxy to avoid CORS during development.

Example next steps (not implemented):
- Backend: `npm init -y && npm i express cors` then implement routes in `backend/index.js`.
- Frontend: create an `.env` and use a base URL, or set up Vite `server.proxy` in `vite.config.js` to proxy `/api` to your backend port.


## Troubleshooting

- Vite error: "Are they installed?"
  - This typically means Vite failed to resolve a module.
  - Ensure local modules are imported with relative paths (e.g., `import api from './api.js'` instead of `import api from 'api'`).
  - Verify dependencies are installed:
    - `npm ls @tailwindcss/vite tailwindcss @vitejs/plugin-react vite --depth=0`
  - If needed, reinstall:
    - `rm -rf node_modules package-lock.json` (macOS/Linux) or delete them via Explorer on Windows
    - `npm install`

- Port already in use
  - Run `npm run dev -- --port 5174` or change the port in `vite.config.js`.

- Node version issues
  - Ensure Node >= 18.
  - If using nvm, switch with `nvm use <version>`.


## Development Notes

- The components `Dashboard.jsx`, `LoginPage.jsx`, and `SignupPage.jsx` are currently stubs/placeholders. Implement them as needed and ensure imports in `App.jsx` match the exported component names.
- In `App.jsx`, ensure handler names used in JSX match function names (e.g., `onLogin={loginHandler}` not `handleLogin`).


## License

ISC (see package metadata).