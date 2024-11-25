// import "./App.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NavBar from "./components/NavBar/NavBar";
import { useState } from "react";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;