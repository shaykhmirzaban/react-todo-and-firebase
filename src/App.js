import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// CSS
import "./styles.css";

// COMPONENTS
import Boilerplate from "./components/screen/Boilerplate";
import Signup from "./components/screen/Signup";
import Login from "./components/screen/Login";
import Home from "./components/screen/Home";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Boilerplate />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
