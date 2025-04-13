'use client';

import { useState, FormEvent } from 'react';
import { Category, Task } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface TaskFormProps {
  categories: Category[];
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export default function TaskForm({ categories, onAddTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    category: '2', // Default to Work category
  });
  const [isExpanded, setIsExpanded] = useState(false);

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  // Date handling
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setNewTask({
        ...newTask,
        dueDate: new Date(value)
      });
    } else {
      const { dueDate, ...rest } = newTask;
      setNewTask(rest);
    }
  };

  // Add new task
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    onAddTask(newTask);
    setNewTask({ 
      title: '', 
      category: newTask.category 
    });
    setIsExpanded(false);
  };

  // Format date to YYYY-MM-DD for input
  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <Card
      variant="glass"
      hover="glow"
      className="mb-6 overflow-visible"
    >
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle className="text-xl text-gradient font-[family-name:var(--font-geist-sans)]">
          Add New Task
        </CardTitle>
        <Button
          variant="glass"
          size="sm"
          rounded="full"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              variant="glass"
              className="w-full text-white"
              required
              placeholder="What needs to be done?"
              leftIcon={
                <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              autoFocus
            />
            <Button
              variant="gradient"
              type="submit"
              disabled={!newTask.title.trim()}
              className="shrink-0"
            >
              Add
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Category
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                    >
                      <select
                        id="category"
                        name="category"
                        value={newTask.category}
                        onChange={handleInputChange}
                        className="w-full glass-effect-dark border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neon-blue transition-all duration-300"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Due Date (Optional)
                    </label>
                    <Input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formatDateForInput(newTask.dueDate)}
                      onChange={handleDateChange}
                      variant="glass"
                      className="text-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>
    </Card>
  );
}
