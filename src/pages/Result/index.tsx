import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { getAltLetter } from "../../utils";

import Header from "../../components/Header";
import Button from "../../components/Button";

import { AnswersContext } from "../../contexts/AnswersContext/context";
import { QuestionsContext } from "../../contexts/QuestionsContext/context";

import "./styles.scss";

function Result() {
  const questionsCtx = useContext(QuestionsContext);
  const answersCtx = useContext(AnswersContext);

  const navigate = useNavigate();

  const handleRestart = () => {
    questionsCtx.updateQuestions().then(() => {
      answersCtx.resetAnswers();
      answersCtx.resetCurrentSelectedAnswer();
      navigate("/quiz");
    });
  };

  const getCorrectAlt = (index: number) => {
    return answersCtx.getCorrectAnswer(index)?.slice(0, 8) ?? "";
  };

  const getCorrectAltLetter = (index: number) => {
    return getAltLetter(getCorrectAlt(index));
  };

  return (
    <div className={"result-container"}>
      <Header />

      <h1>Result</h1>

      <main>
        <table>
          <thead>
            <tr>
              <td>Question</td>
              <td>Correct Answer</td>
              <td>Your choice</td>
              <td>✔</td>
            </tr>
          </thead>

          <tbody>
            {questionsCtx.questions.map((answer, index) => (
              <tr key={index}>
                {/* Question */}
                <td className={"colum-question"}>
                  {index + 1}
                  <span>. {answer.question}</span>
                </td>

                {/* Correct Answer */}
                <td className={"column-answer"}>
                  {getCorrectAltLetter(index)}.{" "}
                  <span>{answer.answers[getCorrectAlt(index)]}</span>
                </td>

                {/* Selected Alternative */}
                <td className={"column-answer"}>
                  {getAltLetter(answersCtx.anserws[index])}.
                  <span> {answer.answers[answersCtx.anserws[index]]}</span>
                </td>

                {/* Result */}
                <td className={"column-result"}>
                  <span>
                    {getAltLetter(answersCtx.anserws[index]) ===
                    getCorrectAltLetter(index)
                      ? "✔"
                      : "✖"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className={"hits"}>
              <td></td>
              <td></td>
              <td>Total Hits</td>
              <td>{answersCtx.totalHits()}</td>
            </tr>
          </tfoot>
        </table>
      </main>

      <Button className={"restart"} onClick={handleRestart}>
        Restart
      </Button>
    </div>
  );
}

export default Result;
