'use client';

import { Category } from '@/types';
import { motion } from 'framer-motion';

interface MobileNavigationProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export default function MobileNavigation({ categories, activeCategory, onCategoryClick }: MobileNavigationProps) {
  return (
    <motion.nav 
      className="md:hidden fixed bottom-0 w-full glass-effect-dark backdrop-blur-lg border-t border-white/10 px-2 py-1.5 z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div 
        className="flex justify-around"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg ${
              activeCategory === category.id
                ? 'bg-gradient-to-b from-neon-blue/20 to-neon-purple/10 text-white border border-white/10'
                : 'text-gray-400'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <CategoryIcon activeCategory={activeCategory} categoryId={category.id} />
            <motion.span 
              className="text-xs mt-1"
              whileHover={{ y: -2 }}
            >
              {category.name}
            </motion.span>
            {activeCategory === category.id && (
              <motion.div 
                layoutId="nav-active-indicator"
                className="absolute bottom-1 w-10 h-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </motion.nav>
  );
}

interface CategoryIconProps {
  activeCategory: string;
  categoryId: string;
}

function CategoryIcon({ activeCategory, categoryId }: CategoryIconProps) {
  const isActive = activeCategory === categoryId;
  const color = isActive ? "text-neon-blue" : "text-gray-400";
  
  switch(categoryId) {
    case '1': // All Tasks
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case '2': // Work
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case '3': // Personal
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case '4': // Other
      return (
        <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      );
    default:
      return null;
  }
}
