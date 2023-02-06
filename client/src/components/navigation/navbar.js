import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
// We import bootstrap to make our application look better.
import 'bootstrap/dist/css/bootstrap.css'

// We import NavLink to utilize the react router.
import { Link } from 'react-router-dom'

// Here, we display our Navbar
export default function Navbar() {
  const [regDate, setRegFilterDate] = useState(new Date())
  
  console.log('regDate', regDate)
  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })

  
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        const data = response.data
        setUserMD(data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)

  const { id } = useParams()
  const navigate = useNavigate()

  const [visit, setVisit] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    addedDate: '',
    visitDate: '',
    provider: '',
  })

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/visits/${id}`)
      .then((res) => {
        setVisit({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          email: res.data.email,
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), //res.data.addedDate,
          visitDate: res.data.visitDate,
          hourOfVisit: res.data.hourOfVisit,
          provider: res.data.provider,
        })
      })
      .catch((err) => {
        console.log('Error from UpdateVisitInfo')
      })
  }, [id])

  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }
  return (
    <div id="navbarSupportedContent">
      <div className="header-bodynavbar">
        <ul className="body_navbar">
          {/* <li id="link" className="body_navbarlist">
            <Link to="/">Home</Link>
          </li> */}

          {/* <li id="link" className="body_navbarlist">
            <Link to="/createClient">Registration</Link>
          </li> */}
          <li id="link" className="body_navbarlist">
            <Link to="/createPatient">Register a patient</Link>
          </li>
          <li id="link" className="body_navbarlist">
            <Link to="/patientlist">Patient List</Link>
          </li>
          {/* <li id="link" className="body_navbarlist">
            <Link to="/visitlist">Schedule</Link>
          </li> */}
          {/* <li id="link" className="body_navbarlist">
            <Link to="/calendarSchedule">Visit Schedule</Link>
          </li> */}
          {/* <li id="link" className="body_navbarlist">
            <Link to="/createVisit">Create Schedule</Link>
          </li> */}

          {/* <li id="link" className="body_navbarlist">
            <Link to="/usersList">User List</Link>
          </li> */}
          <li id="link" className="body_navbarlist">
            <Link to="/clinicVisit">Clinic Visit</Link>
          </li>

          <li className="body_navbarlist dropdown">
            <span>Settings</span>
            <div className="dropdown-content">
              <a href="/usersList">User Profiles</a>
            </div>
          </li>
        </ul>
      </div>
      {/* <div className="filter-container">
        <div className="filter">
          <span className="filter__search-label">Filter table</span>
          <ul className="filter_navbar">
            <label htmlFor="search" className="filter__search-label">
              Visit Date:
            </label>
            <li className="filter_navbarlist">
              <input
                type="date"
                className="filter__search-input"
                id='registrationDateFilter'
                value={regDate}
                onChange={(newValue) => {
                  setRegFilterDate(newValue.target.value)
                  }}
                
              />
            </li>
            <label htmlFor="search" className="filter__search-label">
              Provider:
            </label>
            <li className="filter_navbarlist">
            </li>
            <select
              className="form-control select"
              name="provider"
              value={visit.provider}
              onChange={onChange}
            >
              {' '}
              <option value="" disabled selected>
                Select Provider
              </option>
              {providerMD.map((doc) => (
                <option key={doc.value} value={doc.value}>
                  {doc}
                </option>
              ))}
            </select>
          </ul>
        </div>
      </div> */}
    </div>
  )
}
