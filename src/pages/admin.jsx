import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Admin = () => {
  let navigate = useNavigate();
  const [scoreboardId, setScoreboardId] = new useState("");
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

  const handleJoin = () => {
    navigate(`/scoreboard/${scoreboardId.toUpperCase()}`);
  };

  return (
    <>
      <div className="align-middle">
        <h1>Scoreboard Central</h1>
        <button onClick={handleStart}>Start a new Scoreboard</button>
      </div>
      <div className="align-middle join-text">
        <h4>Watch an Existing Scoreboard</h4>
        <label>5 digit Id:</label>
        <br />
        <input
          className="join-input"
          height={"24px"}
          placeholder="Id"
          maxLength={5}
          onChange={(event) => setScoreboardId(event.target.value)}
        ></input>{" "}
        <br />
        <button onClick={handleJoin}>Join</button>
      </div>
    </>
  );
};

export default Admin;
