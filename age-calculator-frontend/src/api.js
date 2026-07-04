import axios from 'axios'

// Point this at your Spring Boot backend.
// Create a .env file (see README) to override without touching code.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export function getAge(dob) {
  // GET /age?dob=yyyy-MM-dd -> { years, months, days }
  return api.get('/age', { params: { dob } })
}

export default api
