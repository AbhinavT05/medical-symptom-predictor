import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api',
})

export async function fetchSymptoms() {
  const res = await api.get('/symptoms')
  return res.data.symptoms
}

export async function predictDisease(symptoms) {
  const res = await api.post('/predict', { symptoms })
  return res.data
}

export async function fetchModelInfo() {
  const res = await api.get('/model-info')
  return res.data
}