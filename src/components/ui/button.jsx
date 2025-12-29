import React from 'react';
import { cn } from '@/utils';

const variantClasses = {
  default: 'bg-[#7B1F32] text-white hover:bg-[#5a1625]',
  outline: 'border border-black bg-white text-[rgb(105,26,42)] hover:bg-gray-100',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
};

const sizeClasses = {
  default: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 text-base',
};

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B1F32] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = 'Button';

export { Button };
