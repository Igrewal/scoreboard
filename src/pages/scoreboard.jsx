import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

const Scoreboard = () => {
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

  return (
    <div>
      <h1>Scoreboard</h1>
      <div>
        <h2>Home: {homeScore}</h2>
        <h2>Away: {awayScore}</h2>
      </div>
    </div>
  );
};

export default Scoreboard;
