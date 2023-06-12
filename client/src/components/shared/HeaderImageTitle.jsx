import React from 'react'
import { FirstNameContext } from '../../App'

// import logo from './images/logoPOWER.png'
// import logo from './images/logoPOWER2.jpg'
import logo from './images/logoPOWER4.png'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
// import { UserContext } from '../contexts/user.context'
// import LogoutIcon from '@mui/icons-material/Logout'
// create context
// const UserContext = createContext();
// import Home from "../pages/Home.page"
function HeaderImageTitle() {
  const userFirstName = localStorage.getItem('firstName')
  // const userFirstName = useContext(FirstNameContext);
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('email')
    localStorage.removeItem('firstName')
    localStorage.removeItem('role')
    navigate('/')
  }

  // const userRole = localStorage.getItem('role')

  return (
    <nav className="navbar1">
      {/* <div className="header"> */}
      <div className="headerItem">
        <img src={logo} className="App_logo" alt="logo" />{' '}
        <h3 className="h3header">
          POEHR Scheduling
        </h3>
        {/* <h5 className="h3header">
            Welcome {userFirstName}!
          </h5> */}
      </div>

      <ul className="navigation">
        <span className="navbar_listHeaderGreeting">
          Welcome {userFirstName}!
        </span>
        {/* <li id="link" className="navbar_list">
            <Link to="/createPatient">Registration</Link>
          </li> */}
        <li id="link" className="navbar_list">
          <Link to="/applications">Home</Link>
        </li>

        {/* <li id="link" className="navbar_list">
          <Link to="/">Pricing</Link>
        </li> */}
        {/* <li id="link" className="navbar_list">
            <Link to="/contact">Contact</Link>
          </li> */}
        {/* <li id="link" className="navbar_list">
          <Link to="/about">About us</Link>
        </li> */}

        {/* <li id="link" className="navbar_list">
          <Link to="/about">Contact</Link>
        </li> */}
        {/* <li> */}
        {/* <LogoutIcon onClick={handleLogout}>Log Out</LogoutIcon> */}
        <button className="navbar_list_exit" onClick={handleLogout}>
          <i className='fa fa-sign-out fa-sm' />
        </button>
        {/* </li> */}
      </ul>
      {/* </div> */}
    </nav>
  )
}

export default HeaderImageTitle
