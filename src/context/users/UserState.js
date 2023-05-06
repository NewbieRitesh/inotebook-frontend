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
        if (response.status === 200) {
            showAlert("success", "Data Updated Successfully")
        } else {
            showAlert("error", "Some error occur")
        }
    }

    const updateUserEmail = async (id, email, authPassword) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": email,
            "authPassword": authPassword
        });
        let response = await fetch(`http://localhost:1000/api/auth/update-user-email/${id}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        return JSON.parse(data)
    }

    const authenticateUser = async (authPassword) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "password": authPassword
        });

        let response = await fetch("http://localhost:1000/api/auth/authenticate/6453a5f69f1ec36802f7554c", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        return JSON.parse(data)
    }

    const updateUserPassword = async (id, newPassword, authPassword) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "newPassword": newPassword,
            "authPassword": authPassword
        }
        );

        let response = await fetch(`http://localhost:1000/api/auth/update-user-password/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        return JSON.parse(data)
    }

    const deleteUser = async (id, authPassword)=> {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "authPassword": authPassword
        });

        let response = await fetch(`http://localhost:1000/api/auth/delete-user/${id}` , {
            method: "DELETE",
            body: bodyContent,
            headers: headersList
        })
        let data = await response.text();
        return data
    }

    return (
        <UserContext.Provider value={{ getUserData, updateUserData, userData, updateUserPassword, setUserData, updateUserEmail, authenticateUser, deleteUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState