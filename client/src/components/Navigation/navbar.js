import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="header-bodynavbar">
      <div className="body-navbars" >
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
            <Link to="/userlist">User List</Link>
          </li>
        </ul>
        <div>
        </div>
      </div>
    </div>
  )
}
