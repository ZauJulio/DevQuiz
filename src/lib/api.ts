const apiURL = "https://quizapi.io/api/v1/questions";
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchQuestions = async (difficulty: string) => {
  const response = await fetch(
    `${apiURL}?apiKey=${apiKey}&difficulty=${difficulty}&limit=10`
  );
  const questions = await response.json();
  
  return questions;
};


export default fetchQuestions;
