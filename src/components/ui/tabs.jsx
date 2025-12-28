import React from 'react';
import { cn } from '@/utils';

const TabsContext = React.createContext(null);

function Tabs({ value, defaultValue, onValueChange, className, ...props }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = value ?? internalValue;

  const setValue = (nextValue) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ activeValue, setValue }}>
      <div className={cn('w-full', className)} {...props} />
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }) {
  return (
    <div
      className={cn('inline-flex h-10 items-center rounded-md bg-gray-100 p-1 text-gray-600', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, value, ...props }) {
  const context = React.useContext(TabsContext);
  const isActive = context?.activeValue === value;
  return (
    <button
      type="button"
      onClick={() => context?.setValue(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
        isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, value, ...props }) {
  const context = React.useContext(TabsContext);
  if (context?.activeValue !== value) {
    return null;
  }

  return <div className={cn('mt-4', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
