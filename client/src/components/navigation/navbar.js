import React from 'react'
// We import bootstrap to make our application look better.
import 'bootstrap/dist/css/bootstrap.css'

// We import NavLink to utilize the react router.
import { Link } from 'react-router-dom'

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div id="navbarSupportedContent">
      <div className="header-bodynavbar">
        <ul className="body_navbar">
          <li id="link" className="body_navbarlist">
            <Link to="/">Patient List</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/create">Registration</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/visitList">Schedule</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/usersList">User List</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}