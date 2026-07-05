# Age Calculator

An age calculator — enter a date of birth and get the exact number of years, months, and days lived. Built to practice a clean Spring Boot REST API paired with a React frontend.

**Repo:** https://github.com/DesaleRohit/age-calculator

## Features

- Calculates exact age in years, months, and days from a date of birth
- Backend validation rejects a future date of birth with a clear error message
- Frontend shows that error inline in the result card — no browser `alert()` popups
- Responsive UI built with Tailwind CSS

## Tech stack

**Backend**
- Java, Spring Boot
- Spring Web (REST controller)
- Lombok

**Frontend**
- React + Vite
- Tailwind CSS
- Axios

## Project structure

```
age-calculator/
├── age-calculator-backend/          # Spring Boot API
│   └── src/main/java/com/rohit/agecalculator/
│       ├── controller/AgeController.java
│       ├── service/AgeService.java
│       └── model/AgeResponse.java
└── age-calculator-frontend/         # React + Vite app
    └── src/
        ├── App.jsx
        ├── api.js
        └── component/NoiseBackground.jsx
```

## Getting started

### Backend

```bash
cd age-calculator-backend
./mvnw spring-boot:run
```

Runs on `http://localhost:8080` by default.

### Frontend

```bash
cd age-calculator-frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` — this matches the `@CrossOrigin` origin configured on `AgeController`.

By default the frontend calls the API at `http://localhost:8080`. To point it somewhere else, copy `.env.example` to `.env` in the `age-calculator-frontend` folder and set:

```
VITE_API_BASE_URL=http://localhost:8080
```

## Author

**Rohit Desale**
GitHub: [@DesaleRohit](https://github.com/DesaleRohit)