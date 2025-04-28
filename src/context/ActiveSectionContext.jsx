import React, { createContext, useState } from 'react';

// Create context with initial state
export const ActiveSectionContext = createContext({
  activeSection: 'hero',
  setActiveSection: () => {},
});

// Provider component to wrap around the app
export const ActiveSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};