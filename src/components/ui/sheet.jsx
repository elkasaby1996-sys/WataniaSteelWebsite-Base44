import React from 'react';
import { cn } from '@/utils';

const SheetContext = React.createContext(null);

function Sheet({ open, onOpenChange, children }) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({ asChild, children, ...props }) {
  const context = React.useContext(SheetContext);
  const toggle = () => context?.onOpenChange?.(!context?.open);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (event) => {
        children.props.onClick?.(event);
        toggle();
      },
      className: cn(children.props.className, props.className),
    });
  }

  return (
    <button type="button" onClick={toggle} className={cn('inline-flex items-center', props.className)}>
      {children}
    </button>
  );
}

function SheetContent({ className, side = 'right', children, ...props }) {
  const context = React.useContext(SheetContext);
  if (!context?.open) {
    return null;
  }

  const sideClasses = {
    right: 'right-0 top-0 h-full w-80',
    left: 'left-0 top-0 h-full w-80',
    bottom: 'bottom-0 left-0 w-full h-80',
    top: 'top-0 left-0 w-full h-80',
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={() => context?.onOpenChange?.(false)}
      />
      <div
        className={cn(
          'absolute bg-white shadow-xl p-6 overflow-auto',
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export { Sheet, SheetTrigger, SheetContent };
