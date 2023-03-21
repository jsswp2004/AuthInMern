import React from 'react'
import { FirstNameContext } from '../../App'
import logo from './images/logoPOWER.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
// import { UserContext } from '../contexts/user.context'
// import LogoutIcon from '@mui/icons-material/Logout'
// create context
// const UserContext = createContext();
// import Home from "../pages/Home.page"
function HeaderImageTitle() {

  const userFirstName = useContext(FirstNameContext);
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar1">
      {/* <div className="header"> */}
      <div className="headerItem">
        <img src={logo} className="App_logo" alt="logo" />{' '}
        <h3 className="h3header">
          POEHR
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
          <Link to="/">Home</Link>
        </li>
        {/* <li id="link" className="navbar_list">
            <Link to="/contact">Contact</Link>
          </li> */}
        <li id="link" className="navbar_list">
          <Link to="/about">About</Link>
        </li>
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
