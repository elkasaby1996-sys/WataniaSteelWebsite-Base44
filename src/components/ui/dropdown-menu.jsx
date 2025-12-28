import React from 'react';
import { cn } from '@/utils';

function DropdownMenu({ className, children, ...props }) {
  return (
    <div className={cn('relative inline-flex group', className)} {...props}>
      {children}
    </div>
  );
}

function DropdownMenuTrigger({ asChild, children, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(children.props.className, props.className),
    });
  }

  return (
    <button type="button" className={cn('inline-flex items-center', props.className)} {...props}>
      {children}
    </button>
  );
}

function DropdownMenuContent({ className, children, align = 'start', ...props }) {
  const alignment = align === 'end' ? 'right-0' : 'left-0';
  return (
    <div
      className={cn(
        'absolute z-50 mt-2 hidden min-w-[10rem] rounded-md border border-gray-200 bg-white p-2 text-sm shadow-lg group-hover:block',
        alignment,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({ asChild, className, children, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(
        'flex w-full cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100',
        children.props.className,
        className
      ),
    });
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
