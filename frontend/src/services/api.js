import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function fetchSymptoms() {
  const res = await api.get('/symptoms')
  return res.data.symptoms  // string[]
}

export async function predictDisease(symptoms) {
  const res = await api.post('/predict', { symptoms })
  return res.data
}

export async function fetchModelInfo() {
  const res = await api.get('/model-info')
  return res.data
}
