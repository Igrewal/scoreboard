import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, set, onValue } from "firebase/database";

const AdminStart = () => {
  const { code } = useParams();
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    const scoreRef = ref(database, `scores/${code}`);
    onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHomeScore(data.home);
        setAwayScore(data.away);
      }
    });
  }, [code]);

  const updateScore = (team, score) => {
    const scoreRef = ref(database, `scores/${code}`);
    set(scoreRef, {
      home: team === "home" ? score : homeScore,
      away: team === "away" ? score : awayScore,
    });
  };

  const resetScores = () => {
    const scoreRef = ref(database, `scores/${code}`);
    set(scoreRef, {
      home: 0,
      away: 0,
    });
  };

  return (
    <div>
      <h1>Scoreboard Control Center</h1>
      <div>
        <h2>Home Score: {homeScore}</h2>
        <button onClick={() => updateScore("home", homeScore + 1)}>
          Increment Home
        </button>
      </div>
      <div>
        <h2>Away Score: {awayScore}</h2>
        <button onClick={() => updateScore("away", awayScore + 1)}>
          Increment Away
        </button>
      </div>
      <button onClick={resetScores}>Reset Scores</button>
    </div>
  );
};

export default AdminStart;
