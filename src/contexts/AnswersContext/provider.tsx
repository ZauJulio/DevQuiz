import { ReactNode, useState, useContext } from "react";
import { getAltLetter } from "../../utils";
import { QuestionsContext } from "../QuestionsContext/context";
import { AnswersContext } from "./context";

interface AnswersContextProviderProps {
  children?: ReactNode;
}

export function AnswersContextProvider(props: AnswersContextProviderProps) {
  const questionsCtx = useContext(QuestionsContext);

  const [anserws, setAnserws] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  function onChangeAnswer(answer: string) {
    anserws[questionsCtx.currentQuestionIndex] = answer;

    setAnserws(anserws);
    setSelectedAnswer(answer);
  }

  function getCorrectAnswer(index: number) {
    // :: Found in API ::
    // Bug 1: Sometimesthe API returnsan incorrect answer in
    // attribute correct_answer returning the correct answerin the attribute
    // correct_answers.
    //
    // Bug 2: A bug found where there was no correct alternative in
    // correct_ansewers but rather in correct_answer.
    //
    const question = questionsCtx.questions[index];

    let correctAnswer = Object.keys(question.correct_answers).find(
      (answer: string) =>
        JSON.parse(question.correct_answers[answer].toLowerCase())
    );

    return correctAnswer ?? question.correct_answer;
  }

  function totalHits() {
    return anserws.filter(
      (answer, index) => getAltLetter(answer) === getAltLetter(getCorrectAnswer(index))
    ).length;
  }

  function resetCurrentSelectedAnswer() {
    setSelectedAnswer("");
  }

  function resetAnswers() {
    setAnserws(questionsCtx.questions.map(() => ""));
  }

  return (
    <AnswersContext.Provider
      value={{
        anserws,
        selectedAnswer,
        getCorrectAnswer,
        totalHits,
        onChangeAnswer,
        resetAnswers,
        resetCurrentSelectedAnswer,
      }}
    >
      {props.children}
    </AnswersContext.Provider>
  );
}
