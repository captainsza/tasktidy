'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import Link from 'next/link';
import { useThemeContext } from '@/context/ThemeContext';
import { useEffect } from 'react';

export default function Header() {
  // Get theme context
  const { darkMode, toggleDarkMode } = useThemeContext();
  
  // Debug log when component renders
  useEffect(() => {
    console.log("Header rendered with darkMode:", darkMode);
  }, [darkMode]);
  
  // Function to handle theme toggle with debugging
  const handleThemeToggle = () => {
    console.log("Theme toggle button clicked, current state:", darkMode);
    toggleDarkMode();
  };

  return (
    <motion.header 
      className="fixed top-0 w-full glass-effect-dark backdrop-blur-lg shadow-md border-b border-white/10 z-20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        damping: 20,
        stiffness: 100
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/">
            <motion.div 
              className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              animate={{ 
                boxShadow: ["0 0 0px rgba(0, 243, 255, 0)", "0 0 20px rgba(37, 99, 235, 0.6)"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween"
              }}
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </Link>
          <motion.h1 
            className="text-2xl font-bold text-gradient font-[family-name:var(--font-geist-sans)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            TaskTidy
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-2"
        >
          <span className="text-xs text-gray-400">
            Mode: {darkMode ? 'Dark' : 'Light'}
          </span>
          
          <Button
            variant="glass"
            size="sm"
            rounded="full"
            onClick={handleThemeToggle}
            aria-label="Toggle dark mode"
            className="relative overflow-hidden group"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
