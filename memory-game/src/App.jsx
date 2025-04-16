import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Container from "./Components/Container";

function App() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const updateScore = function (score) {
    setScore(score);
  };
  const updateStreak = function (streak) {
    setStreak(streak);
  };
  return (
    <>
      <Header score={score} streak={streak} />
      <Container />
    </>
  );
}

export default App;
