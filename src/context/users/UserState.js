import React, { useContext, useState } from 'react'
import UserContext from './userContext'
import alertContext from '../alert/alertContext'

const UserState = (props) => {
    // initilization of states
    const [userData, setUserData] = useState([])
    const [showPassword, setShowPassword] = useState({ show: false, inputType: "password", iconClassText: "fa-eye" })
    // importing contexts
    const useAlertContext = useContext(alertContext);
    const { showAlert } = useAlertContext;


    // show password function
    const showPasswordFunc = () => {
        if (showPassword.show) setShowPassword({ show: false, inputType: "password", iconClassText: "fa-eye" })
        else setShowPassword({ show: true, inputType: "text", iconClassText: "fa-eye-slash" })
    }

    // function to call login api request 
    const userLogin = async (email, password) => {
        let headersList = {
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "email": email,
            "password": password
        });
        let response = await fetch("http://localhost:1000/api/auth/login", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        if (data) useAlertContext.showAlert(data.success === true ? "success" : "error", data.response)
        if (data.success) {
            // save the auth token in local storage and redirect to home page
            localStorage.setItem("token", data.authToken)
        }
        return data
    }

    // api call to get user data (name)
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
    }

    // api call to update user data (name)
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
        // showing alert when data will be updated
        if (response.status === 200) showAlert("success", "Data Updated Successfully")
        else showAlert("error", "Some error occur")
    }

    // api call to authenticate user
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

    // api call to update user email
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
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.text();
        return JSON.parse(data)
    }

    // api call to update user password
    const updateUserPassword = async (id, newPassword, authPassword) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "newPassword": newPassword,
            "authPassword": authPassword
        });
        let response = await fetch(`http://localhost:1000/api/auth/update-user-password/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.text();
        return JSON.parse(data)
    }

    // api call to delete user 
    const deleteUser = async (id, authPassword) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "authPassword": authPassword
        });
        let response = await fetch(`http://localhost:1000/api/auth/delete-user/${id}`, {
            method: "DELETE",
            body: bodyContent,
            headers: headersList
        })
        let data = await response.text();
        return JSON.parse(data)
    }

    return (
        <UserContext.Provider value={{ userLogin, getUserData, showPasswordFunc, showPassword, updateUserData, userData, updateUserPassword, setUserData, updateUserEmail, authenticateUser, deleteUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState