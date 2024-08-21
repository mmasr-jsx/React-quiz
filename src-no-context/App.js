import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 4200,
};

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: "ready"};
    case 'dataFailed':
      return {...state, status: "error"};
    case 'start':
      return {...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION,};
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points};
    case 'nextQuestion':
      return {...state, index: state.index + 1, answer: null };
    case 'finish':
      return {...state, status: "finish", highscore: state.points > state.highscore ? state.points : state.highscore };
    case 'restart':
      return {...initialState, status: "active", questions: state.questions};
    case 'tick': 
      return {...state, secondsRemaining: (state.secondsRemaining - 1), status: state.secondsRemaining === 0 ? "finished" : state.status,}
    default:
       throw new Error("Unknown action"); 
  }

}

export default function App() {
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function (){
      fetch("http://localhost:8000/questions").then((res) => 
      res.json()).then(data=>dispatch({type: "dataReceived", payload: data }))
        .catch((err) =>{
          console.error("Fetch Error");
          dispatch({type: "dataFailed"})
        });

  },[]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status==="loading" && <Loader />}
        {status==="error" && <Error />}
        {status==="ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status==="active" && (<>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            <NextButton dispatch={dispatch} numQuestions={numQuestions} answer={answer} index={index} />
            </Footer>
          </>)}
        {status==="finish" && <FinishScreen maxPossiblePoints={maxPossiblePoints} points={points} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}