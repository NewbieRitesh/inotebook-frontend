import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../../context/alert/alertContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState({ show: false, inputType: "password", iconClassText: "fa-eye" })
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const useAlertContext = useContext(alertContext)
    const navigate = useNavigate();

    const handleChange = async (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const showPasswordFunc = () => {
        if (showPassword.show) {
            setShowPassword({ show: false, inputType: "password", iconClassText: "fa-eye" })
        } else {
            setShowPassword({ show: true, inputType: "text", iconClassText: "fa-eye-slash" })
        }
    }

    const clickLogin = async (e) => {
        e.preventDefault()
        let headersList = {
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": credentials.email,
            "password": credentials.password
        });

        let response = await fetch("http://localhost:1000/api/auth/login", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
            useAlertContext.showAlert("success", "You Logged in Successfully")
        } else if (response.status === 400) {
            if (data.success === false) {
                useAlertContext.showAlert("error", data.error)
            }
            else {
                let alertErrorString = ""
                // useAlertContext.showAlert("error")
                for (let index = 0; index < data.errors.length; index++) {
                    console.log(data.errors[index].msg);
                    alertErrorString += data.errors[index].msg + ". "
                }
                useAlertContext.showAlert("error", alertErrorString);
            }
        }
        if (data.success) {
            // save the auth token in local storage and redirect to home page
            localStorage.setItem("token", data.authToken)
            navigate('/')
        }
    }

    return (
        <form className="d-flex flex-column justify-content-center align-items-center" style={{ flex: "1" }} onSubmit={clickLogin}>
            <div className='border custome-form-width border-dark m-2 p-4 rounded bg-body-secondary'>
                <h1 className="text-center fs-2">Login</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password <br /><span style={{ fontSize: "13px" }}>{credentials.password.length < 6 ? "password should be minimum of 6 characters" : ""}</span></label>
                    <input type={`${showPassword.inputType}`} name='password' className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                    <span style={{ cursor: "pointer", fontSize: "14px" }} onClick={showPasswordFunc}><i className={`fa-regular ${showPassword.iconClassText}`} />{showPassword.show ? " Hide Password" : " Show Password"}</span>
                </div>
                <button disabled={credentials.password.length < 6} type="submit" className="btn btn-primary" style={{ width: "100%" }} onClick={clickLogin}>LogIn</button>
            </div>
        </form>
    )
}

export default Login