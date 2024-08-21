import { useQuick } from "../quick-context/quickContext";

function Options({question}) {
    const {dispatch, answer} = useQuick();
    const hasAnswer = answer != null;
    
    return (<div className="options">
        {question.options.map((option, index) => (
            <button className={`btn btn-option ${index === answer ? 'answer' : ""} ${hasAnswer ? index === question.correctOption ? 'correct' : 'wrong' : ""}`} key={option} disabled={answer!=null} onClick={() => dispatch({type: 'newAnswer', payload: index})}>{option}</button>
        ))}
    </div>);
}

export default Options;