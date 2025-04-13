'use client';

import { useState, useEffect } from 'react';
import { Category, Task } from '@/types';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNavigation from '@/components/MobileNavigation';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import Onboarding from '@/components/Onboarding';
import QuickTips from '@/components/QuickTips';
import { AnimatePresence, motion } from 'framer-motion';
import { useThemeContext } from '@/context/ThemeContext';

export default function Dashboard() {
  // App states
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { darkMode } = useThemeContext(); // Only get darkMode from context
  
  // Sample categories
  const categories: Category[] = [
    { id: '1', name: 'All Tasks' },
    { id: '2', name: 'Work' },
    { id: '3', name: 'Personal' },
    { id: '4', name: 'Other' },
  ];

  // Mock tasks
  const initialTasks: Task[] = [
    { id: '1', title: 'Finish project report', category: '2', completed: false, dueDate: new Date(2023, 11, 15) },
    { id: '2', title: 'Buy groceries', category: '3', completed: true, dueDate: new Date() },
    { id: '3', title: 'Plan summer vacation', category: '4', completed: false },
    { id: '4', title: 'Schedule dentist appointment', category: '3', completed: false, dueDate: new Date(2023, 11, 20) },
    { id: '5', title: 'Research new technologies', category: '2', completed: false, dueDate: new Date(2023, 12, 5) },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeCategory, setActiveCategory] = useState<string>('1');

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Toggle active category
  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  // Add new task
  const addNewTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTaskData.title.trim(),
      category: newTaskData.category,
      completed: false,
      ...(newTaskData.dueDate && { dueDate: newTaskData.dueDate }),
    };
    
    setTasks([...tasks, task]);
  };

  return (
    <>
      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-dark-navy to-light-navy text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-futuristic-grid opacity-10"></div>
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/30 opacity-10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-blue-500/30 opacity-10 blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Header - No longer passing props */}
        <Header />

        {/* Main content area */}
        <div className="relative z-1 flex flex-1 pt-16 pb-16 md:pb-0">
          {/* Sidebar - visible on md and larger screens */}
          <Sidebar 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryClick={handleCategoryClick} 
          />

          {/* Main content */}
          <main className="flex-1 p-4 md:ml-64 transition-all duration-300">
            <motion.div 
              className="container mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Task Form */}
              <TaskForm 
                categories={categories.slice(1)} 
                onAddTask={addNewTask} 
              />
              
              {/* Task List */}
              <TaskList 
                tasks={tasks}
                categories={categories}
                activeCategory={activeCategory}
                onToggleCompletion={toggleTaskCompletion}
              />
            </motion.div>
          </main>
        </div>

        {/* Mobile bottom navigation - visible on smaller screens */}
        <MobileNavigation 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryClick={handleCategoryClick} 
        />
        
        {/* Quick Tips Component */}
        <QuickTips />
      </div>
    </>
  );
}
