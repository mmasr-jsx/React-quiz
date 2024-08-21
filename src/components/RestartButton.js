import { useQuick } from "../quick-context/quickContext";

function RestartButton() {
    const {dispatch} = useQuick();

    return (
    <button className="btn btn-ui"
            onClick={() => dispatch({type: "restart"})}>
                Restart 🔄
    </button>
    );
}

export default RestartButton;