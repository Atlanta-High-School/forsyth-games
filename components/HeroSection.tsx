'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, TrendingUp, Users, Star } from 'lucide-react'

interface FeaturedGame {
  name: string
  image: string
  url: string
  players: string
  genre: string
  rating: number
}

export default function HeroSection() {
  const [featuredGame] = useState<FeaturedGame>({
    name: "1v1.LOL",
    image: "logo.png",
    url: "1v1lol",
    players: "2.3K Online",
    genre: "Battle Royale",
    rating: 4.8
  })

  const serverUrl = "https://gms.parcoil.com"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep-space via-surface to-deep-space">
      {/* Enhanced Aurora Light Leaks */}
      <div className="aurora-light aurora-1" />
      <div className="aurora-light aurora-2" />
      <div className="aurora-light aurora-3" />
      
      {/* Film Grain Overlay */}
      <div className="film-grain" />
      
      {/* Geometric Grid Background */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Content */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 glass-premium rounded-full px-6 py-3 shadow-neon-cyan border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-5 h-5 text-neon-lime animate-pulse" />
              <span className="text-neon-lime text-sm font-semibold tracking-wide">TRENDING NOW</span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="flex-shrink-0"
                >
                  <Image 
                    src="https://site.imsglobal.org/sites/default/files/orgs/logos/primary/fcslogo_hexagon.png" 
                    alt="FCS Logo"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-[0_0_20px_rgba(0,245,255,0.6)]"
                  />
                </motion.div>
                <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent neon-text-glow">
                  Forsyth Games
                </span>
              </div>
            </motion.h1>

            <motion.p 
              className="text-2xl text-text-secondary/80 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block mb-2">🎮 Ultimate Educational Gaming Portal</span>
              <span className="text-lg text-text-secondary/60">293+ Educational Games • Brain-Training Arena • Learn Through Play</span>
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => window.location.href = "/#games"}
                className="inline-flex items-center gap-4 premium-button text-text-primary px-10 py-5 rounded-full font-semibold text-xl relative z-10 group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Browse Games</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = "/play?gameurl=1v1lol/"}
                className="inline-flex items-center gap-3 glass-premium border border-white/20 text-text-primary px-10 py-5 rounded-full font-semibold text-xl hover:border-neon-blue/50 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5 group-hover:text-neon-blue transition-colors" />
                <span>Quick Play</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="text-center lg:text-left glass-premium rounded-3xl p-6 border border-white/10 glow-hover group"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-neon-blue mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  293+
                </motion.div>
                <div className="text-text-secondary/70 text-sm uppercase tracking-wide">Educational Games</div>
              </motion.div>
              <motion.div 
                className="text-center lg:text-left glass-premium rounded-3xl p-6 border border-white/10 glow-hover group"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-neon-lime mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                >
                  {featuredGame.players}
                </motion.div>
                <div className="text-text-secondary/70 text-sm uppercase tracking-wide">Players Online</div>
              </motion.div>
              <motion.div 
                className="text-center lg:text-left glass-premium rounded-3xl p-6 border border-white/10 glow-hover group"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-neon-purple mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, type: "spring" }}
                >
                  4.8★
                </motion.div>
                <div className="text-text-secondary/70 text-sm uppercase tracking-wide">User Rating</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Content - Featured Game Card */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative group">
              {/* Enhanced 3D Bento Box */}
              <motion.div 
                className="relative floating-card glass-premium rounded-3xl overflow-hidden border border-white/10 holographic scanline shadow-holographic"
                whileHover={{ 
                  scale: 1.05, 
                  y: -20,
                  rotateX: 6,
                  rotateY: -6
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '2000px'
                }}
              >
                {/* Enhanced Game Image */}
                <div className="relative h-[500px] overflow-hidden">
                  <Image
                    src={`${serverUrl}/${featuredGame.url}/${featuredGame.image}`}
                    alt={featuredGame.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300F2FF;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%238B5CF6;stop-opacity:0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad)'/%3E%3C/svg%3E"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (target.dataset.errorHandled === 'true') return
                      target.dataset.errorHandled = 'true'
                      
                      const alternatives = ['logo.png', 'icon.png', 'thumbnail.png', 'default.png']
                      let tried = 0
                      
                      const tryAlternative = () => {
                        if (tried < alternatives.length) {
                          target.src = `${serverUrl}/${featuredGame.url}/${alternatives[tried]}`
                          tried++
                        } else {
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300F2FF;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%238B5CF6;stop-opacity:0.3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='Sora' font-size='32' font-weight='bold'%3E${featuredGame.name}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='Sora' font-size='18'%3E${featuredGame.genre}%3C/text%3E%3C/svg%3E`
                        }
                      }
                      
                      tryAlternative()
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-transparent to-transparent" />
                  
                  {/* Enhanced Play Button Overlay */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-md"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <motion.button
                      onClick={() => window.location.href = `/play?gameurl=${featuredGame.url}/`}
                      className="premium-button px-10 py-5 rounded-full font-semibold flex items-center gap-4 text-lg shadow-neon-xl"
                      whileHover={{ scale: 1.1, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ 
                        boxShadow: [
                          "0 0 40px rgba(0, 245, 255, 0.6)",
                          "0 0 80px rgba(168, 85, 247, 0.8)",
                          "0 0 40px rgba(0, 245, 255, 0.6)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="relative z-10 flex items-center gap-4 text-text-primary">
                        <Play className="w-6 h-6" />
                        <span>Play Now</span>
                      </span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Enhanced Game Info */}
                <div className="p-8 glass border-t border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-3xl font-bold text-text-primary">{featuredGame.name}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <span className="text-text-secondary/80 text-lg font-semibold">{featuredGame.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-neon-lime" />
                      <span className="text-text-secondary/80 font-medium">{featuredGame.players}</span>
                    </div>
                    <div className="px-4 py-2 glass-premium rounded-full text-neon-purple/90 text-sm font-bold border border-white/10">
                      {featuredGame.genre}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue/40 to-neon-purple/40 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
