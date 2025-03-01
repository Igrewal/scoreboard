import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, set, onValue } from "firebase/database";

const AdminStart = () => {
  const { code } = useParams();
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [playerOneName, setPlayerOneName] = useState("Home");
  const [playerTwoName, setPlayerTwoName] = useState("Visitor");

  useEffect(() => {
    const scoreRef = ref(database, `scores/${code}`);
    onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHomeScore(data.home);
        setAwayScore(data.away);
        setPlayerOneName(data.playerOneName || "Home");
        setPlayerTwoName(data.playerTwoName || "Visitor");
      }
    });
  }, [code]);

  const updateScore = (team, score) => {
    const scoreRef = ref(database, `scores/${code}`);
    set(scoreRef, {
      home: team === "home" ? score : homeScore,
      away: team === "away" ? score : awayScore,
      playerOneName: playerOneName,
      playerTwoName: playerTwoName,
    });
  };

  const updateLabel = (team, label) => {
    const scoreRef = ref(database, `scores/${code}`);
    set(scoreRef, {
      home: homeScore,
      away: awayScore,
      playerOneName: team === "home" ? label : playerOneName,
      playerTwoName: team === "away" ? label : playerTwoName,
    });
  };

  const resetScores = () => {
    const scoreRef = ref(database, `scores/${code}`);
    set(scoreRef, {
      home: 0,
      away: 0,
      playerOneName: playerOneName,
      playerTwoName: playerTwoName,
    });
  };

  return (
    <div className="align-middle">
      <h2>Admin Center</h2>
      <h1>ID: {code}</h1>
      <div className="ig-scoreboard-grid">
        <div>
          <input
            className="player-input"
            type="text"
            value={playerOneName}
            onChange={(e) => {
              setPlayerOneName(e.target.value);
              updateLabel("home", e.target.value);
            }}
          />
          <h1 className="ig-score-number">{homeScore}</h1>
          <button onClick={() => updateScore("home", homeScore + 1)}>
            Increment
            <br />
            {playerOneName}
          </button>
        </div>
        <div>
          <input
            className="player-input"
            type="text"
            value={playerTwoName}
            onChange={(e) => {
              setPlayerTwoName(e.target.value);
              updateLabel("away", e.target.value);
            }}
          />
          <h1 className="ig-score-number">{awayScore}</h1>
          <button onClick={() => updateScore("away", awayScore + 1)}>
            Increment
            <br />
            {playerTwoName}
          </button>
        </div>
      </div>
      <div className="align-middle">
        <button onClick={resetScores}>Reset Scores</button>
      </div>
      <div>
        <br />
        Click here for your scoreboard:&nbsp;
        <Link to={{ pathname: `/scoreboard/${code}` }} target="_blank">
          Scoreboard Client
        </Link>
        <p>
          or go to this url:
          <span>
            <strong>
              {document.URL.toUpperCase().replace("ADMINSTART", "SCOREBOARD")}
            </strong>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminStart;
