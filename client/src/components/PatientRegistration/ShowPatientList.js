import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Modal, Button } from 'react-bootstrap'
import CreatePatientListModal from '../Scheduling/createPatientListModal'
// import RecordCard from './RecordCard'
import {
  format,
  getDate,
  startOfMonth,
  getDay,
  subMonths,
  endOfMonth,
  addDays,
  addMonths,
  addWeeks,
  startOfWeek,
  parseISO,
  formatISO,
  getMonth,
  getYear,
  isWeekend,
  isSaturday,
  isSunday,
} from 'date-fns'

export default function ShowRecordList() {
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
        <Link
          className="btn btn-secondary btn-sm" title='View Patient Details'
          to={`/registrationDetails/${props.record._id}`}
        >
          <i class="fa fa-file-text-o" aria-hidden="true"></i>
        </Link>{' '}
        <Link
          className="btn btn-success btn-sm" title='Create Visit'
          to={`/createVisit/${props.record._id}`}
        >
          <i class="fa fa-user-md" aria-hidden="true"></i>
        </Link>{' '}
        <Link
          className="btn btn-info btn-sm" title='Edit Patient'
          to={`/editPatient/${props.record._id}`}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </Link>{' '}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            props.deleteRecord(props.record._id)
          }}
        >
          <i className="fa fa-trash-o" aria-hidden="true" title='Delete' />
        </button>
      </td>
    </tr>
  )
  // const [patientRecord, setPatientRecord] = useState({
  //   medicalRecordNumber:'',
  //   visitNumber: '',
  //   firstName: '',
  //   lastName: '',
  //   middleName: '',
  //   gender: '',
  //   race: '',
  //   dateOfBirth: '',
  //   age: '',
  //   language: '',
  //   address: '',
  //   city: '',
  //   zipCode: '',
  //   state: '',
  //   email: '',
  //   addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  // })
  // const { id } = useParams()
  // const navigate = useNavigate()
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8081/api/records/${id}`)
  //     .then((res) => {
  //       setPatientRecord({
  //           medicalRecordNumber: res.data.medicalRecordNumber,
  //           visitNumber: res.data.visitNumber,
  //           firstName: res.data.firstName,
  //           lastName: res.data.lastName,
  //           middleName: res.data.middleName,
  //           gender: res.data.gender,
  //           race: res.data.race,
  //           dateOfBirth: res.data.dateOfBirth,
  //           age: res.data.age,
  //           language: res.data.language,
  //           address: res.data.address,
  //           city: res.data.city,
  //           zipCode: res.data.zipCode,
  //           state: res.data.state,
  //           email: res.data.email,
  //           addedDate: res.data.addedDate,
  //       })
  //     })
  //     .catch((err) => {
  //       console.log('Error from UpdateRecordInfo')
  //     })
  // }, [id])

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [showDateValue, setShowDateValue] = useState(new Date())
  const selectedDateDaily = format(showDateValue, 'yyyy-MM-dd')
  // console.log(selectedDateDaily)
  //#region for Modal

  // const VisitModal = () => (
  //   <Modal show={show} onHide={handleClose} size="lg" centered>
  //     <Modal.Header closeButton>
  //       <Modal.Title>Add a Visit</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <CreatePatientListModal  visitDate={selectedDateDaily} />
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <span style={{ textAlign: 'center' }}>
  //         Please make sure all information is current and accurate.
  //       </span>
  //     </Modal.Footer>
  //   </Modal>
  // )
  //firstName={patientRecord.firstName }
  // This method will map out the visits on the table
  // function displayVisitModal() {
  //   return <VisitModal />
  // }
  //#endregion

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
        setShowDateValue(new Date())
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
          <h3>Patient List</h3>
          {/* <div>{displayVisitModal()}</div> */}
          <label htmlFor="search" className="searchLabel">
            Search :{' '}
            <input
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
          <tbody>{patientList()}</tbody>
        </table>
      </div>
    </div>
  )
}
