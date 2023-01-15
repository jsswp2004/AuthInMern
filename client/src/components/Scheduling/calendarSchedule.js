import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { format, startOfMonth } from 'date-fns'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Visit from '../Scheduling/visit'
import VisitWeekly from '../Scheduling/visitWeekly'
import moment from 'moment'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Link } from 'react-router-dom'
import {
  View,
  monthNames,
  // weekdays,
} from '../listDictionaries/listData/listDictionariesData'
import axios from 'axios'
import CreateVisit from '../Scheduling/createvisit'
import CreateVisitModal from '../Scheduling/createvisitmodal'

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

export default function VisitList() {
  //#region code for view select dropdown
  const [selectViewValue, setViewValue] = React.useState('Monthly')
  const viewValueChange = (event) => {
    setViewValue(event.target.value)
  }
  //#region code for Modal methods for creating visit
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //#endregion
  //#region code for Modal methods for creating visit
  const [showVisit, setShowVisit] = useState(false)
  const handleCloseVisit = () => setShowVisit(false)
  const handleShowVisit = () => setShowVisit(true)
  //#endregion
  //#region code for Modal methods for creating visit
  const [showVisitWeekly, setShowVisitWeekly] = useState(false)
  const handleCloseVisitWeekly = () => setShowVisitWeekly(false)
  const handleShowVisitWeekly = () => setShowVisitWeekly(true)
  //#endregion
  //#region months dropdown code
  const viewValues = View
  //#endregion
  //#region base date values for calendar
  const [showDateValue, setShowDateValue] = useState(new Date())
  let newdate = new Date(showDateValue)
  let monthIndex = newdate.getMonth()
  let monthName = monthNames[monthIndex]
  const dateSelected = format(showDateValue, 'yyyy-MM-dd')
  //#endregion
  //#region captures and sets value of the search input text
  const [searchInput, setSearchInput] = useState(
    format(showDateValue, 'yyyy-MM-dd'),
  )
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  //#endregion
  //#region for modal
  //#region for weekly calendar
  let dayOfSunday = 1
  const gridWeeklyStart = {
    gridColumnStart: dayOfSunday,
    backgroundColor: ' #eeee',
    height: 'calc(100vh - 110px)',
  }
  //#endregion
  const VisitModal = () => (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateVisitModal />
      </Modal.Body>
      <Modal.Footer>
        <span style={{ textAlign: 'center' }}>
          Please make sure all information is current and accurate.
        </span>
      </Modal.Footer>
    </Modal>
  )
  // This method will map out the visits on the table
  function displayVisitModal() {
    return <VisitModal />
  }
  //#endregion
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
  const [visits, setVisits] = useState([])
  var filteredData = visits.filter((visit) => {
    if (searchInput === '') {
      return visit
    } else {
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
  function patientList() {
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
  }
  return (
    <div className="grid_container">
      <div className="item1">
        <Header></Header>
      </div>
      <div className="item2">
        <Navbar></Navbar>
      </div>
      <div className="item3">
        <div className="item3C">
          <h3
            style={{
              float: 'left',
              marginBottom: '0px',
              verticalAlign: 'middle',
            }}
          >
            {/* titlle for month */}
            {monthName}
          </h3>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={showDateValue}
              className="form-control"
              value={showDateValue}
              onChange={(newValue) => setShowDateValue(newValue)}
              monthsShown={2}
              todayButton="Today"
            />
          </div>
          <select
            style={{
              width: '200px',
              height: '38px',
              textAlign: 'center',
              verticalAlign: 'middle',
              marginLeft: '10px',
              paddingLeft: '0px',
              paddingBottom: '0px',
              paddingTop: '0px',
              paddingRight: '0px',
            }}
            className="form-control select"
            id="calendarView"
            value={selectViewValue}
            onChange={viewValueChange}
          >
            {viewValues.map((viewval) => (
              <option value={viewval.value}>{viewval.name}</option>
            ))}
          </select>
          {/* modal start */}
          <div
            style={{ marginLeft: 'auto', height: '38px', paddingRight: '5px' }}
          >
            <Button
              className="openVisitModalButton"
              onClick={handleShow}
              data-toggle="tooltip"
              data-placement="right"
              title="Add Visit"
            >
              <i className="fa fa-solid fa-plus"></i>
            </Button>
            <div>{displayVisitModal()}</div>
          </div>
          {/* modal end*/}
          {/* search start */}
          <div className="search">
            <a
              data-toggle="tooltip"
              data-placement="right"
              title="Search for Visit"
              href="/visitlist"
              className="btn btn-info"
              role="button"
            >
              {' '}
              <i className="fa fa-search" aria-hidden="true"></i>
            </a>
          </div>
          <div className="div-items" style={{ float: 'right' }}>
            <label
              htmlFor="search"
              // style={{ display: selectViewValue === 'Daily' ? '' : 'none' }}
              style={{ display: 'none' }}
            >
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
          {/* search end */}
        </div>
        <div className="calendar-wrapper">
          {/* daily calendar */}
          <ul
            className="calendar01"
            id="calendarDaily"
            style={{
              display: selectViewValue === 'Daily' ? '' : 'none',
              columnSpan: 'all',
            }}
          >
            {/* weekdays */}
            <li className="weekday" id="calendarDaily">
              {/* <h5 style={{ marginBottom: '0px', background: 'white' }}>
                {nameOfTheDay}, {dayOfTheMonth}
              </h5> */}
            </li>
            {/* calendar item */}
            <li
              className="calendar-item calendar-day"
              id="calendarDaily"
              style={gridWeeklyStart}
            >
              <div id="calendarDailyDate">
                <h5 style={{ backgroundColor: 'white' }}>{dateSelected}</h5>
              </div>

              <div>
                <table
                  className="table table-striped"
                  style={{ marginTop: 20 }}
                >
                  <thead>
                    <tr className="trStyles">
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
                  <tbody className="trStyles">{patientList()}</tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
