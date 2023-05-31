import React, { useState } from "react";
import GeneralContext from "./generalContext";

const GeneralState = (props) => {
    const [progress, setProgress] = useState(0)
    const [process, setProcess] = useState(false)
    return (
        <GeneralContext.Provider value={{ progress, setProgress, process, setProcess }}>
            {props.children}
        </GeneralContext.Provider>
    )
}

export default GeneralState;