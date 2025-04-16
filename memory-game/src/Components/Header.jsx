import React from "react";

function Header({ streak, score }) {
  return (
    <div>
      <h2>Memory Game</h2>
      <p>Streak: {streak}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default Header;
