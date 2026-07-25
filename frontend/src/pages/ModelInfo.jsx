import { useState, useEffect } from 'react'
import { fetchModelInfo } from '../services/api'

const MODEL_LABELS = {
  decision_tree:  'Decision Tree',
  knn:            'KNN (k=5)',
  random_forest:  'Random Forest',
}

export default function ModelInfo() {
  const [info, setInfo]     = useState(null)
  const [loading, setLoad]  = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    fetchModelInfo()
      .then(setInfo)
      .catch(() => setError('Could not load model info. Is the backend running?'))
      .finally(() => setLoad(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-sm">Loading model info...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const bestAccuracy = info.accuracies[info.best_model]

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">About the Model</h1>
        <p className="text-sm text-gray-500">
          How the predictor was built, trained, and evaluated.
        </p>
      </div>

      {/* Dataset */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Dataset</h2>
        <p className="text-sm text-gray-600 mb-4">{info.dataset}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{info.num_symptoms}</p>
            <p className="text-xs text-gray-500 mt-0.5">Symptom features</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{info.num_diseases}</p>
            <p className="text-xs text-gray-500 mt-0.5">Disease classes</p>
          </div>
        </div>
      </div>

      {/* Model comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Model Comparison</h2>
        <div className="space-y-3">
          {Object.entries(info.accuracies).map(([model, accuracy]) => {
            const isBest   = model === info.best_model
            const pct      = (accuracy * 100).toFixed(1)
            return (
              <div key={model}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">
                      {MODEL_LABELS[model] || model}
                    </span>
                    {isBest && (
                      <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                        selected
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 tabular-nums">
                    {pct}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${isBest ? 'bg-blue-500' : 'bg-gray-300'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Why Random Forest */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Why Random Forest?
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">{info.why_best}</p>
      </div>

      {/* Algorithms */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Algorithms Used</h2>
        <ul className="space-y-2">
          {info.algorithms.map((algo) => (
            <li key={algo} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              {algo}
            </li>
          ))}
        </ul>
      </div>

      {/* Disease list */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Supported Diseases ({info.diseases.length})
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {info.diseases.map((d) => (
            <span
              key={d}
              className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
