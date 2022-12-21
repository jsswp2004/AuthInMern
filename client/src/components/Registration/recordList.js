import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navigation/navbar'
const Record = (props) => (
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

export default function RecordList() {
  const [records, setRecords] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  // console.log(searchInput)
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:8080/record/`)

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const records = await response.json()
      setRecords(records)
    }

    getRecords()

    return
  }, [records.length])

  //this method will filter the table
  const filteredData = records.filter((el) => {
    //if no input the return the original
    if (searchInput === '') {
      return el
    }
    //return the item which contains the user input
    else {
      return Object.values(el) //el.medicalRecordNumber
        .toString()
        .toLowerCase()
        .includes(searchInput)
    }
  })

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5002/record/${id}`, {
      method: 'DELETE',
    })

    const newRecords = records.filter((el) => el._id !== id)
    setRecords(newRecords)
  }

  // This method will map out the records on the table
  function recordList() {
    return filteredData.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      )
    })
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="grid-container">
      <div className="item1" style={{ height: 50 }}>
        <div className="div-items" style={{ marginRight: 'auto' }}>
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
        </div>
      </div>
      <div className="item2" style={{ height: 'calc(100vh - 60px)' }}>
        <Navbar></Navbar>
      </div>

      <div className="item3">
        <table className="table table-striped" style={{ marginTop: 20 }}>
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
          <tbody>{recordList()}</tbody>
        </table>
      </div>
    </div>
  )
}
