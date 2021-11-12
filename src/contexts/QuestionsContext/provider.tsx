import { ReactNode, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as api from "../../lib/api";
import { UserContext } from "../UserContext/context";
import { QuestionsContext } from "./context";

import { Question } from "../../types";

const N_QUESTIONS = 10;
const N_ALTERNATIVES = 4;

interface QuestionsContextProviderProps {
  children?: ReactNode;
}

function filterNotNullAnswers(question: Question) {
  return Object.keys(question.answers).filter((_anserw) => {
    return question.answers[_anserw] !== null;
  });
}

async function fetchQuestions(dificulty: string) {
  let questions: Question[] = [];

  while (questions.length < N_QUESTIONS) {
    const _questions = await api.fetchQuestions(dificulty);

    _questions.forEach((question: Question) => {
      const answersLength = filterNotNullAnswers(question).length;
      const alreadyFetched = questions.some((q) => q.id === question.id);

      if (
        !alreadyFetched &&
        answersLength >= N_ALTERNATIVES &&
        questions.length < N_QUESTIONS
      ) {
        questions.push(question);
      }
    });
  }

  return questions;
}

const questionInitState: Question = {
  id: 0,
  question: "",
  answers: {},
  correct_answer: "",
  correct_answers: {},
};

export function QuestionsContextProvider(props: QuestionsContextProviderProps) {
  const userCtx = useContext(UserContext);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(questionInitState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!questions || questions.length === 0) navigate("/");
  }, [navigate, questions]);

  async function updateQuestions() {
    await fetchQuestions(userCtx.dificulty).then((questions) => {
      setQuestions(questions);
      setCurrentQuestion(questions[0]);
      setCurrentQuestionIndex(0);
    });
  }

  function toNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        currentQuestion,
        currentQuestionIndex,
        updateQuestions,
        toNextQuestion,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
}
