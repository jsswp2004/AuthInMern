import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import RecordCard from './RecordCard'

export default function ShowRecordList() {
  const [records, setRecords] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/records')
      .then((res) => {
        setRecords(res.data)
      })
      .catch((err) => {
        console.log('Error from ShowRecordList')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/records/${id}`)
      .then((response) => {
        setRecords(records.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete record')
      })
  }

  var filteredData = records.filter((record) => {
    if (searchInput === '') {
      return record
    } else {
      return (
        record.medicalRecordNumber
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.visitNumber
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.firstName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.middleName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.lastName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.dateOfBirth
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.addedDate
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.race
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.age
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.gender
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
    }
  })

  function patientList() {
    return filteredData
      .sort((a, b) =>
        Date.parse(a.addedDate) > Date.parse(b.addedDate) ? -1 : 1,
      )
      .map((record) => {
        return (
          <RecordCard
            record={record}
            deleteRecord={deleteRecord}
            key={record._id}
          />
        )
      })
  }

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <div className="item3A">
          <h4 className='patientListHeader'>Patient List</h4>
          <label htmlFor="search" className="searchLabel">
            Search :{' '}
            <input
              className="searchInput"
              id="search"
              type="text"
              placeholder="Search patients"
              onChange={handleChange}
              value={searchInput}
            />
          </label>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th id="columnName">MRN</th>
              <th id="columnName">Visit Number</th>
              <th id="columnName">FirstName</th>
              <th id="columnName">Middlename</th>
              <th id="columnName">Lastname</th>
              <th id="columnName">DOB</th>
              <th id="columnName">Gender</th>
              <th id="columnName">Age</th>
              <th id="columnName">Race</th>
              <th id="columnName">Date Added</th>
              <th id="columnName">Action</th>
            </tr>
          </thead>
          <tbody>{patientList()}</tbody>
        </table>
      </div>
    </div>
  )
}
