'use client';

import { useRouter } from 'next/navigation';
import WelcomePage from '@/components/WelcomePage';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-navy dark:to-light-navy p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Tailwind Test</h1>
          <p className="text-gray-600 dark:text-gray-300">
            These styles should be applied if Tailwind is working correctly.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="glass-effect dark:glass-effect-dark p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Test Card with Glass Effect</h2>
            <p>This card should have a glass morphism effect with backdrop blur.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Blue Button
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Purple Button
            </button>
          </div>
          
          <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This box should have white background in light mode and dark card background in dark mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
