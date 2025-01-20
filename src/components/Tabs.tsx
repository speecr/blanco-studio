import React from 'react';

interface TabsProps {
  defaultTab: string;
  children: React.ReactNode;
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  id: string;
  children: React.ReactNode;
}

interface TabPanelProps {
  id: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (id: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabList({ children, className = '' }: TabListProps) {
  return (
    <nav className={`space-x-4 ${className}`} aria-label="Tabs">
      {children}
    </nav>
  );
}

export function Tab({ id, children }: TabProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`whitespace-nowrap px-1 py-2 text-sm font-medium border-b-2 ${
        isActive
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

export function TabPanel({ id, children }: TabPanelProps) {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== id) {
    return null;
  }

  return <div>{children}</div>;
}