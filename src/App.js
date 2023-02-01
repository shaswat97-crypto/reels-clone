import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { AuthContext, AuthProvider } from './Context/AuthContext';
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Feed from './Components/Feed';
import Privateroute from './Components/Privateroute';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Privateroute path='/' element={<Feed />}></Privateroute>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}
export default App;
