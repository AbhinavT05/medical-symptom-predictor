export default function Home({ onNavigate }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
        Machine Learning · Random Forest · Scikit-learn
      </span>

      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Medical Symptom<br />Disease Predictor
      </h1>

      <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg mx-auto">
        Select your symptoms and get an instant prediction powered by a Random Forest
        classifier trained on 4,920 patient records across 41 diseases.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
        <button
          onClick={() => onNavigate('#predict')}
          className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start prediction
        </button>
        <button
          onClick={() => onNavigate('#model')}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          About the model
        </button>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {[
          {
            title: '132 Symptoms',
            desc: 'Covers a comprehensive set of medical symptoms from the Kaggle dataset.',
          },
          {
            title: '41 Diseases',
            desc: 'Predicts across 41 disease categories with high accuracy.',
          },
          {
            title: '3 Models Compared',
            desc: 'Decision Tree, KNN, and Random Forest — best one auto-selected.',
          },
        ].map((card) => (
          <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
