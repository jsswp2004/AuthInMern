import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
// import RecordCard from './RecordCard';
// import User from '../userregistration/userlist'
const RecordCard = (props) => (
  <tr>
    <td>{props.record.medicalRecordNumber}</td>
    <td>{props.record.visitNumber}</td>
    <td>{props.record.firstName}</td>
    <td>{props.record.middleName}</td>
    <td>{props.record.lastName}</td>
    <td>{props.record.dateOfBirth}</td>
    <td>{props.record.gender}</td>
    <td>{props.record.age}</td>
    <td>{props.record.race}</td>
    <td>{props.record.addedDate}</td>
    <td>
      <Link className="btn btn-info btn-sm" to={`/editPatient/${props.record._id}`}>
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </Link>{' '}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          props.deleteRecord(props.record._id)
        }}
      >
        <i className="fa fa-trash-o" aria-hidden="true" />
      </button>
    </td>
  </tr>
)

function ShowRecordList() {
  const [records, setRecords] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the input text
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
      
      return record.medicalRecordNumber.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        record.visitNumber.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        record.firstName.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        record.middleName.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        record.lastName.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        record.dateOfBirth.toString().toLowerCase().includes(searchInput.toLowerCase())
        
    }
  })

  function patientList() {
    return filteredData.map((record) => {
      return (
        <RecordCard record={record} deleteRecord={deleteRecord} key={record._id} />
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
          <h3>Patient List</h3>

          <label htmlFor="search" className='searchLabel' >
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

        <table className="table table-striped">
          <thead>
            <tr>
              <th>MRN</th>
              <th>Visit Number</th>
              <th>FirstName</th>
              <th>Middlename</th>
              <th>Lastname</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Race</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {/* {records.length === 0
          ? 'there is no record record!'
          : filteredData.map((record) => (
              <RecordCard record={record} deleteRecord={deleteRecord} key={record._id} />
            ))} */}
            {patientList()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowRecordList
