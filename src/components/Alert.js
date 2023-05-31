import { useContext } from "react";
import alertContext from "../context/alert/alertContext";
export default function Alert() {

    const useAlertContext = useContext(alertContext)
    const { alert } = useAlertContext

    return (
        <div style={{ height: '50px' }}>
            {alert &&
                <div className={`alert alert-${alert.type === true ? "success" : "danger"} alert-dismissible fade show`} role="alert">{alert.msg}</div>}
        </div>
    )
};