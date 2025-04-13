'use client';

import { Task, Category } from '@/types';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  categories: Category[];
  onToggleCompletion: (taskId: string) => void;
}

export default function TaskItem({ task, categories, onToggleCompletion }: TaskItemProps) {
  // Format date to MM/DD/YYYY for display
  const formatDateForDisplay = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const categoryName = categories.find(c => c.id === task.category)?.name || 'Unknown';
  const isOverdue = task.dueDate && new Date() > task.dueDate && !task.completed;

  return (
    <motion.li 
      className={`relative flex items-start p-4 rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-md border ${
        task.completed 
          ? 'border-white/5 bg-white/5' 
          : isOverdue 
            ? 'border-neon-pink/20 bg-neon-pink/5' 
            : 'border-white/10 bg-white/5'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: task.completed 
          ? "0 4px 12px rgba(0, 0, 0, 0.1)" 
          : isOverdue 
            ? "0 4px 12px rgba(255, 42, 109, 0.2)" 
            : "0 4px 12px rgba(0, 243, 255, 0.2)"
      }}
      layout
    >
      {/* Background glow effect */}
      {!task.completed && (
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 rounded-xl blur-xl opacity-20 ${
            isOverdue ? 'bg-neon-pink' : 'bg-neon-blue'
          }`} />
        </div>
      )}

      <div className="flex-shrink-0 pt-1">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
            className="appearance-none size-5 rounded-md border-2 border-neon-blue checked:bg-neon-blue checked:border-transparent focus:outline-none focus:ring-0 cursor-pointer transition-colors duration-300"
          />
          {task.completed && (
            <svg 
              className="absolute inset-0 size-5 text-white" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </motion.div>
      </div>

      <div className="ml-3 flex-grow">
        <motion.p 
          className={`text-base transition-all duration-300 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-white'}`}
          animate={{ opacity: task.completed ? 0.6 : 1 }}
        >
          {task.title}
        </motion.p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <motion.span 
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              task.category === '2' ? 'bg-neon-blue/20 text-neon-blue' : 
              task.category === '3' ? 'bg-neon-purple/20 text-neon-purple' :
              'bg-neon-green/20 text-neon-green'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {categoryName}
          </motion.span>
          
          {task.dueDate && (
            <motion.span 
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                isOverdue
                  ? 'bg-neon-pink/20 text-neon-pink'
                  : 'bg-white/10 text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              animate={isOverdue ? { 
                scale: [1, 1.05, 1], 
                transition: { repeat: Infinity, repeatType: "reverse", duration: 1.5 } 
              } : {}}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDateForDisplay(task.dueDate)}
            </motion.span>
          )}
        </div>
      </div>
    </motion.li>
  );
}
