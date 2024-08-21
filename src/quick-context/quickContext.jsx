const { createContext, useContext, useReducer, useEffect } = require("react");

const QuickContext = createContext();
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
        return {...initialState, status: "active", questions: state.questions, secondsRemaining: state.questions.length * SECS_PER_QUESTION};
      case 'tick': 
        return {...state, secondsRemaining: (state.secondsRemaining - 1), status: state.secondsRemaining === 0 ? "finished" : state.status,}
      default:
         throw new Error("Unknown action"); 
    }
  }

function QuickProvider({children}) {
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

    return <QuickContext.Provider value={{ 
        questions, status, index, answer, points, highscore, secondsRemaining, numQuestions, maxPossiblePoints, dispatch
        }} >
        {children}
    </QuickContext.Provider>
}

function useQuick() {
    const context = useContext(QuickContext);
    if(context === undefined) throw new Error("QuickContext was used outside QuickProvider!");

    return context;
}

export {QuickProvider, useQuick}; 