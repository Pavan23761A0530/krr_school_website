import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Fee Structure', href: '/fee-structure' },
  { label: 'Transport', href: '/transport' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isNavLinkActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.hash
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.substring(1)
    return location.pathname === href
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-navy-700 rounded-xl flex items-center justify-center group-hover:bg-navy-600 transition-colors">
              <img
                  src="/logo.png"
                  alt="KRR BrightMinds School Logo"
                  className="w-full h-auto object-contain aspect-[4/3]"
                />
            </div>
            <div className="leading-tight">
              <span className="font-heading font-bold text-navy-800 text-lg block">KRR BrightMinds</span>
              <span className="text-[10px] text-navy-500 tracking-wider uppercase">School of Excellence</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isNavLinkActive(link.href)
                      ? 'text-gold-600 bg-navy-50'
                      : 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isNavLinkActive(link.href)
                      ? 'text-gold-600 bg-navy-50'
                      : 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              to="/apply"
              className="ml-3 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Apply Now
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-navy-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-navy-700" /> : <Menu className="w-6 h-6 text-navy-700" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-navy-100 shadow-lg animate-fade-in overflow-y-auto max-h-[calc(100vh-64px)]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    isNavLinkActive(link.href)
                      ? 'text-gold-600 bg-navy-50'
                      : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    isNavLinkActive(link.href)
                      ? 'text-gold-600 bg-navy-50'
                      : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              to="/apply"
              className="block mt-3 mx-4 px-5 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold text-center rounded-xl shadow-md transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
