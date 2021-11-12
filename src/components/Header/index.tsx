import React, { useContext } from "react";
import { QuestionsContext } from "../../contexts/QuestionsContext/context";
import { UserContext } from "../../contexts/UserContext/context";

import "./styles.scss";

function Header() {
  const userCtx = useContext(UserContext);
  const questionsCtx = useContext(QuestionsContext);

  return (
    <div className="header-container">
      <div className={"header-user"}>
        <h1>DevQuiz</h1>
        <h2>
          USER <span>{userCtx.username}</span>
        </h2>
      </div>

      <div className={"questions-container"}>
        {questionsCtx.questions.map((_, index) => (
          <span
            key={index}
            className={`
              ${index <= questionsCtx.currentQuestionIndex ? "active" : ""}
              ${index === questionsCtx.currentQuestionIndex ? "last" : ""}
              question`}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Header;
