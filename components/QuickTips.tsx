'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

export default function QuickTips() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    {
      title: "Quick Add",
      description: "Press '/' on any screen to quickly add a new task.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: "Categories",
      description: "Organize tasks by selecting different categories.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Task Progress",
      description: "Check off completed tasks to track your progress.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          variant="primary"
          size="lg"
          rounded="full"
          className="shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Button>
      </motion.div>

      {/* Quick tips modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-lg border border-white/10 rounded-xl w-full max-w-md shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gradient">Quick Tips</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    rounded="full"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentTip}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center mb-6 text-center flex-col"
                  >
                    <div className="glass-effect rounded-full p-3 mb-4 text-blue-400">
                      {tips[currentTip].icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{tips[currentTip].title}</h3>
                    <p className="text-gray-300">{tips[currentTip].description}</p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-between items-center mt-6">
                  {/* Dots navigation */}
                  <div className="flex space-x-1.5">
                    {tips.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentTip === index ? 'bg-blue-500 w-6' : 'bg-gray-500/50 w-2'
                        }`}
                        onClick={() => setCurrentTip(index)}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      rounded="full"
                      onClick={prevTip}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      rounded="full"
                      onClick={nextTip}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
