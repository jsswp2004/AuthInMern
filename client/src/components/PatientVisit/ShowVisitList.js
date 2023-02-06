import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'

const VisitCard = (props) => (
  <tr>
    {/* <td>{props.visit.medicalVisitNumber}</td>
    <td>{props.visit.visitNumber}</td> */}
    <td>{props.visit.firstName}</td>
    <td>{props.visit.middleName}</td>
    <td>{props.visit.lastName}</td>
    <td>{props.visit.visitDate}</td>
    <td>{props.visit.hourOfVisit}</td>
    <td>{props.visit.email}</td>
    <td>{props.visit.provider}</td>
    <td>{props.visit.addedDate}</td>
    <td>
      <Link
        className="btn btn-info btn-sm"
        to={`/editVisit/${props.visit._id}`}
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </Link>{' '}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          props.deleteRecord(props.visit._id)
        }}
      >
        <i className="fa fa-trash-o" aria-hidden="true" />
      </button>
    </td>
  </tr>
)

function ShowVisitList() {
  const [visits, setVisits] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/visits')
      .then((res) => {
        setVisits(res.data)
      })
      .catch((err) => {
        console.log('Error from ShowVisitList')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/visits/${id}`)
      .then((response) => {
        setVisits(visits.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
  }

  var filteredData = visits.filter((visit) => {
    if (searchInput === '') {
      return visit
    // } else if (regDate !== '') {
    //   return visit.filter((visit) => 
    //     visit.visitDate 
    //     .toString()
    //       .toLowerCase()
    //       .includes(searchInput.toLowerCase())
    //   }
    else {
      return (
        visit.firstName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.middleName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.lastName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.visitDate
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.hourOfVisit
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.email
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.provider
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        visit.addedDate
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
    }
  })
  const [regDate, setRegFilterDate] = useState(new Date())

  console.log('regDate', regDate)
  function patientList() {
    return filteredData
      .slice(0, 20)
      .sort((a, b) =>
        Date.parse(a.visitDate) > Date.parse(b.visitDate) ? -1 : 1,
      )
      .map((visit) => {
        return (
          <VisitCard
            visit={visit}
            deleteRecord={deleteRecord}
            key={visit._id}
          />
        )
      })
  }
  // const onChange = (e) => {
  //   setVisit({ ...visit, [e.target.name]: e.target.value })
  // }

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
  return (
    <div className="grid_container" style={{ height: '100px' }}>
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>

      <div className="item3">
        <div className="item3A">
          <div style={{ width: '20%' }}>
            <h3>Patient Visits</h3>
          </div>
          <div style={{ width: '60%' }}>
            <span className="filter__search-label">Filter table</span>
            <label className="filter__search-label">
              Visit Date:
              <input
                  type="date"
                  className="filter__search-input"
                  id="registrationDateFilter"
                  value={regDate}
                  onChange={(newValue) => {
                    setRegFilterDate(newValue.target.value)
                  }}
                />
              {/* <div className="filter_navbarlist">

              </div> */}
            </label>
            <label htmlFor="search" className="filter__search-label">
              Provider:
              <select
              className="form-control select"
              name="provider"
              value={visits.provider}
              // onChange={onChange}
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
            </label>

          </div>
          <div style={{ width: '20%' }}>
            <label htmlFor="search" className="searchLabel">
              Search :{' '}
              <input
                id="search"
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
              />
            </label>
          </div>
        </div>
        <div className="item3B" style={{ overflowY: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>Middlename</th>
                <th>Lastname</th>
                <th>Visit Date</th>
                <th>Time</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{patientList()}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ShowVisitList
