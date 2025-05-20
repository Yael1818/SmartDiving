import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import DataEntry from "./components/DataEntry";
import SignUp from "./components/SignUp";
import { Link } from 'react-router-dom';
import './App.css';
const App = () => {
  return (
   

    <Router>
       <header dir="rtl" className="header">
   
    <nav className="nav-links">
      <Link to="/dataEntry">הכנסת נתונים</Link>
      <Link to="/signup">הרשמה</Link>
      <Link to="/login">התחברות</Link>
    </nav>
    <img src='src/assets/logo.jpg' alt="Logo" className="logo" />
  </header>
      <Routes>
        <Route path="/" element={<Home />} /> {/* דף ברירת המחדל */}
        <Route path="/signup" element={<SignUp/> }/>  {/* ���� הרשמה */}
        <Route path="/login" element={<Login/> }/>
        <Route path="/home" element={<Home/>} />
        <Route path="/dataEntry" element={<DataEntry/>} />
      </Routes>
      <footer className="footer">
        <p>© 2025 כל הזכויות שמורות | <a href="https://yourwebsite.com">האתר שלנו</a></p>
      </footer>
    </Router>
  );
};

export default App;
