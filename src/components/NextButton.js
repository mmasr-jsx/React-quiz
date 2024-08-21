import { useQuick } from "../quick-context/quickContext";

function NextButton() {
    const {dispatch, answer, numQuestions, index} = useQuick();
    
    if( answer === null ) return null;

    if(index < numQuestions - 1) return (
    <>
        <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion'})}>
            Next &gt;
        </button>
    </>);

    if(index === numQuestions - 1) return (
    <>
        <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish'})}>
            Finish
        </button>
    </>);

}

export default NextButton;