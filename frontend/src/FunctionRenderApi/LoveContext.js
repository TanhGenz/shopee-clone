import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const LoveContext = createContext();

export const LoveProvider = ({ children }) => {
  const [loveList, setLoveList] = useState([]);

  const addToLove = (product) => {
    const loveIndex = loveList.findIndex(
      (loveItem) => loveItem.id === product.id
    );
    if (loveIndex === -1) {
      setLoveList([...loveList, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = loveList.map((loveItem, index) =>
        index === loveIndex
          ? { ...loveItem, quantity: loveItem.quantity + 1 }
          : loveItem
      );
      setLoveList(updatedCart);
    }
  };

  return (
    <LoveContext.Provider value={{ loveList, addToLove, setLoveList }}>
      {children}
    </LoveContext.Provider>
  );
};
