import React, { useContext, useState } from 'react'
import userContext from '../../context/users/userContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // state declaration
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const { userLogin, showPasswordFunc, showPassword } = useContext(userContext);
    const navigate = useNavigate();

    // handling user inputs and login click
    const handleChange = async (event) => setCredentials({ ...credentials, [event.target.name]: event.target.value })
    const clickLogin = async (e) => {
        e.preventDefault()
        const response = await userLogin(credentials.email, credentials.password)
        if (response.success === true) navigate('/')
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
                    <span style={{ cursor: "pointer", fontSize: "14px" }} onClick={showPasswordFunc}><i className={`${showPassword.iconClassText}`} />{showPassword.show ? " Hide Password" : " Show Password"}</span>
                </div>
                <Link className='text-decoration-none' to="/forgot-password">forgot password??</Link>
                <button disabled={credentials.password.length < 6} type="submit" className="btn btn-primary" style={{ width: "100%" }} >LogIn</button>
            </div>
        </form>
    )
}

export default Login