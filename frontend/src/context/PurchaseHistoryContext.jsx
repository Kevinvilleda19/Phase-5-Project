// PurchaseHistoryContext.jsx
import React, { createContext, useState } from 'react';

export const PurchaseHistoryContext = createContext();

export const PurchaseHistoryProvider = ({ children }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const addPurchase = (items) => {
    const purchase = {
      date: new Date().toLocaleDateString(),
      items,
    };
    setPurchaseHistory((prevHistory) => [...prevHistory, purchase]);
  };

  return (
    <PurchaseHistoryContext.Provider value={{ purchaseHistory, addPurchase }}>
      {children}
    </PurchaseHistoryContext.Provider>
  );
};
