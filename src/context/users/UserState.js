import React, { useContext, useState } from 'react'
import UserContext from './userContext'
import alertContext from '../alert/alertContext'

const UserState = (props) => {
    // initilization of states
    const [userData, setUserData] = useState([])
    const [showPassword, setShowPassword] = useState({ show: false, inputType: "password", iconClassText: "fa-eye" })
    // importing contexts
    const { showAlert } = useContext(alertContext);

    // show password function
    const showPasswordFunc = () => {
        if (showPassword.show) setShowPassword({ show: false, inputType: "password", iconClassText: "fa-eye" })
        else setShowPassword({ show: true, inputType: "text", iconClassText: "fa-eye-slash" })
    }

    // api call to login
    const userLogin = async (email, password) => {
        let headersList = { "Content-Type": "application/json" }
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
        if (data) showAlert(data.success === true ? "success" : "error", data.response)
        if (data.success) {
            // save the auth token in local storage and redirect to home page
            localStorage.setItem("token", data.authToken)
        }
        return data
    }

    // api call to sign up user
    const userSignUp = async (name, email, password) => {
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });
        let response = await fetch("http://localhost:1000/api/auth/createuser", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        if (data.success === true) showAlert("success", "Account Created Successfully ")
        else showAlert("error", data.response)
        // save the auth token in local storage and redirect to home page
        if (data.success === true) localStorage.setItem("token", data.authToken)
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
        setUserData(data.user)
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
        let data = await response.json()
        console.log(data);
        // showing alert when data will be updated
        if (data.success === true) showAlert('success', 'Data Updated Successfully')
        else showAlert('error', data.response)
    }

    // api call to authenticate user
    const authenticateUser = async (id, authPassword) => {
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "password": authPassword
        });
        let response = await fetch(`http://localhost:1000/api/auth/authenticate/${id}`, {
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
        let data = await response.json();
        if (data.success === true) showAlert('success', 'Email Updated Successfully')
        return data
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
        let data = await response.json();
        if (data.success === true) showAlert('success', 'Password Updated Successfully')
        return data
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
        let data = await response.json();
        if (data.success === true) showAlert('success', 'Account has been deleted')
        return data
    }

    // api calls to forget password
    // call for send otp
    const sendOTPToUpdatePassword = async (email) => {
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({ "email": email });
        let response = await fetch("http://localhost:1000/api/auth/forgot-password", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        return data
    }
    // call to verify otp
    const verifyOTPToUpdatePassword = async (email, otp) => {
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "email": email,
            "userOTP": otp
        });
        let response = await fetch("http://localhost:1000/api/auth/verify-otp", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        return data
    }
    // call to create new password
    const sendNewPasswordToUpdatePassword = async (email, newPassword) => {
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "email": email,
            "newPassword": newPassword
        });
        let response = await fetch("http://localhost:1000/api/auth/forgot-update-password", {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        console.log(data);
        return data
    }
    return (
        <UserContext.Provider value={{
            // user related general functions
            userLogin,
            userSignUp,
            getUserData,
            showPasswordFunc,
            showPassword,
            // user data related states
            userData,
            setUserData,
            // modifing user credentials related functions
            updateUserData,
            updateUserPassword,
            updateUserEmail,
            authenticateUser,
            deleteUser,
            // forgot password related functions
            sendOTPToUpdatePassword,
            verifyOTPToUpdatePassword,
            sendNewPasswordToUpdatePassword
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState