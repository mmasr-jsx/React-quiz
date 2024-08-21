import { useQuick } from "../quick-context/quickContext";

function Progress() {
    const {index, numQuestions, points, maxPoints, answer} = useQuick();

    return (
    <header className="progress">
        <progress max={numQuestions} value={index + Number(answer !== null)}></progress>

        <p>Question <strong>{index + 1}</strong></p>

        <p><strong>{points}</strong> / {maxPoints}</p>
    </header>
    );
}

export default Progress;