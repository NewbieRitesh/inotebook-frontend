import React, { useContext, useState } from 'react'
import userContext from '../context/users/userContext'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext'

const ForgotPassword = () => {
    // declaring contexts
    const { showAlert } = useContext(alertContext)
    const {
        sendOTPToUpdatePassword,
        showPassword,
        showPasswordFunc,
        verifyOTPToUpdatePassword,
        sendNewPasswordToUpdatePassword
    } = useContext(userContext);

    // declaring react hooks and variables 
    const initialProgressObj = { pageNo: 1, pageName: "email", submitBtnValue: "Send OTP", progress: 0 }
    const [credentials, setCredentials] = useState({ email: "", otp: "", newPassword: "", confirmNewPassword: "" })
    const [progressPage, setProgressPage] = useState(initialProgressObj)
    const [loading, setLoading] = useState(false)
    const [warning, setWarning] = useState("")
    const navigate = useNavigate()

    // function to handle user input
    const handleChange = async (event) => setCredentials({ ...credentials, [event.target.name]: event.target.value })

    // handling previous button click
    const previousBtnClick = () => {
        if (progressPage.pageNo === 2) setProgressPage(initialProgressObj)
        if (progressPage.pageNo === 3) setProgressPage({ pageNo: 2, pageName: "otp", submitBtnValue: "Submit OTP", progress: 33 })
    }
    // handling submit button click
    const callFunction = (event) => {
        event.preventDefault()
        if (loading === true) setWarning("Please wait")
        else if (progressPage.pageNo === 1) sendOTP()
        else if (progressPage.pageNo === 2) submitOTP()
        else if (progressPage.pageNo === 3) createPassword()
    }

    // function to send otp to user email
    const sendOTP = async () => {
        setLoading(true)
        let data = await sendOTPToUpdatePassword(credentials.email)
        if (data.success === true) {
            setProgressPage({ pageNo: 2, pageName: "otp", submitBtnValue: "Submit OTP", progress: 33 })
            setWarning("")
        } else setWarning(data.response)
        setLoading(false)
    }
    // function to verify otp
    const submitOTP = async () => {
        setLoading(true)
        let data = await verifyOTPToUpdatePassword(credentials.email, credentials.otp)
        if (data.success === true) {
            setProgressPage({ pageNo: 3, pageName: "create-password", submitBtnValue: "Change Password", progress: 66 })
            setWarning("")
        } else setWarning(data.response)
        setLoading(false)
    }
    // function to change password
    const createPassword = async () => {
        setLoading(true)
        console.log("password updated")
        let data = await sendNewPasswordToUpdatePassword(credentials.email, credentials.newPassword)
        if (data.success === true) {
            setProgressPage({ ...progressPage, progress: 100 })
            showAlert("success", `${data.response}, and you are navigating to ${localStorage.getItem('token') ? "home" : "login"} page in 3 second`)
            setTimeout(async () => {
                navigate('/')
                setProgressPage(initialProgressObj)
            }, 3000);
        } else setWarning(data.response)
        setLoading(false)
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ flex: "1" }}>
                <div className='border custome-form-width border-dark border-2 rounded bg-body-secondary'>
                    <div className="progress m-1" role="progressbar" aria-label="Example 10px high" aria-valuemin="0" aria-valuemax="100" style={{ height: "7px" }}>
                        <div className="progress-bar" style={{ width: `${progressPage.progress}%` }}></div>
                    </div>
                    <div className='m-2 p-4'>
                        <h1 className="text-center fs-2">Forgot Password</h1>
                        <button disabled={progressPage.pageNo === 1} className='btn btn-outline-primary my-3' onClick={previousBtnClick}>back</button>
                        <form onSubmit={callFunction}>
                            <div className="mb-3">
                                {progressPage.pageNo === 1 ? <>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Enter your ragistered email</label>
                                    <input required type="email" name='email' className="form-control" id="exampleInputEmail1" onChange={handleChange} placeholder={`Enter ${progressPage.pageName}`} aria-describedby="emailHelp" />
                                </> : ""}
                                {progressPage.pageNo === 2 ? <>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Enter OTP</label>
                                    <input required type="number" name='otp' className="form-control" id="exampleInputEmail1" onChange={handleChange} placeholder={`Enter ${progressPage.pageName}`} aria-describedby="emailHelp" />
                                </> : ""}
                                {progressPage.pageNo === 3 ? <>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password <br /><span style={{ fontSize: "13px" }}>{credentials.newPassword.length < 6 ? "password should be minimum of 6 characters" : ""}</span></label>
                                        <input required type={`${showPassword.inputType}`} name='newPassword' className="form-control" id="password" onChange={handleChange} />
                                        <span style={{ cursor: "pointer", fontSize: "14px" }} onClick={showPasswordFunc}><i className={`fa-regular ${showPassword.iconClassText}`} />{showPassword.show ? " Hide Password" : " Show Password"}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cpassword" className="form-label">Conform Password <span className="text-danger" style={{ fontSize: "13px" }}>{credentials.newPassword !== credentials.confirmNewPassword ? "password doesn't match" : ""}</span> </label>
                                        <input type={`${showPassword.inputType}`} name='confirmNewPassword' className="form-control" id="cpassword" onChange={handleChange} />
                                    </div>
                                </> : ""}
                                <span>{warning}</span>
                                <div className="my-3 position-relative d-flex justify-content-end">
                                    {loading === true ? <div className='position-absolute top-50 start-50 translate-middle'>
                                        <span style={{ fontSize: "13px" }}>please wait</span>
                                        <img src="img/loader.gif" alt="Loading" style={{ height: "100px", width: "100px" }} />
                                    </div> : ""}
                                    <button disabled={loading === true || progressPage.pageNo === 3 ? credentials.newPassword.length < 6 || credentials.newPassword !== credentials.confirmNewPassword : "" || progressPage.pageNo === 2 ? credentials.otp.length < 6 : ""} type="submit" className="btn btn-primary">{progressPage.submitBtnValue}</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div >
        </>
    )
}

export default ForgotPassword