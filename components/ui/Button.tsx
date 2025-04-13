import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'default' | 'full' | 'none';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'default',
  className = '',
  isLoading,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  // Classes based on variant
  const variantClasses = {
    primary: "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md hover:shadow-blue-400/20",
    secondary: "bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md hover:shadow-purple-400/20",
    outline: "border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-white/10",
    glass: "glass-effect-dark text-white backdrop-blur-md",
    gradient: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
  };

  // Classes based on size
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-lg px-6 py-3"
  };

  // Classes based on rounded
  const roundedClasses = {
    default: "rounded-md",
    full: "rounded-full",
    none: "rounded-none"
  };

  return (
    <motion.button
      className={`relative ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 transform hover:-translate-y-0.5 ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      <div className="flex items-center justify-center">
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </motion.button>
  );
}
