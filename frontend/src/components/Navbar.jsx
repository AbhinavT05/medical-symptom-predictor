import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'Predict',     href: '#predict' },
  { label: 'About Model', href: '#model' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = (href) => {
    setMenuOpen(false)
    onNavigate(href)
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleClick('#home')}
          className="text-blue-600 font-semibold text-lg tracking-tight"
        >
          MediPredict
        </button>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleClick(l.href)}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                  activePage === l.href
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 px-4 py-2">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm mb-1 ${
                activePage === l.href
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
