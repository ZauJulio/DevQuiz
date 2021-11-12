import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Button from "../../components/Button";

import { UserContext } from "../../contexts/UserContext/context";
import { QuestionsContext } from "../../contexts/QuestionsContext/context";

import "./styles.scss";
import { AnswersContext } from "../../contexts/AnswersContext/context";

function Home() {
  const userCtx = useContext(UserContext);
  const questionsCtx = useContext(QuestionsContext);
  const answersCtx = useContext(AnswersContext);

  const navigate = useNavigate();

  const handleStart = () => {
    questionsCtx.updateQuestions().then(() => {
      answersCtx.resetAnswers();
      answersCtx.resetCurrentSelectedAnswer();
      navigate("/quiz");
    });
  };

  return (
    <div className="home-container">
      <Header />

      <main>
        <h1>Welcome to the Quiz App</h1>
        <div className="block username">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            value={userCtx.username}
            onChange={(e) => userCtx.setUsername(e.target.value)}
          />
        </div>

        <div className="block dificulty">
          <label htmlFor="dificulty">Dificulty:</label>

          <div className="btn-container">
            <Button
              onClick={() => userCtx.setDificulty("easy")}
              color={userCtx.dificulty === "easy" ? "#50fa7b" : "#f8f8f2"}
              width="7rem"
              height="2.5rem"
            >
              <span className={"btn-text"}>Easy ✌</span>
            </Button>

            <Button
              onClick={() => userCtx.setDificulty("hard")}
              color={userCtx.dificulty === "easy" ? "#f8f8f2" : "#ff5555"}
              width="7rem"
              height="2.5rem"
            >
              <span className={"btn-text"}>Hard 💪</span>
            </Button>
          </div>
        </div>

        <Button
          onClick={handleStart}
          disabled={userCtx.username.length === 0}
          color="#50fa7b"
          width="25rem"
          height="3rem"
        >
          Start ▶
        </Button>
      </main>
    </div>
  );
}

export default Home;
