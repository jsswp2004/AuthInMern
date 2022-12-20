import React from 'react'
// import LogoutIcon from '@mui/icons-material/Logout'
// We import bootstrap to make our application look better.
import 'bootstrap/dist/css/bootstrap.css'

import { Link } from 'react-router-dom'

// Here, we display our Navbar
export default function Navbar() {

  return (
    <div className="header-bodynavbar" id="navbarSupportedContent">
      <div className="body-navbar" style={{ height: '50%' }}>
        <ul className="body-navbar">
          <li className="body-navbarlist">
            <Link to="/">Patient List</Link>
          </li>
          <li className="body-navbarlist">
            <Link to="/create">Registration</Link>
          </li>
          <li className="body-navbarlist">
            <Link to="/visitList">Schedule</Link>

          </li>
          <li className="body-navbarlist">
             <Link to="/usersList">User List</Link> 
          </li>
        </ul>
        <div>
        {/* <button
          id="tooltip"
          className="btn btn-danger btn-sm bottomleft"
          aria-hidden="true"          
        >
          <LogoutIcon onClick={logOut}>Log Out</LogoutIcon>
          <span className="tooltiptext">Exit</span>
        </button> */}

        </div>

      </div>
    </div>
  )
}
