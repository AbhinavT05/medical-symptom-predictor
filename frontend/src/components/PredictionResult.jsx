export default function PredictionResult({ result, onReset }) {
  const { disease, confidence, description, precautions, symptoms_used } = result

  const confidenceColor =
    confidence >= 80 ? 'text-green-600' :
    confidence >= 50 ? 'text-yellow-600' :
    'text-red-500'

  const format = (s) =>
    s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="space-y-5">
      {/* Disease + confidence */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          Predicted Condition
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{disease}</h2>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                confidence >= 80 ? 'bg-green-500' :
                confidence >= 50 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className={`text-sm font-semibold tabular-nums ${confidenceColor}`}>
            {confidence}%
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Confidence score</p>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">About this condition</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Precautions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Recommended precautions</h3>
        <ul className="space-y-2">
          {precautions.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center shrink-0 font-medium">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Symptoms used */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Symptoms analysed
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {symptoms_used.map((s) => (
            <span key={s} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
              {format(s)}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        ⚠️ This tool is for educational purposes only. Always consult a qualified medical professional for diagnosis and treatment.
      </p>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Start over
      </button>
    </div>
  )
}
