import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Container from "./Components/Container";

function App() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const resetStreak = function () {
    if (streak > score) {
      setScore(streak);
    }
    setStreak(0);
  };
  const addStreak = function () {
    setStreak(streak + 1);
  };
  return (
    <>
      <Header score={score} streak={streak} />
      <Container
        resetStreak={resetStreak}
        addStreak={addStreak}
        score={score}
      />
    </>
  );
}

export default App;
