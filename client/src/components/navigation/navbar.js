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
            <Link to="/">Home</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/patientlist">Patient List</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/createClient">Registration</Link>
          </li> */}
          <li id="link" className="body_navbarlist">
            <Link to="/createPatient">Register Patient</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/visitlist">Schedule</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/createVisit">Create Schedule</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/usersList">User List</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/createUser">Create User</Link>
          </li> */}
        </ul>
      </div>
    </div>
  )
}
