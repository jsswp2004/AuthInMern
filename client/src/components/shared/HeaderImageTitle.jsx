import React from 'react'

import logo from './images/logoPOWER.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
// import { UserContext } from '../contexts/user.context'
import LogoutIcon from '@mui/icons-material/Logout'
// create context
// const UserContext = createContext();
// import Home from "../pages/Home.page"
function HeaderImageTitle() {
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
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
  )
}

export default HeaderImageTitle
