import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link, useParams, useNavigate } from 'react-router-dom'



function EditRoleModal(props) {
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
  // const [clinicRole, setClinicRole] = useState({
  //   name: '',
  //   addedDate: '',
  // })

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: '',
  })

  // const { id } = useParams()
  // const RoleID = props.roleID
  const UserID = props.userID

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users/${UserID}`)
      .then((res) => {
        setUser({
          // _id: res.data._id,
          firstName: '',
          lastName: '',
          role: '',
          email: '',
          password: '',
          addedDate: '',
        })
      })
      .catch((err) => {
        console.log('Error from EditUserModal')
      })
  }, [UserID])

  // console.log(role)
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
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Update User
                  </button>
                </div>
              </div>



            
            {/* <div className="form-group ">
              <label style={{ display: 'none' }}>
                Role ID
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="_id"
                  value={clinicRole._id}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="name">
                Role
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="name"
                  value={clinicRole.name}
                  onChange={handleChange}
                /> */}
                {/* <select
                  key={clinicRole._id}
                  // placeholder="Select Role"
                  name="name"
                  className="form-control select"
                  value={clinicRole.name}
                  onChange={handleChange}
                >
                  <option key="0" value="Select Role">
                    Select Role
                  </option>
                  {clinicVisitRoles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role}
                    </option>
                  ))}
                </select> */}
              {/* </label>
            </div>

            <div>
              <label>
                Date Added
                <input
                  type="date"
                  className="form-control scheduleInput"
                  name="addedDate"
                  value={clinicRole.addedDate}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <input
                value="Update"
                type="submit"
                className="btn btn-success updateRegistrationBtn"
              />
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRoleModal
