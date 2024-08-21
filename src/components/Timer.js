import { useEffect } from "react";
import { useQuick } from "../quick-context/quickContext";

function Timer() {
    const {secondsRemaining, dispatch} = useQuick();
    
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(function() {
        const id = setInterval(() => {
           dispatch({type: "tick"});
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch]);

    return (
    <div className="timer">
        {mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}
    </div>
    );
}

export default Timer;