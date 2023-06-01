import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { darkMode, lightMode, modeStyle } from '../redux/reducer/darkModeReducer'
import { useState } from 'react'

const Navbar = () => {
  const dispatch = useDispatch()
  const [setMode, setSetMode] = useState('light')
  const mode = useSelector(modeStyle)
  const changeMode = () => {
    if (setMode === 'light') {
      setSetMode('dark')
      dispatch(darkMode())
    }
    else if (setMode === 'dark') {
      setSetMode('light')
      dispatch(lightMode())
    }
  }
  const toggleClose = useRef()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  const closeNavbar = () => {
    toggleClose.current.click()
  }
  return (
    <><nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={`${mode.type}`}><div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <div className='d-flex'>
        <button className={`mx-2 bg-transparent hover:pointer border-0 d-flex align-items-center fs-4`} onClick={changeMode}>
          <span className='fs-6 me-2'>{mode.type === 'light' ? "Enable Dark Mode" : "Enable Light Mode"}</span>
          <i className={`bi bi-${mode.type === 'light' ? 'moon-stars-fill' : 'brightness-high-fill'}`} />
        </button>
        <button ref={toggleClose} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${useLocation().pathname === '/' ? 'active' : ''}`} aria-current="page" to="/" onClick={closeNavbar}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${useLocation().pathname === '/about' ? 'active' : ''}`} to="/about" onClick={closeNavbar}>about</Link>
          </li>
        </ul>
        <div className="d-flex">
          {localStorage.getItem('token') ?
            <>
              <Link className='btn border border-primary' to="/profile" onClick={closeNavbar}>Profile</Link>
              <button className="btn btn-primary mx-1" onClick={() => {
                handleLogout()
                closeNavbar()
              }}>Logout</button>
            </> :
            <>
              <Link className="btn btn-primary mx-1" to="/login" onClick={closeNavbar}>Login</Link>
              <Link className="btn btn-outline-primary mx-1" to="/signup" onClick={closeNavbar}>Sign Up</Link>
            </>
          }
        </div>
      </div>
    </div></nav>
    <hr className={`m-0`} />
    </>
  )
}

export default Navbar