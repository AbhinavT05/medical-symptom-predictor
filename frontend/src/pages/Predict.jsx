import { useState } from 'react'
import { useSymptoms } from '../hooks/useSymptoms'
import { predictDisease } from '../services/api'
import SymptomSelector from '../components/SymptomSelector'
import PredictionResult from '../components/PredictionResult'

export default function Predict() {
  const { symptoms, loading, error } = useSymptoms()
  const [selected, setSelected]      = useState([])
  const [result, setResult]          = useState(null)
  const [predicting, setPredicting]  = useState(false)
  const [predError, setPredError]    = useState(null)

  const handlePredict = async () => {
    if (selected.length === 0) return
    setPredicting(true)
    setPredError(null)
    try {
      const data = await predictDisease(selected)
      setResult(data)
    } catch (err) {
      setPredError(
        err.response?.data?.detail || 'Prediction failed. Please try again.'
      )
    } finally {
      setPredicting(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setSelected([])
    setPredError(null)
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-sm">Loading symptoms...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Symptom Checker</h1>
      <p className="text-sm text-gray-500 mb-8">
        Select all symptoms you are experiencing, then click Predict.
      </p>

      {result ? (
        <PredictionResult result={result} onReset={handleReset} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <SymptomSelector
            symptoms={symptoms}
            selected={selected}
            onChange={setSelected}
          />

          {predError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-sm text-red-600">{predError}</p>
            </div>
          )}

          <button
            onClick={handlePredict}
            disabled={selected.length === 0 || predicting}
            className="mt-5 w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {predicting ? 'Predicting...' : 'Predict disease'}
          </button>

          {selected.length === 0 && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Select at least one symptom to enable prediction.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
