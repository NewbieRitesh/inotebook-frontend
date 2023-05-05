import React, { useContext, useState } from 'react'
import UserContext from './userContext'
import alertContext from '../alert/alertContext'
const UserState = (props) => {
    const useAlertContext = useContext(alertContext);
    const { showAlert } = useAlertContext;
    const [userData, setUserData] = useState([])
    // get user data (name)
    const getUserData = async () => {
        let headersList = {
            "content-type": "application/json",
            "auth-token": localStorage.getItem('token')
        }

        let response = await fetch("http://localhost:1000/api/auth/getuser", {
            method: "POST",
            headers: headersList
        });

        let data = await response.json();
        setUserData(data)
        // console.log(userData);
    }

    // update user data (name)
    const updateUserData = async (id, newName) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "name": newName,
        });

        let response = await fetch(`http://localhost:1000/api/auth/update-user-data/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
        if (response.status===200) {
            showAlert("success", "Data Updated Successfully")
        } else {
            showAlert("error", "Some error occur")
        }
    }

    return (
        <UserContext.Provider value={{ getUserData, updateUserData, userData, setUserData }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState