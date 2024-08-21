import { useQuick } from "../quick-context/quickContext.jsx";
import Options from "./Options.js";

function Question({question}) {

    return (<div>
        <h4>{question.question}</h4>
    
        <Options question={question} />
    </div>);
}

export default Question;