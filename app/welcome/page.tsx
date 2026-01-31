'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Gamepad2 } from 'lucide-react'

export default function WelcomePage() {
  useEffect(() => {
    // Auto redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = '/'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-deep-space text-text-primary relative overflow-hidden flex items-center justify-center">
      {/* Aurora Light Leaks */}
      <div className="aurora-light aurora-1" />
      <div className="aurora-light aurora-2" />
      <div className="aurora-light aurora-3" />
      
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Welcome Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center shadow-glow animate-pulse-glow">
            <Gamepad2 className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent text-glow">
              Welcome to
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent text-glow animate-gradient">
              Forsyth Games
            </span>
          </h2>
          
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto text-glow-subtle">
            Your ultimate educational gaming portal with 293+ brain-training games
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <motion.div
              className="w-16 h-16 border-4 border-neon-blue/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-neon-blue rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-neon-blue animate-spin" />
          </div>
          
          <motion.p
            className="text-text-secondary text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Redirecting to main page...
          </motion.p>
          
          <motion.div
            className="flex gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-neon-blue rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Skip Link */}
        <motion.a
          href="/"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass glass-hover border border-white/10 px-6 py-3 rounded-full text-text-primary hover:text-neon-blue transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip to Main Site
        </motion.a>
      </div>
    </div>
  )
}
