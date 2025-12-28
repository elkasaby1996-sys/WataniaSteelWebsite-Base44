import React from 'react';
import { cn } from '@/utils';

const SelectContext = React.createContext(null);

function Select({ value, defaultValue, onValueChange, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const activeValue = value ?? internalValue;

  const setValue = (nextValue) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <SelectContext.Provider value={{ value: activeValue, setValue }}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className, children, ...props }) {
  return (
    <div className={cn('flex items-center rounded-md border border-gray-200 bg-white px-3 py-2', className)} {...props}>
      {children}
    </div>
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
  return (
    <div className={cn('mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-lg', className)} {...props}>
      {children}
    </div>
  );
}

function SelectItem({ className, value, children, ...props }) {
  const context = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => context?.setValue(value)}
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
