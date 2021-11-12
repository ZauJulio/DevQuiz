import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Alternative from "./Alternative";
import Header from "../../components/Header";
import Button from "../../components/Button";

import { QuestionsContext } from "../../contexts/QuestionsContext/context";
import { AnswersContext } from "../../contexts/AnswersContext/context";

import "./styles.scss";

function Quiz() {
  const questionsCtx = useContext(QuestionsContext);
  const answersCtx = useContext(AnswersContext);

  const navigate = useNavigate();
  
  const handleNextQuestion = () => {
    if (questionsCtx.currentQuestionIndex < questionsCtx.questions.length - 1) {
      answersCtx.resetCurrentSelectedAnswer();
      questionsCtx.toNextQuestion();
    } else {
      navigate("/result");
    }
  };

  return (
    <div className={"quiz-container"}>
      <Header />

      <h1 className={"question-index"}>
        Question {questionsCtx.currentQuestionIndex + 1}
      </h1>

      <main>
        <h2 className={"question"}>{questionsCtx.currentQuestion?.question}</h2>

        <ul>
          {Object.keys(questionsCtx.currentQuestion?.answers).map(
            (alt: string) => {
              const answer = questionsCtx.currentQuestion?.answers[alt];

              if (answer) {
                return (
                  <Alternative
                    key={alt}
                    answer={alt}
                    value={answer}
                    selected={answersCtx.selectedAnswer === alt}
                    onSelect={() => answersCtx.onChangeAnswer(alt)}
                  />
                );
              } else {
                return null;
              }
            }
          )}
        </ul>
      </main>

      <Button
        onClick={handleNextQuestion}
        width="5rem"
        height="3rem"
        disabled={answersCtx.selectedAnswer === ""}
      >
        {questionsCtx.currentQuestionIndex < questionsCtx.questions.length - 1
          ? "Next"
          : "Result"}
      </Button>
    </div>
  );
}

export default Quiz;
