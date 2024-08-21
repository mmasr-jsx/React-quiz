import RestartButton from "./RestartButton";

function FinishScreen({points, maxPossiblePoints, highscore, dispatch}) {
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji;
    if(percentage === 100) emoji = '🏆';
    if(percentage >= 90 && percentage < 100) emoji = '🥇';
    if(percentage >= 70 && percentage < 90) emoji = '🥈';
    if(percentage >= 50 && percentage < 70) emoji = '🥉';
    if(percentage < 50 ) emoji = '🙈';
    if(percentage === 0) emoji = '☠';


    return (
            <>
                <p className="result">
                    <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)})%
                </p>
                <div className="start">

                <p className="highscore">
                    (Highscore: {highscore} points)
                </p>
                <RestartButton dispatch={dispatch} />
                </div>
            </>
    );
}

export default FinishScreen;