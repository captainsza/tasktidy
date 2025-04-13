import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'glass' | 'minimal' | 'neon';
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = "", variant = 'default', containerClassName = "", ...props }, ref) => {

    // Define variant styles
    const variantStyles = {
      default: "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-neon-blue focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-neon-blue/20",
      glass: "glass-effect dark:glass-effect-dark border border-white/20 dark:border-white/10 focus:border-white/40 dark:focus:border-white/30 backdrop-blur-md",
      minimal: "border-b-2 border-gray-300 dark:border-gray-600 bg-transparent focus:border-blue-500 dark:focus:border-neon-blue focus:ring-0",
      neon: "border-2 border-neon-blue bg-dark-navy text-neon-blue focus:shadow-neon-blue",
    };

    return (
      <div className={`flex flex-col space-y-1.5 ${containerClassName}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-md ${variantStyles[variant]} px-4 py-2 text-gray-800 dark:text-gray-200 ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${className} transition-all duration-300`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
