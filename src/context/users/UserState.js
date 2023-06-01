import React, { useContext, useState } from 'react'
import UserContext from './userContext'
import alertContext from '../alert/alertContext'
import generalContext from '../general/generalContext'

const UserState = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [userData, setUserData] = useState([])
    const [showPassword, setShowPassword] = useState({ show: false, inputType: "password", iconClassText: "bi bi-eye-fill" })
    const { showAlert } = useContext(alertContext);
    const { setProgress, setProcess } = useContext(generalContext)

    // show password function
    const showPasswordFunc = () => {
        if (showPassword.show) setShowPassword({ show: false, inputType: "password", iconClassText: "bi bi-eye-fill" })
        else setShowPassword({ show: true, inputType: "text", iconClassText: "bi bi-eye-slash-fill" })
    }

    // api call to login
    const userLogin = async (email, password) => {
        setProcess(true)
        setProgress(20)
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "email": email,
            "password": password
        });
        setProgress(30)
        let response = await fetch(`${BASE_URL}api/auth/login`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data) showAlert(data.success, data.response)
        // save the auth token in local storage and redirect to home page
        if (data.success) localStorage.setItem("token", data.authToken)
        setProcess(false)
        setProgress(100)
        return data
    }

    // api call to sign up user
    const userSignUp = async (name, email, password) => {
        setProcess(true)
        setProgress(20)
        let headersList = { "Content-Type": "application/json" }
        setProgress(25)
        let bodyContent = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });
        setProgress(35)
        let response = await fetch(`${BASE_URL}api/auth/createuser`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data) showAlert(data.success, data.response)
        // save the auth token in local storage and redirect to home page
        if (data.success === true) localStorage.setItem("token", data.authToken)
        setProgress(100)
        setProcess(false)
        return data
    }

    // api call to get user data (name)
    const getUserData = async () => {
        setProcess(true)
        setProgress(20)
        let headersList = {
            "content-type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        setProgress(30)
        let response = await fetch(`${BASE_URL}api/auth/getuser`, {
            method: "POST",
            headers: headersList
        });
        setProgress(90)
        let data = await response.json();
        setUserData(data.user)
        setProgress(100)
        setProcess(false)
    }

    // api call to update user data (name)
    const updateUserData = async (id, newName) => {
        setProcess(true)
        setProgress(20)
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        setProgress(30)
        let bodyContent = JSON.stringify({
            "name": newName,
        });
        setProgress(40)
        let response = await fetch(`${BASE_URL}api/auth/update-user-data/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json()
        // showing alert when data will be updated
        if (data) showAlert(data.success, data.response)
        setProgress(100)
        setProcess(false)
    }

    // api call to authenticate user
    const authenticateUser = async (id, authPassword) => {
        setProcess(true)
        setProgress(20)
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        setProgress(30)
        let bodyContent = JSON.stringify({
            "password": authPassword
        });
        setProgress(40)
        let response = await fetch(`${BASE_URL}api/auth/authenticate/${id}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        setProgress(100)
        setProcess(false)
        return data
    }

    // api call to update user email
    const updateUserEmail = async (id, email, authPassword) => {
        setProcess(true)
        setProgress(20)
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        setProgress(30)
        let bodyContent = JSON.stringify({
            "email": email,
            "authPassword": authPassword
        });
        setProgress(40)
        let response = await fetch(`${BASE_URL}api/auth/update-user-email/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data.success === true) showAlert('success', 'Email Updated Successfully')
        setProgress(100)
        setProcess(false)
        return data
    }

    // api call to update user password
    const updateUserPassword = async (id, newPassword, authPassword) => {
        setProcess(true)
        setProgress(20)
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        setProgress(30)
        let bodyContent = JSON.stringify({
            "newPassword": newPassword,
            "authPassword": authPassword
        });
        setProgress(40)
        let response = await fetch(`${BASE_URL}api/auth/update-user-password/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data.success === true) showAlert('success', 'Password Updated Successfully')
        setProgress(100)
        setProcess(false)
        return data
    }

    // api call to delete user 
    const deleteUser = async (id, authPassword) => {
        setProcess(true)
        setProgress(20)
        let headersList = {
            "auth-token": localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
        setProgress(30)
        let bodyContent = JSON.stringify({
            "authPassword": authPassword
        });
        setProgress(40)
        let response = await fetch(`${BASE_URL}api/auth/delete-user/${id}`, {
            method: "DELETE",
            body: bodyContent,
            headers: headersList
        })
        setProgress(70)
        let data = await response.json();
        if (data.success === true) showAlert('success', 'Account has been deleted')
        setProgress(100)
        setProcess(false)
        return data
    }

    // api calls to forget password
    // call for send otp
    const sendOTPToUpdatePassword = async (email) => {
        setProcess(true)
        setProgress(20)
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({ "email": email });
        setProgress(30)
        let response = await fetch(`${BASE_URL}api/auth/forgot-password`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data.success === true) showAlert(data.success, data.response)
        setProgress(100)
        setProcess(false)
        return data
    }
    // call to verify otp
    const verifyOTPToUpdatePassword = async (email, otp) => {
        setProcess(true)
        setProgress(20)
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "email": email,
            "userOTP": otp
        });
        setProgress(30)
        let response = await fetch(`${BASE_URL}api/auth/verify-otp`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data.success === true) showAlert(data.success, data.response)
        setProgress(100)
        setProcess(false)
        return data
    }
    // call to create new password
    const sendNewPasswordToUpdatePassword = async (email, newPassword) => {
        setProcess(true)
        setProgress(20)
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "email": email,
            "newPassword": newPassword
        });
        setProgress(30)
        let response = await fetch(`${BASE_URL}api/auth/forgot-update-password`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        setProgress(70)
        let data = await response.json();
        if (data.success === true) showAlert(data.success, data.response)
        setProgress(100)
        setProcess(false)
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