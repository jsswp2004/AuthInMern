import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link, useParams, useNavigate } from 'react-router-dom'



function EditUserModal(props) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: '',
  })

  const UserID = props.userID
  // console.log(UserID)
  const [rolex, setRoles] = useState([])
  const roles = rolex.filter((role) => {
    return role.name.toString().toLowerCase()
  })
  const userRoles = roles.map((role) => {
    return role.name
  })

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/roles')
      .then((response) => {
        setRoles(response.data)
      })
      .catch((error) => {
        console.log('Error from roles list')
      })
  }, [])



  // const { id } = useParams()
  // const RoleID = props.roleID


  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users/${UserID}`)
      .then((res) => {
        setUser({
          // _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          email: res.data.email,
          password: res.data.password,
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from EditUserModal')
      })
  }, [UserID])

  console.log(user)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    // window.location.reload()
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      _id: props.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      password: user.password,
      addedDate: user.addedDate,
    }

    axios
      .put(`http://localhost:8081/api/users/${UserID}`, data)
      .then((res) => {
        // Push to /
        // navigate('/settingsPage')

        window.location.reload()
        // window.location.close()

      })
      .catch((err) => {
        console.log('Error in EditRole!')
      })

  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div             
              style={{ display: 'flex', columnGap: '10px' }}>
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    key={rolex._id}
                    placeholder="Select Role"
                    name="role"
                    className="form-control select"
                    value={user.role}
                    onChange={handleChange}
                  >
                    <option key="0" value="">
                      Select Role
                    </option>
                    {userRoles.map((role) => (
                      <option key={role._id} value={role.name}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='updateRegistrationGrp'>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addedDate">Added Date</label>
                  <input
                    type="text"
                    name="addedDate"
                    value={user.addedDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <br />
                <div className="form-group ">
                  <button type="submit" className="btn btn-primary updateRegistrationBtn">
                    Update
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUserModal
