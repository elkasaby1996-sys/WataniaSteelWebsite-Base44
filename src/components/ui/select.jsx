import React from 'react';
import { cn } from '@/utils';

const SelectContext = React.createContext(null);

function Select({ value, defaultValue, onValueChange, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);
  const activeValue = value ?? internalValue;

  const setValue = (nextValue) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <SelectContext.Provider value={{ value: activeValue, setValue, open, setOpen }}>
        {children}
      </SelectContext.Provider>
    </div>
  );
}

function SelectTrigger({ className, children, ...props }) {
  const context = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(!context?.open)}
      className={cn(
        'flex w-full items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-left',
        className
      )}
      aria-expanded={context?.open ?? false}
      {...props}
    >
      {children}
    </button>
  );
}

function SelectValue({ placeholder }) {
  const context = React.useContext(SelectContext);
  return (
    <span className="flex-1 text-sm text-gray-700">
      {context?.value || placeholder}
    </span>
  );
}

function SelectContent({ className, children, ...props }) {
  const context = React.useContext(SelectContext);

  if (!context?.open) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute left-0 right-0 mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-lg z-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectItem({ className, value, children, ...props }) {
  const context = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => {
        context?.setValue(value);
        context?.setOpen(false);
      }}
      className={cn(
        'flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
