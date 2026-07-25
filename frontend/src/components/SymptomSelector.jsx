import { useState } from 'react'

export default function SymptomSelector({ symptoms, selected, onChange }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? symptoms.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : symptoms

  const toggle = (symptom) => {
    if (selected.includes(symptom)) {
      onChange(selected.filter((s) => s !== symptom))
    } else {
      onChange([...selected, symptom])
    }
  }

  const removeTag = (symptom) => {
    onChange(selected.filter((s) => s !== symptom))
  }

  // Format symptom name for display: replace underscores with spaces, title case
  const format = (s) =>
    s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div>
      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1 rounded-full"
            >
              {format(s)}
              <button
                onClick={() => removeTag(s)}
                className="text-blue-400 hover:text-blue-700 leading-none"
                aria-label={`Remove ${s}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <input
        type="text"
        placeholder="Search symptoms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
      />

      {/* Symptom list */}
      <div className="border border-gray-200 rounded-lg overflow-y-auto max-h-64">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No symptoms match your search.</p>
        ) : (
          filtered.map((symptom) => {
            const isSelected = selected.includes(symptom)
            return (
              <button
                key={symptom}
                onClick={() => toggle(symptom)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between border-b border-gray-100 last:border-0 transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{format(symptom)}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )
          })
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {selected.length} symptom{selected.length !== 1 ? 's' : ''} selected · {symptoms.length} total
      </p>
    </div>
  )
}
