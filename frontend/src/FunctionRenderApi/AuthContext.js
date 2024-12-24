import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mặc định chưa đăng nhập
  const [user, setUser] = useState(null); // Dữ liệu người dùng hoặc token

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Lưu thông tin người dùng (nếu cần)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null); // Xóa thông tin người dùng
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
