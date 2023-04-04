import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../navigation/navbar'
import LogoutIcon from '@mui/icons-material/Logout'

function EditUser(props) {
  const [rolex, setRoles] = useState([])
  const roles = rolex.filter((role) => {
    return role.name.toString().toLowerCase()
  })
  const userRoles = roles.map((role) => {
    return role.name
  })
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: '',
    facilityID: '',
  })
  const { id } = useParams()
  const navigate = useNavigate()
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
    const url = `http://localhost:8081/api/users/${id}`
    axios
      .get(url)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log('Error from UpdateUserInfo')
      })
  }, [id])

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      password: user.password,
      addedDate: user.addedDate,
      facilityID: user.facilityID,
    }
    const url = `http://localhost:8081/api/users/${id}`
    axios
      .put(url, data)
      .then((res) => {
        //setUser(res.data);
        navigate('/usersList')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // const [data, setData] = useState({
  //   name: '',
  //   addedDate: dateAdded,
  // })
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value })
  // }
  return (
    <div className="grid_container">
      <div className="item1">
        <nav className="navbar1">
          <div className="header">
            <div className="headerItem">
              <img src={logo} className="App_logo" alt="logo" />{' '}
              <h3 id="#header_logotext" className="h3header">
                {' '}
                POEHR
              </h3>
            </div>

            <ul className="navigation">
              <li id="link" className="navbar_list">
                <Link to="/create">Registration</Link>
              </li>
              <li id="link" className="navbar_list">
                <Link to="/">Home</Link>
              </li>
              <li id="link" className="navbar_list">
                <Link to="/contact">Contact</Link>
              </li>
              <li id="link" className="navbar_list">
                <a href="#about">About </a>
              </li>
              <li className="navbar_list_exit">
                <LogoutIcon onClick={handleLogout}>Log Out</LogoutIcon>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h3>Edit User</h3>
        <div className="item3A">
          <form onSubmit={onSubmit} style={{ width: '50%' }}>
            <div className="form-grid-container">
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  {/* <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={onChange}
                    className="form-control"
                  /> */}
                  <select
                    key={rolex._id}
                    placeholder="Select Role"
                    name="role"
                    className="form-control select"
                    value={user.role}
                    onChange={onChange}
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
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    className="form-control"
                  />
                </div> */}
                <div className="form-group">
                  <label htmlFor="addedDate">Added Date</label>
                  <input
                    type="text"
                    name="addedDate"
                    value={user.addedDate}
                    onChange={onChange}
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
            </div>
          </form>
        </div>
        <div className="item3B"></div>
        <div className="item3C"></div>
      </div>
    </div>
  )
}

export default EditUser
