import React from 'react';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, className = '', children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className} data-active-tab={activeTab}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ className = '', children }: TabsListProps) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', children }: TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }) {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-amber-400
        ${className}
        ${value === (className as any).activeTab
          ? 'bg-amber-500 text-purple-900'
          : 'text-purple-200 hover:text-white hover:bg-purple-800/50'}
      `}
      onClick={() => (className as any).setActiveTab?.(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps & { activeTab?: string }) {
  if (value !== (children as any).activeTab) return null;
  return <div>{children}</div>;
}