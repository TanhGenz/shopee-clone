// import "./App.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NavBar from "./components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList/ProductList";
import { CartContext } from "./FunctionRenderApi/CartContext";
import { useState } from "react";
import "./App.css";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import MainPage from "./components/mainPage/MainPage";

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
