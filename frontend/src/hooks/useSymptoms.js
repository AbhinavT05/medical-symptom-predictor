import { useState, useEffect } from 'react'
import { fetchSymptoms } from '../services/api'

export function useSymptoms() {
  const [symptoms, setSymptoms] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    fetchSymptoms()
      .then(setSymptoms)
      .catch(() => setError('Could not load symptoms. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return { symptoms, loading, error }
}
