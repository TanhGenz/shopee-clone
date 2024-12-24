// import "./App.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NavBar from "./components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ProductList from "./components/ProductList/ProductList";
import { CartContext, CartProvider } from "./FunctionRenderApi/CartContext";
import { useContext, useState } from "react";
import CheckOut from "./components/checkout/CheckOut";
import "./App.css";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import MainPage from "./components/mainPage/MainPage";
import ZaloButton from "./components/zaloButton/ZaloButton";
import { LoveProvider } from "./FunctionRenderApi/LoveContext";
import { AuthProvider } from "./FunctionRenderApi/AuthContext";
function App() {
  return (
    <CartProvider>
      <LoveProvider>
        <Router>
          <NavBar />
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Login />} />
              <Route path="/ProductList" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/CheckOut" element={<CheckOut />} />
            </Routes>
          </div>
        </Router>
      </LoveProvider>
    </CartProvider>
  );
}

export default App;
