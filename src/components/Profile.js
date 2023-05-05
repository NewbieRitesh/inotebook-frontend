import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext'

const Profile = () => {
  const useUserContext = useContext(userContext)
  const { getUserData, userData, setUserData, updateUserData } = useUserContext;

  useEffect(() => {
    getUserData()
  }, [])


  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }
  const consoleFun = async () => {
    const data = await getUserData()
    console.log(data.name);
  }

  const handleUpdateUserData = async (event) => {
    event.preventDefault()
    console.log(userData);
    await updateUserData(userData._id, userData.name)

  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ flex: "1" }}>
      <form onSubmit={handleUpdateUserData}>
        <div className='border custome-form-width border-dark m-2 p-4 rounded bg-body-secondary'>
          <h1 className="text-center fs-2">Profile</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
            <input type="text" name='name' className="form-control" value={`${userData.name ? userData.name : ""}`} id="name" onChange={handleChange} aria-describedby="emailHelp" />
          </div>
          <button type='submit' className='btn btn-primary'>Update</button>
        </div>
      </form>
      <button onClick={consoleFun}>test</button>
    </div>
  )
}

export default Profile