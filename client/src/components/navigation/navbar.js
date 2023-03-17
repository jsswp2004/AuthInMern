import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'


import { Link } from 'react-router-dom'


export default function Navbar() {

  return (
    <div id="navbarSupportedContent">
      <div className="header-bodynavbar">
        <ul className="body_navbar">
          <li id="link" className="body_navbarlist">
            <Link to="/clinicVisit">Clinic Schedule</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/">Home</Link>
          </li> */}

          {/* <li id="link" className="body_navbarlist">
            <Link to="/createClient">Registration</Link>
          </li> */}

          <li id="link" className="body_navbarlist">
            <Link to="/patientlist">Registered Patients</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/createPatient">Add a patient</Link>
          </li> */}
          <li id="link" className="body_navbarlist">
            <Link to="/visitlist">Visit List</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/calendarSchedule">Visit Schedule</Link>
          </li> */}
          {/* <li id="link" className="body_navbarlist">
            <Link to="/createVisit">Create Schedule</Link>
          </li> */}


          <li id="link" className="body_navbarlist" >
            {/* style={{ display: 'none' }} */}
            <Link to="/settingsPage">Manage Settings</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/testPage">Test Page</Link>
          </li> */}
          {/* <ul className="body_navbarlist dropdown">
            <span>Settings</span>
            <li className="dropdown-content">
              <a href="/usersList">User Profiles</a> <br />
              <a href="/rolesList">Roles</a>
            </li>

          </ul> */}
        </ul>
      </div>
    </div>
  )
}
