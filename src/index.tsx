import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuizContextProvider } from "./contexts";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </QuizContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
