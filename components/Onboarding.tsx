'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to TaskTidy",
      description: "Let's get you set up in just a few quick steps.",
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: "Create Your Tasks",
      description: "Add, organize, and prioritize your tasks with ease.",
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: "Organize by Categories",
      description: "Group your tasks into different categories to stay organized.",
      icon: (
        <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Track Your Progress",
      description: "Monitor your productivity and celebrate your accomplishments.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="glass-effect-dark border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </div>
        
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div 
                className="mb-6 p-4 rounded-full bg-white/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                // Fixed: Removed rotate: [0, 10, 0] and changed to use tween animation
                whileInView={{ rotate: 10 }}
                transition={{ 
                  type: "tween", 
                  duration: 0.5, 
                  ease: "easeInOut",
                  repeat: 1, 
                  repeatType: "reverse" 
                }}
              >
                {steps[step].icon}
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold mb-3 text-gradient"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {steps[step].title}
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 mb-8 max-w-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {steps[step].description}
              </motion.p>
              
              {/* Step indicator dots */}
              <div className="flex space-x-2 mb-8">
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-blue-500' : 'w-2 bg-gray-500'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4">
                {step > 0 && (
                  <Button 
                    variant="ghost" 
                    onClick={prevStep}
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    }
                  >
                    Back
                  </Button>
                )}
                
                <Button 
                  variant="gradient" 
                  onClick={nextStep}
                  rightIcon={step < steps.length - 1 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  ) : undefined}
                >
                  {step < steps.length - 1 ? "Next" : "Get Started"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
