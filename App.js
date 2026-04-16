import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Settings from './components/Settings';
import Score from './components/Score';
import QuestionCard from './components/QuestionCard';

export default function Trivia() {

  // Initializes game variables
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [gameState, setGameState] = React.useState("START_SCREEN");
  const [score, updateScore] = React.useState(0);
  const [highScores, setHighScores] = React.useState([]);
  const [timer, setTimer] = React.useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Dynamically fetches questions when the game starts with the parameters amount, category, and difficulty
 React.useEffect(() => {
  if (gameState === "QUIZ_ACTIVE") {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        if (!data.results || data.results.length === 0) {
          console.error("No questions returned");
          return;
        }
        setAllQuestions(data.results);
      })
      .catch(err => console.error("Fetch error:", err));
  }
}, [gameState]);

  // Uses localStorage for high scores
  React.useEffect(() => {
    const storedScores = localStorage.getItem("highScores");

    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  }, []);
  
  // Initializes variables to display questions
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentQuestion = allQuestions[currentIndex];

  // Sets timer and automatically moves to next question at 0
  React.useEffect(() => {
    if (gameState != "QUIZ_ACTIVE") {
      return;
    }
    setTimer(15);

    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, gameState]);

  React.useEffect(() => {
    if (timer == 0) {
      nextQuestion();
    }
  }, [timer]);

  // Function to shuffle answers
  function fisherYatesShuffle(array) {
    let n = array.length;
    while (n > 1) {
      const randomIndex = Math.floor(Math.random() * n);
      n--;

      [array[n], array[randomIndex]] = [array[randomIndex], array[n]];
    }
    return array;
  }

  function getAnswers(question) {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return fisherYatesShuffle(answers);
  }

  // Checks if the selected answer is correct
  function checkAnswer(answer) {
    if (answer === currentQuestion.correct_answer) {
      updateScore(prev => prev + 1);
    }

    nextQuestion();
  }

  // Moves to the next question or to RESULTS_SCREEN if it's the last question
  function nextQuestion() {
    if (currentIndex + 1 < allQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      saveScore();
      setGameState("RESULTS_SCREEN");
    }
  }

  // Function to save and display scores
  function saveScore() {
    const newScore = {
      score: score
    }

    const updatedScores = [...highScores, newScore];

    updatedScores.sort((a, b) => b.score - a.score);

    const topScores = updatedScores.slice(0, 5);
    setHighScores(topScores);
    localStorage.setItem("highScores", JSON.stringify(topScores));
  }

  // Function to restart
  function startGame()  {
    setCurrentIndex(0);
    updateScore(0);
    setGameState("QUIZ_ACTIVE");
  };

  const answers = React.useMemo(() => {
    if (!currentQuestion) {
      return [];
    }
    return getAnswers(currentQuestion);
  }, [currentQuestion]);

  if (gameState == "START_SCREEN") {
    return (
      <Settings
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        startGame={startGame}
        // highScores={highScores}
      />
    );
  } else if (gameState == "QUIZ_ACTIVE") {
    return (
      allQuestions.length > 0 && allQuestions[currentIndex] && (
      <QuestionCard
        currentQuestion={allQuestions[currentIndex]}
        answers={answers}
        timer={timer}
        onAnswer={checkAnswer}
      />
      )
    );
  } else {
    return (
      <Score
        score={score}
        total={allQuestions.length}
        highScores={highScores}
        restartGame={() => setGameState("START_SCREEN")}
      />
    );
  }

}
