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
    <td>
      <Link className="btn btn-info btn-sm" to={`/edit/${props.record._id}`}>
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

  const recordList =
    records.length === 0
      ? 'there is no record record!'
      : records.map((record, k) => <RecordCard record={record} key={k} />)

  return (
    // <div className='ShowRecordList'>
    //   <div className='container'>
    //     <div className='row'>
    //       <div className='col-md-12'>
    //         <br />
    //         <h2 className='display-4 text-center'>Records List</h2>
    //       </div>

    //       <div className='col-md-11'>
    //         <Link
    //           to='/create-record'
    //           className='btn btn-outline-warning float-right'
    //         >
    //           + Add New Record
    //         </Link>
    //         <br />
    //         <br />
    //         <hr />
    //       </div>
    //     </div>

    //     <div className='list'>{recordList}</div>
    //   </div>
    //   </div>

    <div className="grid_container">
      <div className="item1">
        <Header />
        {/* <div className="div-items" style={{ marginRight: 'auto' }}>
          <h3>Patient List</h3>
        </div>
        <div className="div-items" style={{ float: 'right' }}>
          <label htmlFor="search">
            Search :{' '}
            <input
              id="search"
              type="text"
              placeholder="Search here"
              onChange={handleChange}
              value={searchInput}
            />
          </label>
        </div> */}
      </div>
      <div className="item2">
        <Navbar />
      </div>

      <div className="item3">
        <div className="item3A">
          <h3>Patient List</h3>

          <label htmlFor="search">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{recordList}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowRecordList
