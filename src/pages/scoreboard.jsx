import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

const Scoreboard = () => {
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
        setPlayerOneName(data.playerOneName);
        setPlayerTwoName(data.playerTwoName);
      }
    });
  }, [code]);

  return (
    <div className="align-middle">
      <h1>Scoreboard</h1>
      <div className="ig-scoreboard-grid">
        <section>
          <h2>{playerOneName}:</h2>
          <h1 className="ig-score-number">{homeScore}</h1>
        </section>
        <section>
          <h2>{playerTwoName}:</h2>
          <h1 className="ig-score-number">{awayScore}</h1>
        </section>
      </div>
    </div>
  );
};

export default Scoreboard;
