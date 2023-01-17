import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { format, getDate, startOfMonth, getDay } from 'date-fns'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import Visit from '../Scheduling/visit'
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
// import CreateVisit from '../Scheduling/createvisit'
import CreateVisitModal from '../Scheduling/createvisitmodal'
//#region for visit component
const VisitCard = (props) => (
  <tr>
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
      </Link>
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
//#endregion

export default function VisitList() {
  //#region code for setting state for visits
  const [visits, setVisits] = useState([])
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
  // console.log(visits)
  //#endregion
  //#region code for calendar view select dropdown
  const [selectViewValue, setViewValue] = React.useState('Monthly')
  const viewValueChange = (event) => {
    setViewValue(event.target.value)
  }
  //#endregion
  //#region code for Modal methods for creating visit
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //#endregion
  //#region code for Modal methods for creating visit
//   const [showVisit, setShowVisit] = useState(false)
//   const handleCloseVisit = () => setShowVisit(false)
//   const handleShowVisit = () => setShowVisit(true)
  //#endregion
  //#region code for Modal methods for creating visit
//   const [showVisitWeekly, setShowVisitWeekly] = useState(false)
//   const handleCloseVisitWeekly = () => setShowVisitWeekly(false)
//   const handleShowVisitWeekly = () => setShowVisitWeekly(true)
  //#endregion
  //#region months dropdown code
  const viewValues = View
  //#endregion
  //#region base date values for calendar
  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  const [showDateValue, setShowDateValue] = useState(new Date())
  const dateSelected = format(showDateValue, 'yyyy-MM-dd')
  let newdate = new Date(showDateValue)
  let monthIndex = newdate.getMonth()
  let monthName = monthNames[monthIndex].value
  let startOfTheMonth = startOfMonth(new Date(dateSelected))

  // .startOf('month')
  // .format('YYYY-MM-DD')
  //   console.log(getDate(startOfTheMonth))
  const currentYear = newdate.getFullYear()
  const currentMonth = newdate.getMonth() + 1 // 👈️ months are 0-based
  //   const previousMonth = newdate.getMonth()
  let startOfTheMonthDate = getDate(startOfTheMonth) //parseInt(moment(startOfTheMonth).format('D')) //
  let daysOfTheMonth = getDaysInMonth(currentMonth, currentYear)
  // console.log(startOfTheMonthDate)
  //     const today = new Date()
  // const firstDateOfMonth = format(today, 'yyyy-MM-01')
  //     console.log(firstDateOfMonth)
  //     console.log(dateSelected)

  let startOfTheMonthDayNumber = getDay(new Date(startOfTheMonth)) // moment(startOfTheMonth).day()
  // console.log(startOfTheMonthDayNumber)
  // console.log(getDay(new Date(startOfTheMonth)))

  const endOfThePreviousMonth = parseInt(
    moment(dateSelected).subtract(1, 'months').endOf('month').format('DD'),
  )
  const gridMonthlyColumnStart = {
    gridColumnStart: startOfTheMonthDayNumber,
    backgroundColor: ' #eeee',
    height: '100px',
  }

  const gridWeekly = {
    backgroundColor: ' #eeee',
    height: 'calc(100vh - 132px)',
  }

  const gridMonthly = {
    backgroundColor: ' #eeee',
    height: '100px',
  }
  const previousMonth = newdate.getMonth()
  let daysOfPreviousMonth = getDaysInMonth(previousMonth, currentYear)
  let dayOfTheMonth = newdate.getDate()
  let dayOfTheWeek = newdate.getDay() > 7 ? 1 : newdate.getDay()
  let startDayOfTheWeek =
    newdate === '2022-05-01' ? 1 : dayOfTheMonth - dayOfTheWeek
  let startOfTheWeek =
    startDayOfTheWeek < 1
      ? daysOfPreviousMonth - (dayOfTheWeek - 1)
      : startDayOfTheWeek

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
  //#region for weekly calendar base date values
  let dayOfSunday = 1
  const gridWeeklyStart = {
    gridColumnStart: dayOfSunday,
    backgroundColor: ' #eeee',
    height: 'calc(100vh - 110px)',
  }

  const gridWeeklyStartSun = {
    gridColumnStart: dayOfSunday,
    backgroundColor: ' #eeee',
    height: 'calc(100vh - 132px)',
  }

  //#endregion
  //#region for Modal
  const VisitModal = () => (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Visit</Modal.Title>
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
  //#region for delete method
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
  //#endregion
  //#region for filtering data
  var filterDataWithDate = visits.filter((visit) => {
    return visit.visitDate === dateSelected
  })
  // console.log(filterDataWithDate)
//   var filteredData = visits.filter((visit) => {
//     if (searchInput === '') {
//       return visit
//     } else {
//       return (
//         visit.firstName
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.middleName
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.lastName
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.visitDate
//           .toString()
//           .toLowerCase()
//           //   .includes(new Date(visit.visitDate) === dateSelected)
//           .includes(searchInput.toLowerCase()) ||
//         visit.hourOfVisit
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.email
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.provider
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.addedDate
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase())
//       )
//     }
//   })
//   var filteredDataDaily = filterDataWithDate.filter((visit) => {
//     if (searchInput === '') {
//       return visit
//       //.includes(visit.date === dateSelected)
//     } else {
//       return (
//         visit.firstName
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.middleName
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.lastName
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.visitDate
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.hourOfVisit
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.email
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.provider
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase()) ||
//         visit.addedDate
//           .toString()
//           .toLowerCase()
//           .includes(searchInput.toLowerCase())
//       )
//     }
//   })
  //#endregion
  //#region for patient list
//   function patientList() {
//     return filteredData
//       .sort((a, b) =>
//         Date.parse(a.visitDate) > Date.parse(b.visitDate) ? -1 : 1,
//       )
//       .map((visit) => {
//         return (
//           <VisitCard
//             visit={visit}
//             deleteRecord={deleteRecord}
//             key={visit._id}
//           />
//         )
//       })
//   }
  function patientListDaily() {
    return (
      filterDataWithDate
        //filteredDataDaily
        //   .includes(new Date(showDateValue))
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
    )
  }
  // console.log(filteredDataDaily)
  //#endregion
  //#region for second day of the month
  const monthlyDay2 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(2, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(3, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(4, 'days')
          .format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay2 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay2)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay2)
    }
  })
  function visitListMonthlyDay2() {
    return [...visitMonthlyDay2]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region third day of the month
  const monthlyDay3 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : // ? moment(startOfTheMonth)
      //   .format('YYYY-MM-DD')
      startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(0, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(2, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(3, 'days')
          .format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay3 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay3)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay3)
    }
  })
  function visitListMonthlyDay3() {
    return [...visitMonthlyDay3]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region fourth day of the month
  const monthlyDay4 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : // ? moment(startOfTheMonth)
      //   .format('YYYY-MM-DD')
      startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).format('YYYY-MM-DD')
      : // .subtract(1, 'months')
      // .endOf('month')
      // .subtract(1, 'days')
      // .format('YYYY-MM-DD')
      startOfTheMonthDayNumber === 4
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(0, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(2, 'days')
          .format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay4 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay4)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay4)
    }
  })
  function visitListMonthlyDay4() {
    return [...visitMonthlyDay4]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //   console.log(
  //     visitListMonthlyDay4(),
  //     visitMonthlyDay4,
  //     monthlyDay4,
  //     moment(monthlyDay4).format('dddd'),
  //     'visitListMonthlyDay4',
  //   )
  //#endregion
  //#region fifth day of the month
  const monthlyDay5 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(0, 'days')
          .format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay5 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay5)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay5)
    }
  })
  function visitListMonthlyDay5() {
    return [...visitMonthlyDay5]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  // console.log(
  //   visitListMonthlyDay5(),
  //   visitMonthlyDay5,
  //   monthlyDay5,
  //   moment(monthlyDay5).format('dddd'),
  //   'visitListMonthlyDay5',
  // )
  //#endregion
  //#region sixth day of the month
  const monthlyDay6 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(dateSelected)
          .subtract(1, 'months')
          .endOf('month')
          .subtract(0, 'days')
          .format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay6 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay6)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay6)
    }
  })
  function visitListMonthlyDay6() {
    return [...visitMonthlyDay6]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  // console.log(
  //   visitListMonthlyDay6(),
  //   visitListMonthlyDay6,
  //   monthlyDay4,
  //   moment(monthlyDay6).format('dddd'),
  //   'visitListMonthlyDay5',
  // )

  //#endregion
  //#region seventh day of the month
  const monthlyDay7 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay7 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay7)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay7)
    }
  })
  function visitListMonthlyDay7() {
    return [...visitMonthlyDay7]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region eight day of the month
  //const dateMonthly_08 = moment(monthlyDay2).add(7, 'days').format('YYYY-MM-DD')
  const monthlyDay8 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(1, 'days').format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay8 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay8)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay8)
    }
  })
  function visitListMonthlyDay8() {
    return [...visitMonthlyDay8]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //   console.log(
  //     visitListMonthlyDay8(),
  //     visitListMonthlyDay8,
  //     monthlyDay8,
  //     moment(monthlyDay8).format('dddd'),
  //     'visitListMonthlyDay8',
  //   )
  //#endregion
  //#region ninth day of the month
  const dateMonthly_09 = moment(monthlyDay2).add(8, 'days').format('YYYY-MM-DD')
  const monthlyDay9 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(2, 'days').format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay9 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay9)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay9)
    }
  })
  function visitListMonthlyDay9() {
    return [...visitMonthlyDay9]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  // console.log(
  //   visitListMonthlyDay9(),
  //   visitListMonthlyDay9,
  //   monthlyDay9,
  //   moment(monthlyDay9).format('dddd'),
  //   'visitListMonthlyDay9',
  // )
  //#endregion
  //#region ninth day of the month
//   const dateMonthly_10 = moment(startOfTheMonth)
//     .add(9, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay10 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(3, 'days').format('YYYY-MM-DD')
      : ''

  const visitMonthlyDay10 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay10)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay10)
    }
  })
  function visitListMonthlyDay10() {
    return [...visitMonthlyDay10]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region tenth day of the month
  const monthlyDay11 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(4, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay11 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay11)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay11)
    }
  })
  function visitListMonthlyDay11() {
    return [...visitMonthlyDay11]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  // console.log(
  //   visitListMonthlyDay11(),
  //   visitListMonthlyDay11,
  //   monthlyDay11,
  //   moment(monthlyDay11).format('dddd'),
  //   'visitListMonthlyDay11',
  // )

  //#endregion
  //#region eleventh day of the month
//   const dateMonthly_12 = moment(startOfTheMonth)
//     .add(11, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay12 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(5, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay12 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay12)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay12)
    }
  })
  function visitListMonthlyDay12() {
    return [...visitMonthlyDay12]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  // console.log(
  //   visitListMonthlyDay12(),
  //   visitListMonthlyDay12,
  //   monthlyDay12,
  //   moment(monthlyDay12).format('dddd'),
  //   'visitListMonthlyDay12',
  // )

  //#endregion
  //#region twelfth day of the month
//   const dateMonthly_13 = moment(monthlyDay2)
//     .add(12, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay13 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(6, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay13 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay13)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay13)
    }
  })
  function visitListMonthlyDay13() {
    return [...visitMonthlyDay13]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  // console.log(
  //   visitListMonthlyDay12(),
  //   visitListMonthlyDay12,
  //   monthlyDay12,
  //   moment(monthlyDay12).format('dddd'),
  //   'visitListMonthlyDay12',
  // )

  //#endregion
  //#region thirteenth day of the month
//   const dateMonthly_14 = moment(monthlyDay2)
//     .add(13, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay14 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(7, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay14 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay14)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay14)
    }
  })
  function visitListMonthlyDay14() {
    return [...visitMonthlyDay14]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region fourteenth day of the month
//   const dateMonthly_15 = moment(monthlyDay2)
//     .add(14, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay15 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(8, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay15 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay15)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay15)
    }
  })
  function visitListMonthlyDay15() {
    return [...visitMonthlyDay14]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region fifteenth day of the month
//   const dateMonthly_16 = moment(monthlyDay2)
//     .add(15, 'days')
//     .format('YYYY-MM-DD')
  console.log(startOfTheMonthDayNumber)
  const monthlyDay16 =
  startOfTheMonthDayNumber === 0
  ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
  : startOfTheMonthDayNumber === 1
  ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
  : startOfTheMonthDayNumber === 2
  ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
  : startOfTheMonthDayNumber === 3
  ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
  : startOfTheMonthDayNumber === 4
  ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
  : startOfTheMonthDayNumber === 5
  ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
  : startOfTheMonthDayNumber === 6
  ? moment(startOfTheMonth).add(9, 'days').format('YYYY-MM-DD')
  : ''
  const visitMonthlyDay16 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay16)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay16)
    }
  })
  function visitListMonthlyDay16() {
    return [...visitMonthlyDay16]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
    }
    // console.log(visitMonthlyDay16)
    // console.log(monthlyDay16)
  //#endregion
  //#region sixteenth day of the month
//   const dateMonthly_17 = moment(monthlyDay2)
//     .add(16, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay17 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(10, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay17 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay17)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay17)
    }
  }
 
    )

    
    
  function visitListMonthlyDay17() {
    return [...visitMonthlyDay17]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
    }
    
    console.log(visitMonthlyDay17)
    console.log(monthlyDay17)

    // console.log(visits)
 
  //#endregion
  //#region seventeenth day of the month
  const dateMonthly_18 = moment(monthlyDay2)
    .add(17, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay18 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(11, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay18 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay18)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay18)
    }
  })
  function visitListMonthlyDay18() {
    return [...visitMonthlyDay18]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //#endregion
  //#region eighteenth day of the month
  const dateMonthly_19 = moment(monthlyDay2)
    .add(18, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay19 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(12, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay19 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay19)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay19)
    }
  })
  function visitListMonthlyDay19() {
    return [...visitMonthlyDay19]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //#endregion
  //#region nineteenth day of the month
  const dateMonthly_20 = moment(monthlyDay2)
    .add(19, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay20 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(13, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay20 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay20)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay20)
    }
  })
  function visitListMonthlyDay20() {
    return [...visitMonthlyDay20]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //#endregion
  //#region twentieth day of the month
  const dateMonthly_21 = moment(monthlyDay2)
    .add(20, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay21 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(14, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay21 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay21)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay21)
    }
  })
  function visitListMonthlyDay21() {
    return [...visitMonthlyDay21]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //#endregion
  //#region twenty-first day of the month
  const dateMonthly_22 = moment(monthlyDay2)
    .add(21, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay22 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(15, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay22 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay22)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay22)
    }
  })
  function visitListMonthlyDay22() {
    return [...visitMonthlyDay22]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //#endregion
  //#region twenty-second day of the month
//   const dateMonthly_23 = moment(monthlyDay2)
//     .add(22, 'days')
//     .format('YYYY-MM-DD')
  const monthlyDay23 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(16, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay23 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay23)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay23)
    }
  })
  function visitListMonthlyDay23() {
    return [...visitMonthlyDay23]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
// console.log('monthlyDay23 = ', monthlyDay23)
  //#endregion
  //#region twenty-third day of the month
  const dateMonthly_24 = moment(monthlyDay2)
    .add(23, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay24 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(17, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay24 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay24)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay24)
    }
  })
  function visitListMonthlyDay24() {
    return [...visitMonthlyDay24]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  //#endregion
  //#region twenty-fourth day of the month
  const dateMonthly_25 = moment(monthlyDay2)
    .add(24, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay25 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(18, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay25 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay25)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay25)
    }
  })
  function visitListMonthlyDay25() {
    return [...visitMonthlyDay25]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region twenty-fifth day of the month
  const dateMonthly_26 = moment(monthlyDay2)
    .add(25, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay26 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(19, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay26 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay26)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay26)
    }
  })
  function visitListMonthlyDay26() {
    return [...visitMonthlyDay26]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region twenty-sixth day of the month
  const dateMonthly_27 = moment(monthlyDay2)
    .add(26, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay27 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(20, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay27 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay27)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay27)
    }
  })
  function visitListMonthlyDay27() {
    return [...visitMonthlyDay27]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region twenty-seventh day of the month
  const dateMonthly_28 = moment(monthlyDay2)
    .add(27, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay28 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(21, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay28 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay28)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay28)
    }
  })
  function visitListMonthlyDay28() {
    return [...visitMonthlyDay28]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region twenty-eighth day of the month
  const dateMonthly_29 = moment(monthlyDay2)
    .add(28, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay29 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(22, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay29 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay29)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay29)
    }
  })
  function visitListMonthlyDay29() {
    return [...visitMonthlyDay29]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
  //#region twenty-ninth day of the month
  const dateMonthly_30 = moment(monthlyDay2)
    .add(29, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay30 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(23, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay30 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay30)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay30)
    }
  })
  function visitListMonthlyDay30() {
    return [...visitMonthlyDay30]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  //   visitListMonthlyDay30(),
  //   visitListMonthlyDay30,
  //   monthlyDay30,
  //   moment(monthlyDay30).format('dddd'),
  //   'visitListMonthlyDay30',
  // )
  //#endregion
  //#region thirtieth day of the month
  const dateMonthly_31 = moment(monthlyDay2)
    .add(30, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay31 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(24, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay31 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay31)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay31)
    }
  })
  function visitListMonthlyDay31() {
    return [...visitMonthlyDay31]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  //   visitListMonthlyDay31(),
  //   visitListMonthlyDay31,
  //   monthlyDay31,
  //   moment(monthlyDay31).format('dddd'),
  //   'visitListMonthlyDay31',
  // )
  //#endregion
  //#region thirty-first day of the month
  const dateMonthly_32 = moment(monthlyDay2)
    .add(31, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay32 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD') >
        daysOfTheMonth
        ? ''
        : moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(25, 'days').format('YYYY-MM-DD')
      : ''
  // console.log(moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD'), startOfTheMonth, daysOfTheMonth )
  const visitMonthlyDay32 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay32)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay32)
    }
  })
  function visitListMonthlyDay32() {
    return [...visitMonthlyDay32]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //   console.log(
  //     // visitListMonthlyDay32(),
  //     // visitListMonthlyDay32,
  //     monthlyDay32,
  //     moment(monthlyDay32).format('dddd'),
  //     // 'visitListMonthlyDay32',
  //   )
  //#endregion
  //#region thirty-second day of the month
  const dateMonthly_33 = moment(monthlyDay2)
    .add(32, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay33 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(26, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay33 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay33)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay33)
    }
  })
  function visitListMonthlyDay33() {
    return [...visitMonthlyDay33]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  //   visitListMonthlyDay33(),
  //   visitListMonthlyDay33,
  //   monthlyDay33,
  //   moment(monthlyDay33).format('dddd'),
  //   'visitListMonthlyDay33',
  // )
  //#endregion
  //#region thirty-third day of the month
  const dateMonthly_34 = moment(monthlyDay2)
    .add(33, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay34 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(33, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(27, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay34 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay34)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay34)
    }
  })
  function visitListMonthlyDay34() {
    return [...visitMonthlyDay34]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //   console.log(
  // visitListMonthlyDay34(),
  // visitMonthlyDay34[0].visitDate,
  // monthlyDay34,
  // moment(monthlyDay34).format('dddd'),
  // 'visitListMonthlyDay34'
  //   )
  //#endregion
  //#region thirty-fourth day of the month
  const dateMonthly_35 = moment(monthlyDay2)
    .add(34, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay35 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(34, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(33, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(28, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay35 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay35)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay35)
    }
  })
  function visitListMonthlyDay35() {
    return [...visitMonthlyDay35]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  // visitListMonthlyDay35(),
  // visitMonthlyDay35[0].visitDate,
  // monthlyDay35,
  // moment(monthlyDay35).format('dddd'),
  // 'visitListMonthlyDay35'
  // )

  //#endregion
  //#region thirty-fifth day of the month
  const dateMonthly_36 = moment(monthlyDay2)
    .add(35, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay36 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(35, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(34, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(33, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(29, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay36 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay36)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay36)
    }
  })
  function visitListMonthlyDay36() {
    return [...visitMonthlyDay36]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  // visitListMonthlyDay36(),
  // visitMonthlyDay36[0].visitDate,
  // monthlyDay36,
  // moment(monthlyDay36).format('dddd'),
  // 'visitListMonthlyDay36'
  // )

  //#endregion
  //#region thirty-sixth day of the month
  const dateMonthly_37 = moment(monthlyDay2)
    .add(36, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay37 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(36, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(35, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(34, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(33, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(30, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay37 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay37)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay37)
    }
  })
  //   console.log(visitMonthlyDay37)
  function visitListMonthlyDay37() {
    return [...visitMonthlyDay37]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  // visitListMonthlyDay37(),
  // visitMonthlyDay37[0].visitDate,
  // monthlyDay37,
  // moment(monthlyDay37).format('dddd'),
  // 'visitListMonthlyDay37'
  // )

  //#endregion
  //#region thirty-seventh day of the month
  const dateMonthly_38 = moment(monthlyDay2)
    .add(37, 'days')
    .format('YYYY-MM-DD')
  const monthlyDay38 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(37, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(36, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(35, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(34, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(33, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(31, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay38 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay38)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay38)
    }
  })
  function visitListMonthlyDay38() {
    return [...visitMonthlyDay38]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  // visitListMonthlyDay38(),
  // visitMonthlyDay38[0].visitDate,
  // monthlyDay38,
  // moment(monthlyDay38).format('dddd'),
  // 'visitListMonthlyDay38'
  // )

  //#endregion
  //#region thirty-eighth day of the month
  const monthlyDay39 =
    startOfTheMonthDayNumber === 0
      ? moment(startOfTheMonth).add(38, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 1
      ? moment(startOfTheMonth).add(37, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 2
      ? moment(startOfTheMonth).add(36, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 3
      ? moment(startOfTheMonth).add(35, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 4
      ? moment(startOfTheMonth).add(34, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 5
      ? moment(startOfTheMonth).add(33, 'days').format('YYYY-MM-DD')
      : startOfTheMonthDayNumber === 6
      ? moment(startOfTheMonth).add(32, 'days').format('YYYY-MM-DD')
      : ''
  const visitMonthlyDay39 = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase().includes(monthlyDay39)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase().includes(monthlyDay39)
    }
  })
  function visitListMonthlyDay39() {
    return [...visitMonthlyDay39]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  // console.log(
  // visitListMonthlyDay39(),
  // visitMonthlyDay39[0].visitDate,
  // monthlyDay39,
  // moment(monthlyDay39).format('dddd'),
  // 'visitListMonthlyDay39'
  // )

  //#endregion
  //end of code for each monthly visit dates
  //#region code for each weekly daily visit dates
  const dateSelectedMonday = moment(showDateValue)
    .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 1), 'days')
    .format('YYYY-MM-DD')
  const dateSelectedTuesday = moment(showDateValue)
    .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 2), 'days')
    .format('YYYY-MM-DD')
  const dateSelectedWednesday = moment(showDateValue)
    .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 3), 'days')
    .format('YYYY-MM-DD')
  const dateSelectedThursday = moment(showDateValue)
    .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 4), 'days')
    .format('YYYY-MM-DD')
  const dateSelectedFriday = moment(showDateValue)
    .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 5), 'days')
    .format('YYYY-MM-DD')
  //#endregion
  //#region code for filtering visits with dates / this method will filter the table weekly
  const filteredDataWeeklyMonday = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedMonday)
    }
    //return the item which contains the user input
    else {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedMonday)
    }
  })
  const filteredDataWeeklyTuesday = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedTuesday)
    }
    //return the item which contains the user input
    else {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedTuesday)
    }
  })
  const filteredDataWeeklyWed = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedWednesday)
    }
    //return the item which contains the user input
    else {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedWednesday)
    }
  })

  const filteredDataWeeklyThursday = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedThursday)
    }
    //return the item which contains the user input
    else {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedThursday)
    }
  })
  const filteredDataWeeklyFri = visits.filter((el) => {
    //if no input the return the with the original default date
    if (searchInput === '') {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedFriday)
    }
    //return the item which contains the user input
    else {
      return Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedFriday)
    }
  })

  const filteredDataMonthly = visits.filter((el) => {
    // const date = '2022-11-10'
    //if no input the return the with the original default date
    if (searchInput === '') {
      // return el
      return Object.values(el).toString().toLowerCase()
      // .filter((el) => el.visitDate === date)
    }
    //return the item which contains the user input
    else {
      return Object.values(el).toString().toLowerCase()
      // .filter((el) => el.visitDate === date)
    }
  })
  //#endregion
  //#region code for each weekly visit dates
  function visitListWeeklyMonday() {
    return [...filteredDataWeeklyMonday]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  function visitListWeeklyTuesday() {
    return [...filteredDataWeeklyTuesday]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        // console.log(moment(visit.visitDate + ', ' + visit.hourOfVisit))
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  function visitListWeeklyWednesday() {
    return [...filteredDataWeeklyWed]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  function visitListWeeklyThursday() {
    return [...filteredDataWeeklyThursday]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )
      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }

  function visitListWeeklyFriday() {
    return [...filteredDataWeeklyFri]
      .sort((a, b) =>
        moment(a.visitDate + ', ' + a.hourOfVisit) >
        moment(b.visitDate + ', ' + b.hourOfVisit)
          ? 1
          : -1,
      )

      .map((visit) => {
        return (
          <VisitWeekly
            visit={visit}
            deleteRecord={() => deleteRecord(visit._id)}
            key={visit._id}
          />
        )
      })
  }
  //#endregion
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
              
              <i className="fa fa-search" aria-hidden="true"></i>
            </a>
          </div>
          <div className="div-items" style={{ float: 'right' }}>
            <label
              htmlFor="search"
              // style={{ display: selectViewValue === 'Daily' ? '' : 'none' }}
              style={{ display: 'none' }}
            >
              Search :
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
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        
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
                    {/* <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListMonthlyDay1()}
                      </tbody>
                    </table> */}
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
                        {visitListMonthlyDay4()}
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
                        
                        {/* {startOfTheWeek + 24 > daysOfPreviousMonth
                          ? startOfTheWeek + 24 - daysOfPreviousMonth
                          : startOfTheWeek + 24} */}
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
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        
                        {moment(monthlyDay32).format('D')}
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
                      THU
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
          {/* weekly calendar */}
          <ul
            className="calendar01"
            id="calendarWeekly"
            style={{
              display: selectViewValue === 'Weekly' ? '' : 'none',
              paddingLeft: '0px',
              marginBottom: '0px',
            }}
          >
            <div style={{ display: 'block' }}>
              <div className="grid-weeklycalcontainer">
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      SUN
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        
                        {startOfTheWeek}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridWeeklyStartSun}
                  ></li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      MON
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheWeek + 1 > daysOfPreviousMonth
                          ? startOfTheWeek + 1 - daysOfPreviousMonth
                          : startOfTheWeek + 1}
                      </span>
                    </div>
                  </li>
                  <li className="calendar-item calendar-day" style={gridWeekly}>
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListWeeklyMonday()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      TUE
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheWeek + 2 > daysOfPreviousMonth
                          ? startOfTheWeek + 2 - daysOfPreviousMonth
                          : startOfTheWeek + 2}
                      </span>
                    </div>
                  </li>
                  <li className="calendar-item calendar-day" style={gridWeekly}>
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListWeeklyTuesday()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      WED
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        
                        {startOfTheWeek + 3 > daysOfPreviousMonth
                          ? startOfTheWeek + 3 - daysOfPreviousMonth
                          : startOfTheWeek + 3}
                      </span>
                    </div>
                  </li>
                  <li className="calendar-item calendar-day" style={gridWeekly}>
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListWeeklyWednesday()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      THU
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheWeek + 4 > daysOfPreviousMonth
                          ? startOfTheWeek + 4 - daysOfPreviousMonth
                          : startOfTheWeek + 4}
                      </span>
                    </div>
                  </li>
                  <li className="calendar-item calendar-day" style={gridWeekly}>
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">
                        {visitListWeeklyThursday()}
                      </tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      FRI
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheWeek + 5 > daysOfPreviousMonth
                          ? startOfTheWeek + 5 - daysOfPreviousMonth
                          : startOfTheWeek + 5}
                      </span>
                    </div>
                  </li>

                  <li className="calendar-item calendar-day" style={gridWeekly}>
                    <table className="table table-striped">
                      <thead>
                        <tr className="trStyles"></tr>
                      </thead>
                      <tbody className="trStyles">{visitListWeeklyFriday()}</tbody>
                    </table>
                  </li>
                </div>
                <div>
                  <li className="calendar-item weekday">
                    <div>
                      SAT
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {startOfTheWeek + 6 > daysOfPreviousMonth
                          ? startOfTheWeek + 6 - daysOfPreviousMonth
                          : startOfTheWeek + 6}
                      </span>
                    </div>
                  </li>
                  <li
                    className="calendar-item calendar-day"
                    style={gridWeekly}
                  ></li>
                </div>
              </div>
            </div>
          </ul>
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
            <li className="weekday" id="calendarDaily"></li>
            {/* calendar item */}
            <li
              className="calendar-item calendar-day"
              id="calendarDaily"
              style={gridWeeklyStart}
            >
              <div id="calendarDailyDate">
                <h5 style={{ marginBottom: '0px' }}>
                  {format(new Date(showDateValue.toLocaleString()), 'PPP')}
                </h5>
              </div>

              <div>
                <table className="table table-striped">
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
                  {/* <tbody className="trStyles">{patientListDaily()}</tbody> */}
                  <tbody className="trStyles">{patientListDaily()}</tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
