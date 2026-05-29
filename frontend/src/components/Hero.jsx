import { useState, useEffect } from 'react'
import { Shield, BookOpen, Hop as Home, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const trustBadges = [
  { icon: BookOpen, label: 'CBSE Curriculum' },
  { icon: Shield, label: 'Safe Campus' },
  { icon: Home, label: 'Hostel Facility' },
  { icon: Monitor, label: 'Smart Learning' },
]

const heroImages = [
  {
    url: '/hero1.jpg',
    alt: 'Students studying at KRR BrightMinds School'
  },
  {
    url: '/hero2.jpg',
    alt: 'School campus and infrastructure'
  },
  {
    url: '/sports.png',
    alt: 'Extracurricular activities at KRR'
  }
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[85vh] py-12 lg:py-16 gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">CBSE Affiliated | Estd. 2008</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Building Bright Futures Through{' '}
              <span className="text-gold-400">Quality Education</span>
            </h1>

            <p className="text-lg sm:text-xl text-navy-200 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              A safe, modern, value-based learning environment where every child
              is nurtured to succeed academically and personally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                Apply for Admission
              </Link>
             
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {trustBadges.map((badge, i) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2.5 animation-delay-${(i + 1) * 100}`}
                >
                  <badge.icon className="w-5 h-5 text-gold-400 shrink-0" />
                  <span className="text-white/90 text-xs sm:text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-xl animate-fade-in-up animation-delay-300">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold-400/20 to-navy-400/20 rounded-3xl blur-2xl" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-fade-in animation-delay-600 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-navy-800">A+</div>
                    <div className="text-xs text-navy-500">CBSE Grade</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
