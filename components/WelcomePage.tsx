'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import Image from 'next/image';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export default function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      title: "Organize Tasks",
      description: "Keep all your tasks organized and categorized in one place",
      icon: "/icons/organize.svg"
    },
    {
      title: "Track Progress",
      description: "Monitor your productivity with visual progress indicators",
      icon: "/icons/progress.svg"
    },
    {
      title: "Stay Focused",
      description: "Focus on what matters with priority-based task management",
      icon: "/icons/focus.svg"
    }
  ];

  // Change feature every 5 seconds automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Apply dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-dark-navy to-light-navy text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-futuristic-grid opacity-10"></div>
        
        {/* Animated gradient orbs - Fixed by using tween animation type instead of spring */}
        <motion.div 
          className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2],
            x: [0, 30],
            y: [0, -20],
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 15,
            ease: "easeInOut",
            type: "tween"  // Changed from spring to tween
          }}
        />
        
        <motion.div 
          className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.3],
            x: [0, -30],
            y: [0, 20],
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 18,
            ease: "easeInOut",
            type: "tween"  // Changed from spring to tween
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col lg:flex-row items-center">
        {/* Left side - Hero content */}
        <motion.div 
          className="w-full lg:w-1/2 mb-10 lg:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <motion.div 
              className="size-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4"
              animate={{ 
                boxShadow: ["0 0 0px rgba(37, 99, 235, 0)", "0 0 30px rgba(37, 99, 235, 0.6)", "0 0 0px rgba(37, 99, 235, 0)"]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-geist-sans)]">
              Task<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Tidy</span>
            </h1>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Streamline Your Tasks.<br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Maximize Productivity.</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8">
            A modern, beautiful task management application designed to help you organize your life and boost your productivity.
          </p>
          
          <div className="space-x-4">
            <Button 
              variant="gradient" 
              size="lg"
              onClick={onGetStarted}
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
            >
              Get Started
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
        
        {/* Right side - Feature showcase */}
        <motion.div 
          className="w-full lg:w-1/2 lg:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="relative h-[400px] glass-effect-dark rounded-2xl p-1 border border-white/10 shadow-xl overflow-hidden">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            
            {/* Feature Carousel */}
            <div className="relative h-full rounded-xl overflow-hidden">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentFeature === index ? 1 : 0,
                    y: currentFeature === index ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/10 p-4 rounded-full mb-6">
                    <div className="w-16 h-16 relative">
                      {feature.icon && (
                        <Image 
                          src={feature.icon} 
                          alt={feature.title} 
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
              
              {/* Feature indicators */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentFeature === index 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-500/50 hover:bg-gray-400/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats at the bottom */}
      <motion.div 
        className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {[
          { count: "10K+", label: "Active Users" },
          { count: "1M+", label: "Tasks Completed" },
          { count: "99%", label: "Satisfaction Rate" }
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className="glass-effect-dark rounded-xl p-6 text-center border border-white/10"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + (index * 0.2), type: "spring" }}
            >
              {stat.count}
            </motion.div>
            <div className="text-gray-300">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
