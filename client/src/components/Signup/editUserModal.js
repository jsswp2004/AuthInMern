import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'


function EditUserModal(props) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: '',
    lastUpdated: format(new Date(), 'yyyy-MM-dd'),
  })

  const UserID = props.userID

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
          lastUpdated: res.data.lastUpdated,
        })
      })
      .catch((err) => {
        console.log('Error from EditUserModal')
      })
  }, [UserID])


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
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
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }

    axios
      .put(`http://localhost:8081/api/users/${UserID}`, data)
      .then((res) => {
        window.location.reload()


      })
      .catch((err) => {
        console.log('Error in EditRole!')
      })

  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div
              style={{ display: 'flex', columnGap: '10px' }}>
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role
                    <select
                      key={rolex.role}
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
                        <option key={role.name} value={role.name}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className='updateRegistrationGrp'>
                <div className="form-group">
                  <label htmlFor="email">Email
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="addedDate">Added Date
                    <input
                      type="text"
                      name="addedDate"
                      value={user.addedDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="lastUpdated">Last Updated
                    <input
                      type="text"
                      name="lastUpdated"
                      value={user.lastUpdated}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </label>
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
