import { Answer } from ".";

type Question = {
  id: number;
  question: string;
  answers: Answer;
  correct_answer: string;
  correct_answers: Answer;
};

export default Question;
