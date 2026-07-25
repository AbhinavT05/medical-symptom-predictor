import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Predict from './pages/Predict'
import ModelInfo from './pages/ModelInfo'

const PAGES = {
  '#home':    Home,
  '#predict': Predict,
  '#model':   ModelInfo,
}

export default function App() {
  const [page, setPage] = useState('#home')

  const navigate = (href) => setPage(href)

  const PageComponent = PAGES[page] || Home

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage={page} onNavigate={navigate} />
      <main>
        <PageComponent onNavigate={navigate} />
      </main>
      <footer className="border-t border-gray-200 py-6 mt-10">
        <p className="text-center text-xs text-gray-400">
          MediPredict · Built with FastAPI, React, and Scikit-learn ·{' '}
          <span className="text-gray-300">For educational purposes only</span>
        </p>
      </footer>
    </div>
  )
}
