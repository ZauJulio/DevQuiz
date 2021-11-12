import { combineComponents } from "../utils";

import { UserContextProvider } from "./UserContext/provider";
import { QuestionsContextProvider } from "./QuestionsContext/provider";
import { AnswersContextProvider } from "./AnswersContext/provider";

const providers = [
  UserContextProvider,
  QuestionsContextProvider,
  AnswersContextProvider,
];

export const QuizContextProvider = combineComponents(...providers);
