import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../../context/users/userContext';
import generalContext from '../../context/general/generalContext';

const Signup = () => {
  // hooks declaration
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();
  // importing and destructing contexts
  const { userSignUp, showPassword, showPasswordFunc } = useContext(userContext)
  const { process } = useContext(generalContext)

  // handling input change and clicks
  const handleChange = async (event) => setCredentials({ ...credentials, [event.target.name]: event.target.value })
  const clickSignUp = async (e) => {
    e.preventDefault()
    const response = await userSignUp(credentials.name, credentials.email, credentials.password)
    if (response.success === true) navigate('/')
  }

  return (
    <form className="d-flex flex-column justify-content-center align-items-center" style={{ flex: "1" }} onSubmit={clickSignUp}>
      <div className='border custome-form-width border-dark m-2 p-4 rounded bg-body-secondary'>
        <h1 className="text-center fs-2">Sign Up</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name <br /><span style={{ fontSize: "13px" }}>{credentials.name.length < 3 ? "Name should at least 3 characters" : ""}</span></label>
          <input required type="text" name='name' className="form-control" id="name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input required type="email" name='email' className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password <br /><span style={{ fontSize: "13px" }}>{credentials.password.length < 6 ? "password should be minimum of 6 characters" : ""}</span></label>
          <input required type={`${showPassword.inputType}`} name='password' className="form-control" id="password" onChange={handleChange} />
          <span style={{ cursor: "pointer", fontSize: "14px" }} onClick={showPasswordFunc}><i className={`${showPassword.iconClassText}`} />{showPassword.show ? " Hide Password" : " Show Password"}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password <span className="text-danger" style={{ fontSize: "13px" }}>{credentials.password !== credentials.cpassword ? "password doesn't match" : ""}</span> </label>
          <input type={`${showPassword.inputType}`} name='cpassword' className="form-control" id="cpassword" onChange={handleChange} />
        </div>
        <button disabled={process === true || credentials.password !== credentials.cpassword || !credentials.email || credentials.name.length < 3} type="submit" className="btn btn-primary my-2" style={{ width: "100%" }}>SignUp</button>
        <div className="text-center d-block">
          <Link className='text-decoration-none' to="/login">already have account?<br />login</Link>
        </div>
      </div>
    </form>
  )
}

export default Signup