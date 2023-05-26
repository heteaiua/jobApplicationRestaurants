import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./auth/signup/SignUp";
import Login from "./auth/login/Login";
import Home from "./components/Home/Home";
import Restaurants from "./pages/Restaurant/Restaurant";
import Orders from "./pages/Order/Order";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Restaurant" element={<Restaurants />} />
        <Route path="/Order" element={<Orders />} />
      </Routes>
    </>
  );
}
export default App;
