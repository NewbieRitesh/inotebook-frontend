import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../../context/users/userContext'

const Profile = () => {

  // state declaration
  const [showPassword, setShowPassword] = useState({ show: false, inputType: "password", iconClassText: "fa-eye" })
  const [authPassword, setAuthPassword] = useState("")
  const [editItem, setEditItem] = useState("")
  const [credentials, setCredentials] = useState({ password: "", cpassword: "" })

  // imports of contexts
  const useUserContext = useContext(userContext)
  const { getUserData, userData, setUserData, deleteUser, updateUserData, updateUserPassword, updateUserEmail, authenticateUser } = useUserContext;
  // useRef Hooks
  const conformPasswordRef = useRef()
  const closeModal = useRef()
  const openEditEmailRef = useRef()
  const closeEditEmailRef = useRef()
  const openEditPasswordRef = useRef()
  const closeEditPasswordRef = useRef()

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line
  }, [])

  // handle input changes and store to states
  const handleChange = (event) => setUserData({ ...userData, [event.target.name]: event.target.value })
  const handleAuthPasswordChange = (event) => setAuthPassword(event.target.value)
  const handleOnChangeCredentials = (event) => setCredentials({ ...credentials, [event.target.name]: event.target.value })

  // function to update user data like name
  const handleUpdateUserData = async (event) => {
    event.preventDefault()
    console.log(userData);
    await updateUserData(userData._id, userData.name)
  }

  // function to show password
  const showPasswordFunc = () => {
    if (showPassword.show) {
      setShowPassword({ show: false, inputType: "password", iconClassText: "fa-eye" })
    } else {
      setShowPassword({ show: true, inputType: "text", iconClassText: "fa-eye-slash" })
    }
  }

  // authentication of user
  const authenticateClick = async () => {
    let response = await authenticateUser(authPassword)
    // authenticate password
    if (response.comparePasswords === true) {
      closeModal.current.click()
      if (editItem === "email") {
        openEditEmailRef.current.click()
      }
      if (editItem === "password") {
        openEditPasswordRef.current.click()
      }
      if (editItem === "delete") {
        deleteUserInDB()
      }
    }
    else {
      console.log("Wrong Password")
    }
  }

  // functions to edit email
  const editEmailClick = async () => {
    setEditItem("email")
    conformPasswordRef.current.click()
  }
  const updateEmailInDB = async () => {
    const response = await updateUserEmail(userData._id, userData.emailEdit, authPassword)
    console.log(response);
    if (response.success === true) {
      closeEditEmailRef.current.click()
      setAuthPassword("");
      setUserData({ ...userData, email: response.email })
      setEditItem("")
    }
  }

  // funtions to edit password
  const editPasswordClick = async () => {
    console.log("handlePasswordChange");
    setEditItem("password")
    conformPasswordRef.current.click();
  }
  const updatePasswordInDB = async () => {
    const response = await updateUserPassword(userData._id, credentials.password, authPassword)
    console.log(response);
    if (response.success === true) {
      closeEditPasswordRef.current.click()
      setAuthPassword("");
      setEditItem("")
    }
  }

  // functions to delete user account
  const handleDelete = async () => {
    setEditItem("delete")
    conformPasswordRef.current.click()
  }
  const deleteUserInDB = async () => {
    const response = await deleteUser(userData._id, authPassword)
    console.log(response)
  }

  // function for testing 
  const consoleFun = () => {
    console.log(userData);
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ flex: "1" }}>
      <div className='border custome-form-width border-dark m-2 p-4 rounded bg-body-secondary'>
        {/* update user data */}
        <form onSubmit={handleUpdateUserData}>
          <h1 className="text-center fs-2">Profile</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <div className='d-flex row justify-content-center'>
              <div className='col-sm-8'>
                <input type="text" name='name' className="form-control" value={`${userData.name ? userData.name : ""}`} id="name" onChange={handleChange} aria-describedby="emailHelp" />
              </div>
              <button type='submit' className='col-10 my-1 my-sm-0 col-sm-4 btn btn-primary'>Update</button>
            </div>
          </div>
        </form>
        <h2 className='fs-4 pt-3'>Credentials</h2>
        <div className="mb-3">
          {/* update email  */}
          <div>
            <label htmlFor="email" className="form-label">Email:</label>
            <div className='d-flex row justify-content-center'>
              <div className='col-sm-8'>
                <input disabled type="email" name='email' className="form-control" value={`${userData.email ? userData.email : ""}`} id="email" onChange={handleChange} aria-describedby="emailHelp" />
              </div>
              <button className='col-10 my-1 my-sm-0 col-sm-4 btn btn-primary' onClick={editEmailClick} type="submit">Edit Email</button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around row">
          <button className='btn btn-primary my-1 my-sm-0 col-sm-5' onClick={editPasswordClick}>Change Password</button>
          <button className='btn btn-danger my-1 my-sm-0 col-sm-5' onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
      <button onClick={consoleFun}>test</button>
      {/* conform Password Modal */}
      <button type="button" ref={conformPasswordRef} className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModalauth">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModalauth" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password <br /><span style={{ fontSize: "13px" }}>{authPassword.length < 6 ? "password should be minimum of 6 characters" : ""}</span></label>
                <input type={`${showPassword.inputType}`} name='password' value={authPassword} className="form-control" id="exampleInputPassword1" onChange={handleAuthPasswordChange} />
                <span style={{ cursor: "pointer", fontSize: "14px" }} onClick={showPasswordFunc}><i className={`fa-regular ${showPassword.iconClassText}`} />{showPassword.show ? " Hide Password" : " Show Password"}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { authenticateClick(editItem) }}>Authenticate</button>
            </div>
          </div>
        </div>
      </div>

      {/* edit email modal */}
      <button ref={openEditEmailRef} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#newEmailModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="newEmailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Enter New Email</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="email" name='emailEdit' className="form-control" value={`${userData.emailEdit ? userData.emailEdit : ""}`} id="email-edit" onChange={handleChange} aria-describedby="emailHelp" />
            </div>
            <div className="modal-footer">
              <button ref={closeEditEmailRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateEmailInDB}>Update Email</button>
            </div>
          </div>
        </div>
      </div>

      {/* new password modal */}
      <button ref={openEditPasswordRef} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#newPasswordModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="newPasswordModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Enter New Email</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password <br /><span style={{ fontSize: "13px" }}>{credentials.password.length < 6 ? "password should be minimum of 6 characters" : ""}</span></label>
                <input required type={`${showPassword.inputType}`} name='password' className="form-control" id="password" onChange={handleOnChangeCredentials} />
                <span style={{ cursor: "pointer", fontSize: "14px" }} onClick={showPasswordFunc}><i className={`fa-regular ${showPassword.iconClassText}`} />{showPassword.show ? " Hide Password" : " Show Password"}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Conform Password <span className="text-danger" style={{ fontSize: "13px" }}>{credentials.password !== credentials.cpassword ? "password doesn't match" : ""}</span> </label>
                <input type={`${showPassword.inputType}`} name='cpassword' className="form-control" id="cpassword" onChange={handleOnChangeCredentials} />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={closeEditPasswordRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updatePasswordInDB}>Update Password</button>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Profile