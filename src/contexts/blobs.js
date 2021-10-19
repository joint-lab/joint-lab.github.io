import React, { useState, createContext } from "react";

const BlobContext = createContext({active: 'joint-lab'});

const BlobContextProvider = ({ children }) => {
  const [active, setActive] = useState('joint-lab');

  return (
    <BlobContext.Provider value={{ active, setActive }}>
      {children}
    </BlobContext.Provider>
  );
};

export { BlobContext, BlobContextProvider };