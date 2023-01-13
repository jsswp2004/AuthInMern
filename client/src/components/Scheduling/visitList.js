import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { format, startOfMonth } from 'date-fns'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Visit from '../scheduling/visit'
import VisitWeekly from '../scheduling/visitWeekly'
import moment from 'moment'
import Navbar from '../navigation/navbar'
import {
  View,
  monthNames,
  // weekdays,
} from '../listDictionaries/listData/listDictionariesData'
import CreateVisit from '../scheduling/createvisit'

export default function VisitList() {
  //code for datepicker
  const [showDateValue, setShowDateValue] = useState(new Date())
  //#region code for Modal methods for creating visit
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const VisitModal = () => (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateVisit />
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
  //
  //#region months dropdown code
  const viewValues = View
  //#endregion
  //
  //#region code for view select dropdown
  const [selectViewValue, setViewValue] = React.useState('Monthly')
  const viewValueChange = (event) => {
    setViewValue(event.target.value)
  }
  //#endregion
  //
  //#region code for base date values
  let newdate = new Date(showDateValue)
  // let newDateName = newdate.getDay()
  let monthIndex = newdate.getMonth()
  let monthName = monthNames[monthIndex]
  // let nameOfTheDay = weekdays[newDateName]
  let dayOfSunday = 1
  let dayOfTheMonth = newdate.getDate()

  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  const currentYear = newdate.getFullYear()
  const currentMonth = newdate.getMonth() + 1 // 👈️ months are 0-based
  const previousMonth = newdate.getMonth()
  let daysOfTheMonth = getDaysInMonth(currentMonth, currentYear)
  let daysOfPreviousMonth = getDaysInMonth(previousMonth, currentYear)
  //#endregion
  //
  //#region captures and sets value of the search input text
  const [searchInput, setSearchInput] = useState(
    // moment(showDateValue).format('YYYY-MM-DD'),
    format(showDateValue, 'yyyy-MM-dd'),
  )
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  //#endregion
  //

  //#region picks the date for the start of the month
    // const dateSelected = moment(showDateValue).format('YYYY-MM-DD')
  const dateSelected = format(showDateValue, 'yyyy-MM-dd')
    
    let startOfTheMonth = startOfMonth(dateSelected).format('YYYY-MM-DD')
    //     moment(dateSelected)
    // .startOf('month')
    // .format('YYYY-MM-DD')
    console.log(startOfTheMonth)
  let startOfTheMonthDate = parseInt(moment(startOfTheMonth).format('D'))
  //   console.log(startOfTheMonthDate + 3)
  // picks the day number for the start of the month
  let startOfTheMonthDayNumber = moment(startOfTheMonth).day()
  //#endregion code for each monthly visit dates
  //
  //#region code for setting visits
  const [visits, setVisits] = useState([])
  

  //#endregion
  //

  return (
    <div className="grid-container">
      <div className="item1">
        <div className="div-items"></div>

        <h3
          style={{
            float: 'left',
            marginBottom: '0px',
            verticalAlign: 'middle',
          }}
        >
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
            // showMonthYearPicker
            // showFullMonthYearPicker
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
        <>
          <Button
            className="openVisitModalButton"
            onClick={handleShow}
            data-toggle="tooltip"
            data-placement="right"
            title="Add Visit"
            style={{ marginLeft: 'auto', height: '38px' }}
          >
            <i className="fa fa-solid fa-plus"></i>
          </Button>
          <div>{displayVisitModal()}</div>
        </>
        {/* modal end*/}
        {/* search start */}
        <div className="search">
          <a
            data-toggle="tooltip"
            data-placement="right"
            title="Search for Visit"
            href="/visitSchedule"
            class="btn btn-info"
            role="button"
          >
            {' '}
            <i class="fa fa-search" aria-hidden="true"></i>
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
      <div className="item2">
        <Navbar></Navbar>
      </div>
      <div className="item3">
        <div className="calendar-wrapper">
          {/* monthly calendar */}
          <ul
            className="calendar01"
            id="calendarWeekly"
            style={{
              display: selectViewValue === 'Monthly' ? '' : 'none',
              paddingLeft: '0px',
              marginBottom: '0px',
            }}
          >
            <div style={{ display: 'block' }}>
              <div className="grid-weeklycalcontainer">
                {/* First Sunday */}
                <div className="Sunday">
                  <li className="calendar-item weekday">
                    <div className="calendar-monthlyitem">
                      SUN{' '}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth - 1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth - 2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth - 3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth - 4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth - 5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthlyColumnStart}
                    // style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {/* {visitListMonthlyDay1()} */}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="Monday">
                  {/* style={{ height:'150px' }} */}
                  <li className="calendar-item weekday">
                    <div className="calendar-monthlyitem">
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 1
                          : startOfTheMonthDayNumber === 1
                          ? startOfTheMonthDate
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth - 1
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth - 2
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth - 3
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth - 4
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay2()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="Tuesday">
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 2
                          : startOfTheMonthDayNumber === 1
                          ? startOfTheMonthDate + 1
                          : startOfTheMonthDayNumber === 2
                          ? startOfTheMonthDate
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth - 1
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth - 2
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth - 3
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay3()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="Wednesday">
                  <li className="calendar-item weekday">
                    <div>
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 3
                          : startOfTheMonthDayNumber === 1
                          ? startOfTheMonthDate + 2
                          : startOfTheMonthDayNumber === 2
                          ? startOfTheMonthDate + 1
                          : startOfTheMonthDayNumber === 3
                          ? startOfTheMonthDate
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth - 1
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth - 2
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay4()}{' '}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="Thursday">
                  <li className="calendar-item weekday">
                    <div>
                      THU
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 4
                          : startOfTheMonthDayNumber === 1
                          ? startOfTheMonthDate + 3
                          : startOfTheMonthDayNumber === 2
                          ? startOfTheMonthDate + 2
                          : startOfTheMonthDayNumber === 3
                          ? startOfTheMonthDate + 1
                          : startOfTheMonthDayNumber === 4
                          ? startOfTheMonthDate
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth - 1
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay5()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="Friday">
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 5
                          : startOfTheMonthDayNumber === 1
                          ? startOfTheMonthDate + 4
                          : startOfTheMonthDayNumber === 2
                          ? startOfTheMonthDate + 3
                          : startOfTheMonthDayNumber === 3
                          ? startOfTheMonthDate + 2
                          : startOfTheMonthDayNumber === 4
                          ? startOfTheMonthDate + 1
                          : startOfTheMonthDayNumber === 5
                          ? startOfTheMonthDate
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay6()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="Saturday">
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 6
                          : startOfTheMonthDayNumber === 1
                          ? startOfTheMonthDate + 5
                          : startOfTheMonthDayNumber === 2
                          ? startOfTheMonthDate + 4
                          : startOfTheMonthDayNumber === 3
                          ? startOfTheMonthDate + 3
                          : startOfTheMonthDayNumber === 4
                          ? startOfTheMonthDate + 2
                          : startOfTheMonthDayNumber === 5
                          ? startOfTheMonthDate + 1
                          : startOfTheMonthDayNumber === 6
                          ? startOfTheMonthDate
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    {visitListMonthlyDay7()}
                  </li>
                </div>
                {/* 2nd Sunday */}
                <div className="SecondSunday">
                  <li className="calendar-item weekday">
                    <div>
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 7
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 7 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            7 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            7 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            7 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            7 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            7 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    {visitListMonthlyDay8()}
                  </li>
                </div>
                <div className="SecondMonday">
                  <li className="calendar-item weekday">
                    <div>
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 8
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 8 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            8 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            8 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            8 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            8 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            8 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay9()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="SecondTuesday">
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 9
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 9 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            9 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            9 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            9 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            9 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            9 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay10()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="SecondWednesday">
                  <li className="calendar-item weekday">
                    <div>
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 10
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 10 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            10 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            10 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            10 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            10 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            10 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay11()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="SecondThursday">
                  <li className="calendar-item weekday">
                    <div>
                      THU
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 11
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 11 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            11 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            11 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            11 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            11 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            11 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay12()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="SecondFriday">
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 12
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 12 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            12 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            12 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            12 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            12 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            12 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay13()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="SecondSaturday">
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 13
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 13 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            13 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            13 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            13 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            13 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            13 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay14()}
                      </tbody>
                    </table>
                  </li>
                </div>
                {/* third sunday */}
                <div className="ThirdSunday">
                  <li className="calendar-item weekday">
                    <div>
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 14
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 14 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            14 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            14 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            14 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            14 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            14 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    {visitListMonthlyDay15()}
                  </li>
                </div>
                <div className="ThirdMonday">
                  <li className="calendar-item weekday">
                    <div>
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 15
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 15 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            15 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            15 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            15 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            15 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            15 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay16()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="ThirdTuesday">
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 16
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 16 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            16 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            16 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            16 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            16 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            16 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay17()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="ThirdWednesday">
                  <li className="calendar-item weekday">
                    <div>
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 17
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 17 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            17 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            17 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            17 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            17 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            17 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay18()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="ThirdThursday">
                  <li className="calendar-item weekday">
                    <div>
                      THU
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 18 > daysOfPreviousMonth
                          ? startOfTheWeek + 18 - daysOfPreviousMonth
                          : startOfTheWeek + 18} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 18
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 18 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            18 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            18 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            18 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            18 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            18 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay19()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="ThirdFriday">
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 19
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 19 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            19 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            19 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            19 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            19 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            19 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay20()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="ThirdSaturday">
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 20
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 20 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            20 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            20 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            20 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            20 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            20 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay21()}
                      </tbody>
                    </table>
                  </li>
                </div>
                {/* fourth sunday */}
                <div className="FourthSunday">
                  <li className="calendar-item weekday">
                    <div>
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 21 > daysOfPreviousMonth
                          ? startOfTheWeek + 21 - daysOfPreviousMonth
                          : startOfTheWeek + 21} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 21
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 21 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            21 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            21 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            21 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            21 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            21 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    {visitListMonthlyDay22()}
                  </li>
                </div>
                <div className="FourthMonday">
                  <li className="calendar-item weekday">
                    <div>
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 22
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 22 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            22 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            22 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            22 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            22 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            22 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay23()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FourthTuesday">
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 23 > daysOfPreviousMonth
                          ? startOfTheWeek + 23 - daysOfPreviousMonth
                          : startOfTheWeek + 23} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 23
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 23 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            23 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            23 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            23 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            23 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            23 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay24()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FourthWednesday">
                  <li className="calendar-item weekday">
                    <div>
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {/* {startOfTheWeek + 24 > daysOfPreviousMonth
                          ? startOfTheWeek + 24 - daysOfPreviousMonth
                          : startOfTheWeek + 24}{' '} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 24
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 24 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            24 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            24 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            24 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            24 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            24 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay25()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FourthThursday">
                  <li className="calendar-item weekday">
                    <div>
                      THU
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 25 > daysOfPreviousMonth
                          ? startOfTheWeek + 25 - daysOfPreviousMonth
                          : startOfTheWeek + 25} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 25
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 25 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            25 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            25 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            25 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            25 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            25 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay26()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FourthFriday">
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 26 > daysOfPreviousMonth
                          ? startOfTheWeek + 26 - daysOfPreviousMonth
                          : startOfTheWeek + 26} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 26
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 26 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            26 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            26 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            26 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            26 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            26 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay27()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FourthSaturday">
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 27 > daysOfPreviousMonth
                          ? startOfTheWeek + 27 - daysOfPreviousMonth
                          : startOfTheWeek + 27} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 27
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 27 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            27 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            27 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            27 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            27 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            27 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay28()}
                      </tbody>
                    </table>
                  </li>
                </div>
                {/* fifth sunday */}
                <div className="FifthSunday">
                  <li className="calendar-item weekday">
                    <div>
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 28 > daysOfPreviousMonth
                          ? startOfTheWeek + 28 - daysOfPreviousMonth
                          : startOfTheWeek + 28} */}
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 28
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 28 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            28 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            28 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            28 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            28 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            28 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    {visitListMonthlyDay29()}
                  </li>
                </div>
                <div className="FifthMonday">
                  <li className="calendar-item weekday">
                    <div>
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 29
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 29 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            29 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            29 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            29 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            29 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            29 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay30()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FifthTuesday">
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 30
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 30 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            30 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            30 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            30 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            30 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            30 -
                            endOfThePreviousMonth -
                            5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      style={{
                        display:
                          moment(monthlyDay31).diff(
                            moment(monthlyDay31)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay31()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FifthWednesday">
                  <li className="calendar-item weekday">
                    <div>
                      WED{' '}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {moment(monthlyDay32).format('D')}
                        {/* {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 31
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 31 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                            31 -
                            endOfThePreviousMonth -
                            1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                            31 -
                            endOfThePreviousMonth -
                            2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                            31 -
                            endOfThePreviousMonth -
                            3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                            31 -
                            endOfThePreviousMonth -
                            4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                            31 -
                            endOfThePreviousMonth -
                            5
                          : ''} */}
                        {/* {' '} */}
                        {/* {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 31 > daysOfTheMonth
                            ? ''
                            : startOfTheMonthDate + 31
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 31 - endOfThePreviousMonth >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth + 31 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              1 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              2 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              3 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              4 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              5 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              31 -
                              endOfThePreviousMonth -
                              5
                          : ''} */}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      style={{
                        display:
                          moment(monthlyDay32).diff(
                            moment(monthlyDay32)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay32()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FifthThursday">
                  <li className="calendar-item weekday">
                    <div>
                      THU{' '}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {moment(monthlyDay33).format('D')}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      style={{
                        display:
                          moment(monthlyDay33).diff(
                            moment(monthlyDay33)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay33()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div className="FifthFriday">
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {moment(monthlyDay34).format('D')}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      // style={{ display: parseInt(moment(monthlyDay34).date()) + endOfThePreviousMonth > daysOfTheMonth ? 'none' : 'flex' }}
                      style={{
                        display:
                          moment(monthlyDay34).diff(
                            moment(monthlyDay34)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay34()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span
                        value="35"
                        style={{ float: 'right', marginRight: '10px' }}
                      >
                        {moment(monthlyDay35).format('D')}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay35()}
                      </tbody>
                    </table>
                  </li>
                </div>
                {/* sixth sunday */}
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {moment(monthlyDay36).format('D')}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    {visitListMonthlyDay36()}
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {moment(monthlyDay37).format('D')}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      style={{
                        display:
                          moment(monthlyDay37).diff(
                            moment(monthlyDay37)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay37()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {moment(monthlyDay38).format('D')}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      style={{
                        display:
                          moment(monthlyDay38).diff(
                            moment(monthlyDay38)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay38()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {' '}
                        {moment(monthlyDay39).format('D')}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table
                      className="table table-striped"
                      style={{
                        display:
                          moment(monthlyDay39).diff(
                            moment(monthlyDay39)
                              .endOf('month')
                              .format('YYYY-MM-DD'),
                            'days',
                          ) <= 0
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay39()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      THU
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {/* {startOfTheWeek + 32 > daysOfPreviousMonth
                          ? startOfTheWeek + 32 - daysOfPreviousMonth
                          : startOfTheWeek + 32} */}

                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 39 > daysOfTheMonth
                            ? ''
                            : startOfTheMonthDate + 39
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 39 - endOfThePreviousMonth >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth + 39 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              1 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              2 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              3 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              4 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              5 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              39 -
                              endOfThePreviousMonth -
                              5
                          : ''}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles"></tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 40 > daysOfTheMonth
                            ? ''
                            : startOfTheMonthDate + 40
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 40 - endOfThePreviousMonth >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth + 40 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              1 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              2 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              3 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              4 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              5 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              40 -
                              endOfThePreviousMonth -
                              5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles"></tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span
                        value="35"
                        style={{ float: 'right', marginRight: '10px' }}
                      >
                        {startOfTheMonthDayNumber === 0
                          ? startOfTheMonthDate + 41 > daysOfTheMonth
                            ? ''
                            : startOfTheMonthDate + 41
                          : startOfTheMonthDayNumber === 1
                          ? endOfThePreviousMonth + 41 - endOfThePreviousMonth >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth + 41 - endOfThePreviousMonth
                          : startOfTheMonthDayNumber === 2
                          ? endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              1 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              1
                          : startOfTheMonthDayNumber === 3
                          ? endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              2 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              2
                          : startOfTheMonthDayNumber === 4
                          ? endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              3 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              3
                          : startOfTheMonthDayNumber === 5
                          ? endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              4 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              4
                          : startOfTheMonthDayNumber === 6
                          ? endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              5 >
                            daysOfTheMonth
                            ? ''
                            : endOfThePreviousMonth +
                              41 -
                              endOfThePreviousMonth -
                              5
                          : ''}
                      </span>
                    </div>
                  </li>

                  <li
                    className="calendar-item calendar-day"
                    style={gridMonthly}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles"></tbody>
                    </table>
                  </li>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
