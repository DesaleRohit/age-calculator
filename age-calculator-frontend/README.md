# Age Calculator — Frontend

React + Vite + Tailwind CSS UI for your Spring Boot Age Calculator API. Amber/gold
"candlelight" theme, a noise-textured background, and a result card that also
displays backend validation errors (e.g. a future date of birth) inline instead
of a browser alert.

## Setup

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173` — matches the `@CrossOrigin` origin already set
on your `AgeController`.

## Connecting to your backend

The app calls `GET {API_BASE_URL}/age?dob=YYYY-MM-DD` (see `src/api.js`).

By default it points at `http://localhost:8080`. To change it without touching
code, copy `.env.example` to `.env` and edit:

```
VITE_API_BASE_URL=http://localhost:8080
```

No backend code needs to change — this matches your existing `AgeController` /
`AgeService` / `AgeResponse` exactly: `{ years, months, days }` on success, a
plain-text error body on a 400 (e.g. "Date of birth cannot be in the future.").

## Project structure

```
src/
  main.jsx            entry point
  App.jsx             form, fetch call, result/error card
  api.js              axios instance + getAge()
  NoiseBackground.jsx canvas-based decorative background
  index.css           Tailwind entrypoint + reduced-motion handling
tailwind.config.js    amber/gold + error color tokens
```

## Notes

- Day/Month/Year inputs are combined into an ISO `yyyy-MM-dd` string before
  calling the API.
- If the backend rejects the date (e.g. it's in the future), the exact message
  from `IllegalArgumentException` is shown inside the result card — no
  `alert()` popups anywhere in the flow.
- Missing fields are caught client-side with an inline message before any
  request is made.
