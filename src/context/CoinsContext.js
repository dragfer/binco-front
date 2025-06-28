import { createContext, useContext, useState } from 'react';

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);

  const updateCoins = (newCoins) => {
    setCoins(newCoins);
  };

  return (
    <CoinsContext.Provider value={{ coins, updateCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};
