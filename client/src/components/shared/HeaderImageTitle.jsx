import React from 'react'

import logo from './images/logoPOWER.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
// import { UserContext } from '../contexts/user.context'
// import LogoutIcon from '@mui/icons-material/Logout'
// create context
// const UserContext = createContext();
// import Home from "../pages/Home.page"
function HeaderImageTitle() {
  // const logOutUser = useContext(UserContext)

  // This function is called when the user clicks the "Logout" button.
  // const logOut = async () => {
  //   try {
  //     // Calling the logOutUser function from the user context.
  //     const loggedOut = await logOutUser()
  //     // Now we will refresh the page, and the user will be logged out and
  //     // redirected to the login page because of the <PrivateRoute /> component.
  //     if (loggedOut) {
  //       window.location.reload(true)
  //     }
  //   } catch (error) {
  //     alert(error)
  //   }
  // }
  // const user = useContext(UserContext);
  // console.log(user);
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 style={{color: 'white', paddingTop: '5px', paddingLeft:'5px'}}> POEHR</h3>
      </div>

      <div className="header-navbar">
        {' '}
        <ul style={{marginBottom:'0px', verticalAlign:'bottom'}}>
          <li className="navbar-list">
            <Link to="/create">Registration</Link>
          </li>
          <li className="navbar-list">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="navbar-list">
            <Link to="/create">Registration</Link>
          </li> */}
          <li className="navbar-list">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="navbar-list">
            <a href="#about">About </a>
          </li>

          {/* <button className="btn btn-danger" aria-hidden="true"  onClick={logOut}>
          <LogoutIcon ></LogoutIcon>
          </button> */}
          {/* <LogoutIcon onClick={logOut}>Log Out</LogoutIcon> */}
        </ul>
      </div>
    </div>
  )
}

export default HeaderImageTitle
