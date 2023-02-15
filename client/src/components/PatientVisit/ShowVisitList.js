import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import format from 'date-fns/format'

const VisitCard = (props) => (
  <tr>
    <td>{props.visit.medicalRecordNumber}</td>
    <td>{props.visit.visitNumber}</td>
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
  const [regDate, setRegFilterDate] = useState('')
  const [selectMD, setSelectMD] = useState('')
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
  

  const dateRegister = regDate //format(regDate, 'yyyy-MM-dd')
  const dateRegistered = dateRegister
  console.log(selectMD.toLowerCase())
  var filteredMD = visits.filter((visit) => {
    if (selectMD === '') {
      return visit
    }
    else {
      return (
        visit.provider
          .toString()
          .includes(selectMD)
      )
    }
  })

  console.log(filteredMD)
  var filteredDat = filteredMD.filter((visit) => {
    if (dateRegistered === '') {
      return visit
    }
    else {
      return (
        visit.visitDate
          .toString()
          .toLowerCase()
          .includes(dateRegistered)
      )
    }
  })

  


  var filteredData = filteredDat.filter((visit) => {
    
    if (searchInput === '') {
      return visit
    } 
    else {
      return (
        visit.medicalRecordNumber
        .toString()
        .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
          visit.visitNumber
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
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

  //sort codes
  const [sortedField, setSortedField] = useState('visitDate')
  const [sortedDirection, setSortedDirection] = useState('asc')

  // console.log(sortedField, sortedDirection)
  function patientList() {
    if (sortedField === '' && sortedDirection === '') {
      return filteredData
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
    } else if
     (sortedField === 'visitDate' && sortedDirection === 'asc') {
      return filteredData
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
    } else if (sortedField === 'visitDate' && sortedDirection === 'dsc') {

      return filteredData
      .sort((a, b) =>
        Date.parse(a.visitDate) < Date.parse(b.visitDate) ? -1 : 1,
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
    
  }


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
          <div className='filter_navbarLeft'>
            <h4>Visit List</h4>
          </div>
          <div  className='.filter_navbarlist' >
            <span className="filter__search-label">Filter: </span>
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
            </label>
            <label className="filter__search-label"> Provider:
              <select
                key={visits.provider}
                className="filter__search-input"
                name="provider"
                value={visits.provider}
                onChange={(e) => {
                  setSelectMD(e.target.value)
                }}
            >
              {' '}
              <option key='Select' value="">
                Select Provider
              </option>
              {providerMD.map((doc) => (
                <option key={doc._id} value={doc.value}>
                  {doc}
                </option>
              ))}
            </select>
            </label>

          </div>
          {/* .filter_navbar */}
          <div className='filter_navbarRight'>
            <label htmlFor="search" className="searchLabel">
              Search :{' '}
              <input
                className="searchInput"
                id="search"
                type="text"
                placeholder="Type here to search"
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
              <th>MRN</th>
                <th>Visit ID</th>
                <th>FirstName</th>
                <th>Middlename</th>
                <th>Lastname</th>
                {/* <th>Visit Date</th> */}
                <th>
                <div className="parent">
                  <div className="child">Visit Date</div>
                  <div className="child sortdirection">
                    <i
                      className="fa fa-arrow-up fa-sm asc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('visitDate')
                        setSortedDirection('asc')
                      }}
                    />{' '}
                    <i
                      className="fa fa-arrow-down fa-sm dsc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('visitDate')
                        setSortedDirection('dsc')
                      }}
                    />
                  </div>
                </div>
              </th>
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
