import React, { createContext, useState } from "react";

export const LayoutContext: any = createContext({});

export const LayoutContextProvider: React.FC = ({ children }) => {
  const [header, setHeader] = useState("Error");
  return (
    <LayoutContext.Provider value={{ header, setHeader }}>
      {children}
    </LayoutContext.Provider>
  );
};
