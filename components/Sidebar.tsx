'use client';

import { Category } from '@/types';
import { motion } from 'framer-motion';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export default function Sidebar({ categories, activeCategory, onCategoryClick }: SidebarProps) {
  return (
    <motion.aside 
      className="hidden md:block w-64 glass-effect-dark backdrop-blur-lg border-r border-white/10 p-4 fixed h-full z-10"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{ top: 0, bottom: 0, left: 0 }}
    >
      <div className="pt-20 pb-4 h-full overflow-y-auto">
        <motion.h2 
          className="text-lg font-semibold mb-6 text-gradient font-[family-name:var(--font-geist-sans)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Categories
        </motion.h2>
        
        <nav className="space-y-2">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white font-medium border border-white/10 shadow-lg'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
              whileHover={{ 
                x: 4, 
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.3 + index * 0.1 }
              }}
            >
              <CategoryIcon activeCategory={activeCategory} categoryId={category.id} />
              <span className="ml-3">{category.name}</span>
              
              {activeCategory === category.id && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
        
        <motion.div 
          className="mt-8 px-4 py-6 rounded-lg border border-white/10 bg-gradient-to-br from-purple-600/10 to-blue-500/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm font-medium text-white mb-2">Task Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Completed</span>
              <span className="text-green-400">12/20</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}

interface CategoryIconProps {
  activeCategory: string;
  categoryId: string;
}

function CategoryIcon({ activeCategory, categoryId }: CategoryIconProps) {
  const isActive = activeCategory === categoryId;
  const color = isActive ? "text-blue-400" : "text-gray-400";
  
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
