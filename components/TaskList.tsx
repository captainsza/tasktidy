'use client';

import { Task, Category } from '@/types';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  activeCategory: string;
  onToggleCompletion: (taskId: string) => void;
}

export default function TaskList({ tasks, categories, activeCategory, onToggleCompletion }: TaskListProps) {
  const filteredTasks = activeCategory === '1' 
    ? tasks 
    : tasks.filter(task => task.category === activeCategory);

  const completedTasks = filteredTasks.filter(task => task.completed);
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  
  const categoryName = categories.find(c => c.id === activeCategory)?.name || 'Tasks';
  const completionPercentage = filteredTasks.length > 0 
    ? Math.round((completedTasks.length / filteredTasks.length) * 100) 
    : 0;

  return (
    <Card variant="glass" padding="lg" hover="none" className="mb-20 md:mb-6">
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle className="text-xl text-gradient font-bold">
          {categoryName}
        </CardTitle>
        
        {filteredTasks.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-300">
              <span className="font-medium">{completedTasks.length}</span>
              <span className="mx-1">/</span>
              <span>{filteredTasks.length}</span>
            </div>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {filteredTasks.length === 0 ? (
          <motion.div 
            className="text-center py-10 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg className="mx-auto h-12 w-12 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium">No tasks found</p>
            <p className="mt-1">Add your first task to get started</p>
          </motion.div>
        ) : (
          <motion.div layout>
            {pendingTasks.length > 0 && (
              <>
                <motion.h3 
                  className="text-sm font-medium text-gray-300 mb-3"
                  layout
                >
                  Tasks to do
                </motion.h3>
                <motion.ul 
                  className="space-y-3 mb-6"
                  layout
                >
                  <AnimatePresence>
                    {pendingTasks.map((task) => (
                      <TaskItem 
                        key={task.id} 
                        task={task}
                        categories={categories}
                        onToggleCompletion={onToggleCompletion}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </>
            )}

            {completedTasks.length > 0 && (
              <>
                <motion.h3 
                  className="text-sm font-medium text-gray-400 mb-3"
                  layout
                >
                  Completed
                </motion.h3>
                <motion.ul 
                  className="space-y-2"
                  layout
                >
                  <AnimatePresence>
                    {completedTasks.map((task) => (
                      <TaskItem 
                        key={task.id} 
                        task={task}
                        categories={categories}
                        onToggleCompletion={onToggleCompletion}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
