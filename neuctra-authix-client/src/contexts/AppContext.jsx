import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [apps, setApps] = useState([]);

  return (
    <AppContext.Provider value={{ apps, setApps }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => useContext(AppContext);
