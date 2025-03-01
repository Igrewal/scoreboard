import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  let navigate = useNavigate();
  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleStart = () => {
    const code = generateCode();
    navigate(`/adminstart/${code}`);
  };

  return (
    <div>
      <h1>Start Page</h1>
      <button onClick={handleStart}>Start Scoreboard Session</button>
    </div>
  );
};

export default Admin;
