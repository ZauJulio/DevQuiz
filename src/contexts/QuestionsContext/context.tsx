import { createContext } from "react";
import { Question } from "../../types";

export type QuestionsContextType = {
  questions: any[];
  currentQuestion: Question;
  currentQuestionIndex: number;
  toNextQuestion: () => void;
  updateQuestions: () => Promise<void>;
};

export const QuestionsContext = createContext({} as QuestionsContextType);
