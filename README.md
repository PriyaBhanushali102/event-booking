# Event Booking — Frontend (React)

Scaffolded with Vite (React) and Tailwind. Uses Redux Toolkit for state, react-hook-form + zod for validation, and is structured with clean architecture in mind.

Quick start

1. cd client
2. npm install
3. npm run dev

Next steps

- Configure environment using `.env` or `.env.local` (see `.env.example`)
- Start backend server and set `VITE_API_URL` accordingly
- Run `npm run dev` and visit http://localhost:5173

Features implemented

- Auth (signup/login/profile) with JWT stored in localStorage
- Events listing, details, and admin management
- Booking flow (checkout and booking history)
- Redux Toolkit slices with createAsyncThunk and full pending/fulfilled/rejected handling
- Axios instance with token interceptor at `src/services/api.js`
- shadcn-style components (Dialog, Buttons), Tailwind layout
- Basic tests with Vitest and React Testing Library
