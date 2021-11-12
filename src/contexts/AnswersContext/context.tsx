import { createContext } from "react";

export type AnswersContextType = {
  anserws: string[];
  selectedAnswer: string;
  onChangeAnswer: (answer: string) => void;
  getCorrectAnswer: (index: number) => string | undefined;
  
  totalHits: () => number;
  resetAnswers: () => void;
  resetCurrentSelectedAnswer: () => void;
};

export const AnswersContext = createContext({} as AnswersContextType);
