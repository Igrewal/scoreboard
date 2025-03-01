import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import AdminStart from "./pages/adminstart";
import Scoreboard from "./pages/scoreboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Admin />} />
        <Route path="/adminstart/:code" element={<AdminStart />} />
        <Route path="/scoreboard/:code" element={<Scoreboard />} />
      </Routes>
    </Router>
  );
};

export default App;
