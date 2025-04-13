import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "rounded-xl overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 shadow-md",
        glass: "glass-effect-dark shadow-glass border border-white/20 dark:border-white/10",
        gradient: "bg-gradient-to-br from-blue-600/20 to-neon-purple/20 dark:from-blue-900/30 dark:to-neon-purple/30 border border-white/10 dark:border-white/5 shadow-lg",
        outline: "bg-white dark:bg-dark-card border-2 border-neon-blue dark:border-neon-blue/50 shadow-md",
        neon: "bg-dark-navy border border-neon-blue shadow-neon-blue",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-7",
      },
      hover: {
        default: "hover:shadow-lg",
        glow: "hover:shadow-neon-blue dark:hover:shadow-neon-blue",
        scale: "hover:scale-[1.02]",
        none: "",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: "default",
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function Card({ 
  children, 
  variant, 
  padding, 
  hover,
  className = "",
  animate = true
}: CardProps) {

  const cardContent = (
    <div className={cardVariants({ variant, padding, hover, className })}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={hover === 'scale' ? { scale: 1.02 } : undefined}
        className="w-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: CardHeaderProps) {
  return (
    <h3 className={`text-xl font-semibold ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`mt-4 flex items-center ${className}`}>
      {children}
    </div>
  );
}
