import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import User from './userlist'
import axios from 'axios'
import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../navigation/navbar'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

const ShowUsersList = () => {
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/users/${id}`)
      .then((response) => {
        setUsers(users.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete record')
      })
  }

  return (
    <div className="grid_container">
      <div className="item1">
        <nav className="navbar1">
          <div className="header">
            <div className="headerItem">
              <img src={logo} className="App_logo" alt="logo" />{' '}
              <h3 id="#header_logotext" className="h3">
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
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th id="columnName">First Name</th>
              {/* <th id="columnName">Middle Name</th> */}
              <th id="columnName">Last Name</th>
              <th id="columnName">Email</th>
              <th id="columnName">Role</th>
              <th id="columnName">Added Date</th>
              <th id="columnName">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} deleteRecord={deleteRecord} key={user._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowUsersList
