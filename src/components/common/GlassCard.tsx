import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  glow?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  interactive = false,
  glow = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white/80 dark:bg-slate-900/60
        backdrop-blur-xl
        border border-slate-200/80 dark:border-white/10
        rounded-2xl
        shadow-sm dark:shadow-glass-dark
        transition-all duration-300
        ${interactive ? 'hover:-translate-y-1 hover:border-orange-500/40 dark:hover:border-orange-500/40 hover:shadow-lg dark:hover:shadow-glass-dark-hover active:scale-[0.99] cursor-pointer' : ''}
        ${glow ? 'relative before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-r before:from-orange-500/20 before:to-amber-500/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
