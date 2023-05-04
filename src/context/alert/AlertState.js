import { useState } from "react";
import AlertContext from "./alertContext";

const NoteState = (props) => {
    const [alert, setAlert] = useState(null)
    const showAlert = (type, message) => {
        setAlert({
            type: type,
            msg: message
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default NoteState;