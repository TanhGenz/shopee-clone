import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const LoveContext = createContext();

export const LoveProvider = ({ children }) => {
  const [loveList, setLoveList] = useState([]);

  const addToLove = (item) => {
    setLoveList((prev) => {
      if (!prev.some((product) => product.id === item.id)) {
        return [...prev, item];
      }
      return prev; // Nếu đã tồn tại, không thêm lại
    });
  };

  const removeFromLove = (itemId) => {
    setLoveList((prev) => prev.filter((product) => product.id !== itemId));
  };

  return (
    <LoveContext.Provider value={{ loveList, addToLove, removeFromLove }}>
      {children}
    </LoveContext.Provider>
  );
};
