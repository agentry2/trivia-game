import React from "react";
import Settings from "./Settings";

export default function Score({ score, total, highScores = [], restartGame }) {
  return (
    <div>
      <h1>Game Over!</h1>
      <p>You scored {score} / {total}</p>

      <h2>High Scores</h2>

      {highScores.length > 0 ? (
        <ul>
          {highScores.map((s, i) => (
            <li key={i}>
              {s.score}/{s.total}
            </li>
          ))}
        </ul>
      ) : (
        <p>No high scores yet</p>
      )}

      <button onClick={restartGame}>Play Again</button>
    </div>
  );
}