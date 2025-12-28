import React from 'react';
import { cn } from '@/utils';

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      'relative inline-flex h-6 w-11 items-center rounded-full border border-gray-200 transition-colors',
      checked ? 'bg-[#7B1F32]' : 'bg-gray-200',
      className
    )}
    {...props}
  >
    <span
      className={cn(
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        checked ? 'translate-x-5' : 'translate-x-1'
      )}
    />
  </button>
));

Switch.displayName = 'Switch';

export { Switch };
