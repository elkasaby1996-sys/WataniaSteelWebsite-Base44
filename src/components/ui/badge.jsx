import React from 'react';
import { cn } from '@/utils';

function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700',
        className
      )}
      {...props}
    />
  );
}

export { Badge };
