'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import CategoryPills from '@/components/CategoryPills'
import BentoGameCard from '@/components/BentoGameCard'
import GameSkeleton from '@/components/GameSkeleton'
import SearchIsland from '@/components/SearchIsland'
import Footer from '@/components/Footer'

// Lazy load FloatingNavigation to improve initial load performance
const FloatingNavigation = lazy(() => import('@/components/FloatingNavigation'))

interface Game {
  name: string
  image: string
  url: string
  genre: string
  players: string
  rating: number
  trending?: boolean
  isNew?: boolean
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport')
          }
        })
      },
      { threshold: 0.1 }
    )

    const gameCards = document.querySelectorAll('.game-card')
    gameCards.forEach((card) => observer.observe(card))

    return () => {
      gameCards.forEach((card) => observer.unobserve(card))
    }
  }, [filteredGames])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games')
        const data = await response.json()
        
        // Transform and enhance games data - moved to useEffect to prevent hydration mismatch
        const enhancedGames = data.map((game: { name: string; image: string; url: string }) => ({
          ...game,
          genre: ['Action', 'Arcade', 'Strategy', 'Puzzle', 'Sports', 'Racing'][Math.floor(Math.random() * 6)],
          players: `${Math.floor(Math.random() * 5000) + 100}`,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
          trending: Math.random() > 0.8,
          isNew: Math.random() > 0.9
        }))
        
        setGames(enhancedGames)
        setFilteredGames(enhancedGames)
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  useEffect(() => {
    let filtered = games
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = games.filter(game => game.genre === selectedCategory)
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredGames(filtered)
  }, [selectedCategory, searchQuery, games])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-space via-surface to-deep-space text-text-primary relative overflow-hidden">
      {/* Enhanced Aurora Light Leaks */}
      <div className="aurora-light aurora-1" />
      <div className="aurora-light aurora-2" />
      <div className="aurora-light aurora-3" />
      
      {/* Film Grain Overlay */}
      <div className="film-grain" />
      
      {/* Geometric Grid Background */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      <Suspense fallback={<div style={{ height: '80px' }} />}>
        <FloatingNavigation 
          onSearchToggle={handleSearchToggle}
          isSearchActive={isSearchActive}
        />
      </Suspense>
      
      {/* Search Island - Only show when search is active */}
      <AnimatePresence>
        {isSearchActive && (
          <SearchIsland 
            onSearch={handleSearch}
            placeholder="Search 293+ educational games..."
          />
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Category Pills */}
        <section id="categories" className="relative">
          <CategoryPills onCategoryChange={handleCategoryChange} />
        </section>

        {/* Enhanced Bento Grid Game Library */}
        <section id="trending" className="relative py-20">
          <div className="container mx-auto px-6">
            {/* Search Results Header */}
            {(searchQuery || selectedCategory !== 'all') && (
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-text-primary mb-2">
                  {searchQuery && (
                    <span className="bg-gradient-to-r from-neon-blue/80 to-neon-purple/80 bg-clip-text text-transparent">
                      {filteredGames.length} Results for &quot;{searchQuery}&quot;
                    </span>
                  )}
                  {!searchQuery && selectedCategory !== 'all' && (
                    <span className="text-text-secondary/80">
                      {selectedCategory} Games
                    </span>
                  )}
                  {!searchQuery && selectedCategory === 'all' && (
                    <span className="text-text-secondary/80">
                      All Games
                    </span>
                  )}
                </h3>
                <p className="text-text-secondary/60">Discover amazing educational games</p>
              </motion.div>
            )}

            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-neon-blue/80 via-neon-purple/80 to-neon-pink/80 bg-clip-text text-transparent neon-text-glow">
                  Game Library
                </span>
              </h2>
              <p className="text-text-secondary/70 text-xl max-w-3xl mx-auto leading-relaxed">
                Explore our curated collection of {filteredGames.length} educational games designed to enhance learning, critical thinking, and problem-solving skills
              </p>
            </motion.div>

            {/* Modern Grid Layout with better spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
              {loading ? (
                // Enhanced skeleton loaders
                Array.from({ length: 20 }).map((_, index) => (
                  <GameSkeleton
                    key={`skeleton-${index}`}
                    size="medium"
                  />
                ))
              ) : (
                // Show actual games with staggered animation
                filteredGames.map((game, index) => (
                  <BentoGameCard
                    key={game.url}
                    game={game}
                    size="medium"
                    index={index}
                  />
                ))
              )}
            </div>

            {/* Enhanced No Results */}
            {!loading && filteredGames.length === 0 && (
              <motion.div
                className="text-center py-24"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="glass-premium border border-white/10 rounded-3xl p-16 max-w-lg mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <span className="text-4xl">🎮</span>
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary mb-4">No Games Found</h3>
                  <p className="text-text-secondary/70 mb-8 text-lg leading-relaxed">
                    {searchQuery && (
                      <>No games found matching &quot;{searchQuery}&quot;. Try different keywords!</>
                    )}
                    {!searchQuery && selectedCategory !== 'all' && (
                      <>No games found in the &quot;{selectedCategory}&quot; category. Explore other categories!</>
                    )}
                    {!searchQuery && selectedCategory === 'all' && (
                      <>No games available at the moment. Check back soon!</>
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          handleSearch('')
                        }}
                        className="conic-border px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                      >
                        <span className="relative z-10 text-text-primary">Clear Search</span>
                      </button>
                    )}
                    {selectedCategory !== 'all' && (
                      <button
                        onClick={() => {
                          setSelectedCategory('all')
                          handleCategoryChange('all')
                        }}
                        className="premium-button px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                      >
                        <span className="relative z-10 text-text-primary">All Categories</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enhanced Stats Section */}
            {!loading && filteredGames.length > 0 && (
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="inline-flex items-center gap-12 glass-premium border border-white/10 rounded-full px-12 py-6 shadow-holographic">
                  <div className="text-center group">
                    <div className="text-4xl font-bold text-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300">{filteredGames.length}</div>
                    <div className="text-text-secondary/70 text-sm uppercase tracking-wide">Games Available</div>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center group">
                    <div className="text-4xl font-bold text-neon-lime mb-2 group-hover:scale-110 transition-transform duration-300">{games.filter(g => g.trending).length}</div>
                    <div className="text-text-secondary/70 text-sm uppercase tracking-wide">Trending Now</div>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center group">
                    <div className="text-4xl font-bold text-neon-purple mb-2 group-hover:scale-110 transition-transform duration-300">{games.filter(g => g.isNew).length}</div>
                    <div className="text-text-secondary/70 text-sm uppercase tracking-wide">New Games</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
