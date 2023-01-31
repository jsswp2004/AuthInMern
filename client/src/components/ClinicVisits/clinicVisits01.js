//#region Imports
import React, { useEffect, useState, useRef } from 'react'
// import { createRoot } from "react-dom";
import { Modal, Button } from 'react-bootstrap'
import backward from '../shared/images/backward.jpg'
import forward from '../shared/images/forward.jpg'
import {
  format,
  getDate,
  startOfMonth,
  getDay,
  subMonths,
  endOfMonth,
  addDays,
  subDays,
  startOfWeek,
  parseISO,
  set,
} from 'date-fns'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import VisitWeekly from '../Scheduling/visitWeekly'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import {
  View,
  monthNames,
} from '../listDictionaries/listData/listDictionariesData'
import axios from 'axios'
import CreateVisitModal from '../Scheduling/createvisitmodal'
import VisitMonthlyModal from '../Scheduling/visitModal'
import VisitCard from '../Scheduling/VisitCard'
import { display } from '@mui/system'
//#endregion

export default function ClinicVisit() {
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
  //#region base date values for calendar
  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  const [showDateValue, setShowDateValue] = useState(new Date())
  const dateSelected = format(showDateValue, 'yyyy-MM-dd')
  let newdate = new Date(showDateValue)
  let monthIndex = newdate.getMonth()
  let monthName = monthNames[monthIndex].value
  let startOfTheMonth = startOfMonth(new Date(showDateValue))
  //   console.log(format(startOfTheMonth, 'yyyy-MM-dd'))
  const currentYear = newdate.getFullYear()
  const currentMonth = newdate.getMonth() + 1 // 👈️ months are 0-based
  let startOfTheMonthDate = getDate(startOfTheMonth) //parseInt(moment(startOfTheMonth).format('D')) //
  let daysOfTheMonth = getDaysInMonth(currentMonth, currentYear)

  // let startOfTheMonthDayNumber = getDay(new Date(startOfTheMonth)) // moment(startOfTheMonth).day()
  let startOfTheMonthDayNumber = getDay(startOfMonth(showDateValue)) // moment(startOfTheMonth).day()
  let endOfTheMonthDayNumber = getDay(endOfMonth(showDateValue)) // moment(startOfTheMonth).day()
  //   console.log(endOfTheMonthDayNumber)
  let startOfTheMonthDay = getDate(startOfMonth(showDateValue)) // moment(startOfTheMonth).day()
  //   console.log(startOfTheMonthDay)
  let endOfTheMonthDay = getDate(endOfMonth(showDateValue)) // moment(startOfTheMonth).day()
  //   console.log(endOfTheMonthDay)
  const endOfThePreviousMonth = parseInt(
    // moment(dateSelected).subtract(1, 'months').endOf('month').format('DD'),
    getDate(endOfMonth(subMonths(newdate, 1))),
  )

  const gridMonthlyColumnStart = {
    gridColumnStart: startOfTheMonthDayNumber + 1, // this is not 0 based
    // backgroundColor: ' #eeee',
    // height: '100px',
  }

  const gridWeekly = {
    backgroundColor: 'white',
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
  //#region code for Modal methods for creating visit
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [showMonthly, setShowMonthly] = useState(false)
  const handleMonthlyClose = () => setShowMonthly(false)
  const handleMonthlyShow = () => {
    setShowMonthly(true)
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
  // function getTotal() {
  //   const xx = document.getElementById('subtotal').innerHTML
  //     return alert(addDays(startOfTheMonth, xx - 1))
  //   }
  //#region for Modal from monthly days

  //   const selectedDateNumber = document.getElementById('subtotal').innerHTML

  const VisitModalMonthly = (visit) => (
    <Modal show={showMonthly} onHide={handleMonthlyClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a Visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VisitMonthlyModal visitDate={selectedDate} />
        {/*  */}
      </Modal.Body>
      <Modal.Footer>
        <span style={{ textAlign: 'center' }}>
          Please make sure all information is current and accurate.
        </span>
      </Modal.Footer>
    </Modal>
  )
  // This method will map out the visits on the table
  function displayVisitMonthlyModal() {
    return <VisitModalMonthly />
  }
  //#endregion
  //#region months dropdown code
  const viewValues = View
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
  //#region for formatting date function
  const formatDay = (el) => {
    return format(el, 'yyyy-MM-dd')
  }
  //#endregion
  //#region for filtering data with selected date
  const filterDataWithDate = visits.filter((visit) => {
    return visit.visitDate.toString().toLowerCase().includes(dateSelected)
  })
  //#endregion
  //#region for mapping and sorting data by date
  function patientListDaily() {
    return [...filterDataWithDate]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))

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
  // console.log(filterDataWithDate)
  //#endregion
  //#region for first day of the month
  const monthlyDay = formatDay(startOfTheMonth) //format(startOfTheMonth, 'yyyy-MM-dd')
  const visitMonthlyDay1 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay)
  })
  //   console.log(format(startOfTheMonth, 'yyyy-MM-dd'))
  function visitListMonthlyDay1() {
    return [...visitMonthlyDay1]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for second day of the month
  const monthlyDay2 = formatDay(addDays(startOfTheMonth, 1)) //format(addDays(startOfTheMonth, 1), 'yyyy-MM-dd')

  const visitMonthlyDay2 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay2)
  })
  //   console.log(visitMonthlyDay2)
  function visitListMonthlyDay2() {
    return [...visitMonthlyDay2]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for third day of the month
  const monthlyDay3 = formatDay(addDays(startOfTheMonth, 2))
  const visitMonthlyDay3 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay3)
  })

  function visitListMonthlyDay3() {
    return [...visitMonthlyDay3]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for fourth day of the month
  const monthlyDay4 = formatDay(addDays(startOfTheMonth, 3))
  const visitMonthlyDay4 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay4)
  })

  function visitListMonthlyDay4() {
    return [...visitMonthlyDay4]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for fifth day of the month
  const monthlyDay5 = formatDay(addDays(startOfTheMonth, 4))
  const visitMonthlyDay5 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay5)
  })

  function visitListMonthlyDay5() {
    return [...visitMonthlyDay5]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for sixth day of the month
  const monthlyDay6 = formatDay(addDays(startOfTheMonth, 5))
  const visitMonthlyDay6 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay6)
  })

  function visitListMonthlyDay6() {
    return [...visitMonthlyDay6]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for seventh day of the month
  const monthlyDay7 = formatDay(addDays(startOfTheMonth, 6))
  const visitMonthlyDay7 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay7)
  })

  function visitListMonthlyDay7() {
    return [...visitMonthlyDay7]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for eighth day of the month
  const monthlyDay8 = formatDay(addDays(startOfTheMonth, 7))
  const visitMonthlyDay8 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay8)
  })

  function visitListMonthlyDay8() {
    return [...visitMonthlyDay8]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for ninth day of the month
  const monthlyDay9 = formatDay(addDays(startOfTheMonth, 8))
  const visitMonthlyDay9 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay9)
  })

  function visitListMonthlyDay9() {
    return [...visitMonthlyDay9]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for tenth day of the month
  const monthlyDay10 = formatDay(addDays(startOfTheMonth, 9))
  const visitMonthlyDay10 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay10)
  })

  function visitListMonthlyDay10() {
    return [...visitMonthlyDay10]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for eleventh day of the month
  const monthlyDay11 = formatDay(addDays(startOfTheMonth, 10))
  const visitMonthlyDay11 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay11)
  })

  function visitListMonthlyDay11() {
    return [...visitMonthlyDay11]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twelfth day of the month
  const monthlyDay12 = formatDay(addDays(startOfTheMonth, 11))
  const visitMonthlyDay12 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay12)
  })

  function visitListMonthlyDay12() {
    return [...visitMonthlyDay12]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for thirteenth day of the month
  const monthlyDay13 = formatDay(addDays(startOfTheMonth, 12))
  const visitMonthlyDay13 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay13)
  })

  function visitListMonthlyDay13() {
    return [...visitMonthlyDay13]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for fourteenth day of the month
  const monthlyDay14 = formatDay(addDays(startOfTheMonth, 13))
  const visitMonthlyDay14 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay14)
  })

  function visitListMonthlyDay14() {
    return [...visitMonthlyDay14]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for fifteenth day of the month
  const monthlyDay15 = formatDay(addDays(startOfTheMonth, 14))
  const visitMonthlyDay15 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay15)
  })

  function visitListMonthlyDay15() {
    return [...visitMonthlyDay15]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for sixteenth day of the month
  const monthlyDay16 = formatDay(addDays(startOfTheMonth, 15))
  const visitMonthlyDay16 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay16)
  })

  function visitListMonthlyDay16() {
    return [...visitMonthlyDay16]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for seventeenth day of the month
  const monthlyDay17 = formatDay(addDays(startOfTheMonth, 16))
  const visitMonthlyDay17 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay17)
  })

  function visitListMonthlyDay17() {
    return [...visitMonthlyDay17]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for eighteenth day of the month
  const monthlyDay18 = formatDay(addDays(startOfTheMonth, 17))
  const visitMonthlyDay18 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay18)
  })

  function visitListMonthlyDay18() {
    return [...visitMonthlyDay18]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for nineteenth day of the month
  const monthlyDay19 = formatDay(addDays(startOfTheMonth, 18))
  const visitMonthlyDay19 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay19)
  })

  function visitListMonthlyDay19() {
    return [...visitMonthlyDay19]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twentieth day of the month
  const monthlyDay20 = formatDay(addDays(startOfTheMonth, 19))
  const visitMonthlyDay20 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay20)
  })

  function visitListMonthlyDay20() {
    return [...visitMonthlyDay20]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-first day of the month
  const monthlyDay21 = formatDay(addDays(startOfTheMonth, 20))
  const visitMonthlyDay21 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay21)
  })

  function visitListMonthlyDay21() {
    return [...visitMonthlyDay21]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-second day of the month
  const monthlyDay22 = formatDay(addDays(startOfTheMonth, 21))
  const visitMonthlyDay22 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay22)
  })

  function visitListMonthlyDay22() {
    return [...visitMonthlyDay22]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-third day of the month
  const monthlyDay23 = formatDay(addDays(startOfTheMonth, 22))
  const visitMonthlyDay23 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay23)
  })

  function visitListMonthlyDay23() {
    return [...visitMonthlyDay23]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-fourth day of the month
  const monthlyDay24 = formatDay(addDays(startOfTheMonth, 23))
  const visitMonthlyDay24 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay24)
  })

  function visitListMonthlyDay24() {
    return [...visitMonthlyDay24]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-fifth day of the month
  const monthlyDay25 = formatDay(addDays(startOfTheMonth, 24))
  const visitMonthlyDay25 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay25)
  })

  function visitListMonthlyDay25() {
    return [...visitMonthlyDay25]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-sixth day of the month
  const monthlyDay26 = formatDay(addDays(startOfTheMonth, 25))
  const visitMonthlyDay26 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay26)
  })

  function visitListMonthlyDay26() {
    return [...visitMonthlyDay26]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-seventh day of the month
  const monthlyDay27 = formatDay(addDays(startOfTheMonth, 26))
  const visitMonthlyDay27 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay27)
  })

  function visitListMonthlyDay27() {
    return [...visitMonthlyDay27]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-eighth day of the month
  const monthlyDay28 = formatDay(addDays(startOfTheMonth, 27))
  const visitMonthlyDay28 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay28)
  })

  function visitListMonthlyDay28() {
    return [...visitMonthlyDay28]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for twenty-ninth day of the month
  const monthlyDay29 = formatDay(addDays(startOfTheMonth, 28))
  const visitMonthlyDay29 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay29)
  })

  function visitListMonthlyDay29() {
    return [...visitMonthlyDay29]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for thirtieth day of the month
  const monthlyDay30 = formatDay(addDays(startOfTheMonth, 29))
  const visitMonthlyDay30 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay30)
  })

  function visitListMonthlyDay30() {
    return [...visitMonthlyDay30]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region for thirty-first day of the month
  const monthlyDay31 = formatDay(addDays(startOfTheMonth, 30))
  const visitMonthlyDay31 = visits.filter((el) => {
    return el.visitDate.toString().toLowerCase().includes(monthlyDay31)
  })

  function visitListMonthlyDay31() {
    return [...visitMonthlyDay31]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
  //#region code for each weekly daily visit dates

  // const dateSelectedMonday = moment(showDateValue)
  //   .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 1), 'days')
  //   .format('YYYY-MM-DD')
  const dateSelectedMonday = format(
    addDays(startOfWeek(showDateValue), 1),
    'yyyy-MM-dd',
  )
  // console.log(dateSelectedMonday, 'dateSelectedMonday')
  // console.log(moment(showDateValue).date(), 'moment(showDateValue).date()')
  // console.log(startDayOfTheWeek + 1, 'startDayOfTheWeek + 1')
  // const dateSelectedMonday = format(showDateValue, 'MM-dd-yyyy')
  //const dateSelectedMonday4 = addDays(showDateValue, (startDayOfTheWeek + 1))
  // const dateSelectedMonday3 = format(addDays(startOfWeek(showDateValue),1),'yyyy-MM-dd')
  // console.log(dateSelectedMonday3, 'dateSelectedMonday3')
  // const s = getDate(showDateValue)
  // const t = (startDayOfTheWeek + 1)
  // const u = getDate(showDateValue) - (startDayOfTheWeek + 1)
  // console.log(s, t ,u)
  // console.log(u, 'getDate(showDateValue) - (startDayOfTheWeek + 1)')
  // console.log(getDate(showDateValue), 'getDate()')

  // console.log(dateSelectedMonday3)
  // console.log(getDate(dateSelectedMonday2), 'getDate()')

  // const dateSelectedTuesday = moment(showDateValue)
  //   .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 2), 'days')
  //   .format('YYYY-MM-DD')
  const dateSelectedTuesday = format(
    addDays(startOfWeek(showDateValue), 2),
    'yyyy-MM-dd',
  )
  //   console.log(dateSelectedTuesday, 'dateSelectedTuesday')
  // const dateSelectedWednesday = moment(showDateValue)
  //   .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 3), 'days')
  //   .format('YYYY-MM-DD')
  const dateSelectedWednesday = format(
    addDays(startOfWeek(showDateValue), 3),
    'yyyy-MM-dd',
  )
  // const dateSelectedThursday = moment(showDateValue)
  //   .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 4), 'days')
  //   .format('YYYY-MM-DD')
  const dateSelectedThursday = format(
    addDays(startOfWeek(showDateValue), 4),
    'yyyy-MM-dd',
  )
  // const dateSelectedFriday = moment(showDateValue)
  //   .subtract(moment(showDateValue).date() - (startDayOfTheWeek + 5), 'days')
  //   .format('YYYY-MM-DD')
  const dateSelectedFriday = format(
    addDays(startOfWeek(showDateValue), 5),
    'yyyy-MM-dd',
  )
  //#endregion
  //#region code for filtering visits with dates / this method will filter the table weekly
  const filteredDataWeeklyMonday = visits.filter((el) => {
    return (
      el.visitDate
        // Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedMonday)
    )
  })
  const filteredDataWeeklyTuesday = visits.filter((el) => {
    //if no input the return the with the original default date
    // if (searchInput === '') {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedTuesday)
    // }
    // //return the item which contains the user input
    // else {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedTuesday)
    // }
    return (
      el.visitDate
        // Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedTuesday)
    )
  })

  // console.log(filteredDataWeeklyTuesday, 'filteredDataWeeklyTuesday')
  const filteredDataWeeklyWed = visits.filter((el) => {
    //if no input the return the with the original default date
    // if (searchInput === '') {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedWednesday)
    // }
    //return the item which contains the user input
    // else {
    return (
      el.visitDate
        // Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedWednesday)
    )
    // }
  })

  const filteredDataWeeklyThursday = visits.filter((el) => {
    //if no input the return the with the original default date
    // if (searchInput === '') {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedThursday)
    // }
    // //return the item which contains the user input
    // else {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedThursday)
    // }
    return (
      el.visitDate
        // Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedThursday)
    )
  })
  const filteredDataWeeklyFri = visits.filter((el) => {
    //if no input the return the with the original default date
    // if (searchInput === '') {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedFriday)
    // }
    // //return the item which contains the user input
    // else {
    //   return Object.values(el)
    //     .toString()
    //     .toLowerCase()
    //     .includes(dateSelectedFriday)
    // }
    return (
      el.visitDate
        // Object.values(el)
        .toString()
        .toLowerCase()
        .includes(dateSelectedFriday)
    )
  })

  // const filteredDataMonthly = visits.filter((el) => {
  //   // const date = '2022-11-10'
  //   //if no input the return the with the original default date
  //   if (searchInput === '') {
  //     // return el
  //     return el.visitDate
  //     .toString()
  //       .toLowerCase()
  //     // .filter((el) => el.visitDate === date)
  //   }
  //   //return the item which contains the user input
  //   else {
  //     return el.visitDate
  //     .toString()
  //       .toLowerCase()
  //     // .filter((el) => el.visitDate === date)
  //   }
  // })
  //#endregion
  //#region for weekly calendar base date values
  let dayOfSunday = 1
  const gridWeeklyStart = {
    gridColumnStart: dayOfSunday,
    backgroundColor: ' #eeee',
    height: 'calc(100vh - 110px)',
    width: '100%',
  }

  const gridWeeklyStartSun = {
    gridColumnStart: dayOfSunday,
    backgroundColor: 'white',
    height: 'calc(100vh - 132px)',
  }

  //#endregion

  //#region code for each weekly visit dates

  function visitListWeeklyMonday() {
    return [...filteredDataWeeklyMonday]
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))
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
      .sort((a, b) => (a.hourOfVisit > b.hourOfVisit ? 1 : -1))

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
  //   function getElement(e) {
  //       var element = e.target || e.srcElement
  //       const selectedDateNumber = document.getElementById('subtotal').innerHTML
  //     // alert(selectedDateNumber)
  //         const selectedDate = format(
  //     addDays(startOfTheMonth, selectedDateNumber - 1),
  //     'yyyy-MM-dd',
  //   )
  //   }
  //   let idClick = (event) => { // 'subtotal'
  //     var yy = event.target.id
  //     return yy
  //   }
  // console.log(idClick)
  //using useRef
  //   const ref = useRef(null)
  //   const idClick = () => {
  //     return ref.current.id
  //   }
  // const clickValue = document.querySelector("span").innerHTML
  // console.log(clickValue)
  const [selectedElement, setSelectedElement] = useState('')
  //   useEffect((e) => {
  //       const selectedElem =  e.currentTarget.className
  //       console.log(selectedElem)
  //       setSelectedElement(selectedElem)
  //     })

  //   document.getElementById('day1').onclick = iClick;
  //   document.getElementById('day2').onclick = iClick;
  //   document.getElementById('day3').onclick = iClick;
  const [selectedDate, setSelectedDate] = useState('')
  // function settingDate (e) {
  //     setSelectedDate(new Date(dateSelected).toISOString().slice(0, 10))
  //     return
  // }
  const buttonPressed = e => {
    console.log(e.target.id);  // Get ID of Clicked Element
  }
  useEffect(
    (e) => {
      let isSubscribed = true

      //let msg = handleClick()
      // ref.current.id)  const selectedDateNumber = new Date(dateSelected).toISOString().slice(0, 10)
      //   const classNamed = e.currentTarget.className
      const selectt = document.getElementById('day1').innerHTML
          const selectedDateNumber = document.getElementById('day2').innerHTML
          console.log(selectt, selectedDateNumber)
      //   const selectedDateNumber = new Date(showDateValue).toISOString().slice(0, 10)
      // ref.current.id
      const selectedDate = format(
        addDays(startOfTheMonth, selectedDateNumber - 1),
        'yyyy-MM-dd',
      )
      //setSelectedDate(new Date(addDays(startOfTheMonth,selectedDateNumber -1)).toISOString().slice(0, 10))
      //   console.log(classNamed )
      setSelectedDate(selectedDate)
      //   setSelectedElement(classNamed)
      return () => (isSubscribed = false)
    },
    [selectedElement, startOfTheMonth],
  )
  
  const handleClick = (event) => {
    // event.preventDefault()
    const selectt = ref.current.className
    console.log(selectt)
    const selectedDateNumber = document.getElementById(selectt).innerHTML
    const selectedDate = format(
      addDays(startOfTheMonth, selectedDateNumber - 1),
      'yyyy-MM-dd',
    )
    // console.log('className 👉️', event.currentTarget.className)
    // const classNamed = event.currentTarget.className
    // setSelectedElement(classNamed)
    setSelectedDate(selectedDate)
    // console.log(selectedElement)
    // return classNamed
    }
    console.log(selectedElement)

  let msg = {
    handleMonthlyShow,
    setSelectedDate,
    handleClick,
  }

  // console.log(new Date(dateSelected).toISOString().slice(0, 10))
  const ref = useRef(null)
  return (
    <div className="grid_container">
      <div className="item1">
        <Header></Header>
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <div className="grid_calendar">
          <div className="itemCalendar1">
            <div className="month-indicator item3C">
              <div className="month-name">
                <h3
                  style={{
                    float: 'left',
                    marginBottom: '0px',
                    verticalAlign: 'middle',
                  }}
                >
                  {monthName}
                </h3>
              </div>

              <div className="customDatePickerWidth">
                <DatePicker
                  selected={showDateValue}
                  className="form-control"
                  value={showDateValue}
                  onChange={(newValue) => {
                    setShowDateValue(newValue)
                  }}
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
                  <option key={viewval.value} value={viewval.value}>
                    {viewval.name}
                  </option>
                ))}
              </select>
              <div>
                <img
                  className="directionArrows"
                  src={backward}
                  alt="backward"
                  onClick={(newValue) =>
                    selectViewValue === 'Monthly'
                      ? setShowDateValue(addDays(showDateValue, -31))
                      : selectViewValue === 'Weekly'
                      ? setShowDateValue(addDays(showDateValue, -7))
                      : selectViewValue === 'Daily'
                      ? setShowDateValue(addDays(showDateValue, -1))
                      : setShowDateValue(showDateValue)
                  }
                ></img>
              </div>
              <div>
                <img
                  className="directionArrows"
                  src={forward}
                  alt="forward"
                  onClick={(newValue) =>
                    selectViewValue === 'Monthly'
                      ? setShowDateValue(addDays(showDateValue, 31))
                      : selectViewValue === 'Weekly'
                      ? setShowDateValue(addDays(showDateValue, 7))
                      : selectViewValue === 'Daily'
                      ? setShowDateValue(addDays(showDateValue, 1))
                      : setShowDateValue(showDateValue)
                  }
                ></img>
              </div>
              {/* <div><button onClick={getTotal}>total</button></div> */}
              {/* code for modal to add visit*/}
              <div
                style={{
                  marginLeft: 'auto',
                  height: '38px',
                  paddingRight: '5px',
                }}
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
          </div>
          <div>{displayVisitMonthlyModal()}</div>
          <div className="itemCalendar2">
            <div
              className="monthly"
              style={{
                display: selectViewValue === 'Monthly' ? '' : 'none',
                paddingLeft: '0px',
                marginBottom: '0px',
              }}
            >
              <div className="weekDayTitleParent">
                <div className="weekDayTitleChild">Su</div>
                <div className="weekDayTitleChild">Mo</div>
                <div className="weekDayTitleChild">Tu</div>
                <div className="weekDayTitleChild">We</div>
                <div className="weekDayTitleChild">Th</div>
                <div className="weekDayTitleChild">Fr</div>
                <div className="weekDayTitleChild">Sa</div>
              </div>
              <div className="monthDayTitleParent">
                <div
                  className="monthDayTitleChild"
                  style={gridMonthlyColumnStart}
                >
                  <span id="day1">{startOfTheMonthDay}</span>
                  {/* <button className="day1" onClick={handleClick}>
                    {startOfTheMonthDay}
                  </button> */}
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay1()}</tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  onClick={() => {
                    // handleClick()
                    handleMonthlyShow()
                    setSelectedDate()
                    // setSelectedElement()
                    // idClick()
                  }}
                >
                  <span id="day2" className="day2" ref={ref}>
                    {/* ref={ref} onClick={idClick()} */}
                    {startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 2}
                  </span>
                  <button
                    className="day2"
                    onClick={buttonPressed}
                  >
                    {/* onClick={handleClick} */}
                    {startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 2}
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay2()}</tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  // onClick={() => {
                  //   // handleClick()
                  //   handleMonthlyShow()
                  //   setSelectedDate()

                  //   // idClick()
                  // }}
                >
                  <span className="day3" id="day3" ref={ref}>
                    {/* onClick={idClick()} ref={ref} */}
                    {startOfTheMonthDay + 2 > endOfTheMonthDay ? 1 : 3}
                  </span>
                  <button
                    className="day3"  onClick={buttonPressed}
                    //   onClick={msg}
                  >
                    {/* onClick={handleClick} */}
                    {startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 3}
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay3()}</tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  onClick={() => {
                    // handleClick()
                    handleMonthlyShow()
                    setSelectedDate()
                    // setSelectedElement()
                  }}
                >
                  <span className="day4" id="day4" ref={ref}>
                    {startOfTheMonthDay + 3 > endOfTheMonthDay ? 1 : 4}
                  </span>
                  <button
                    className="day4"
                    //   onClick={handleClick}
                  >
                    {/* onClick={handleClick} */}
                    {startOfTheMonthDay + 1 > endOfTheMonthDay ? 1 : 4}
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay4()}</tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  onClick={() => {
                    handleMonthlyShow()
                    setSelectedDate()
                    // setSelectedElement()
                  }}
                >
                  <span className="day5" id="day5" ref={ref}>
                    {startOfTheMonthDay + 4 > endOfTheMonthDay ? 1 : 5}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay5()}</tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  onClick={() => {
                    handleMonthlyShow()
                    setSelectedDate()
                    // setSelectedElement()
                  }}
                >
                  <span className="day6" id="day6" ref={ref}>
                    {startOfTheMonthDay + 5 > endOfTheMonthDay ? 1 : 6}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay6()}</tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 6 > endOfTheMonthDay ? 1 : 7}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay7()}</tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 7 > endOfTheMonthDay ? 1 : 8}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay8()}</tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 8 > endOfTheMonthDay ? 1 : 9}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">{visitListMonthlyDay9()}</tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 9 > endOfTheMonthDay ? 1 : 10}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay10()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 10 > endOfTheMonthDay ? 1 : 11}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay11()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 11 > endOfTheMonthDay ? 1 : 12}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay12()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 12 > endOfTheMonthDay ? 1 : 13}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay13()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 13 > endOfTheMonthDay ? 1 : 14}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay14()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 14 > endOfTheMonthDay ? 1 : 15}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay15()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 15 > endOfTheMonthDay ? 1 : 16}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay16()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 16 > endOfTheMonthDay ? 1 : 17}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay17()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 17 > endOfTheMonthDay ? 1 : 18}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay18()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 18 > endOfTheMonthDay ? 1 : 19}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay19()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 19 > endOfTheMonthDay ? 1 : 20}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay20()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 20 > endOfTheMonthDay ? 1 : 21}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay21()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 21 > endOfTheMonthDay ? 1 : 22}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay22()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 22 > endOfTheMonthDay ? 1 : 23}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay23()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 23 > endOfTheMonthDay ? 1 : 24}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay24()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 24 > endOfTheMonthDay ? 1 : 25}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay25()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 25 > endOfTheMonthDay ? 1 : 26}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay26()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 26 > endOfTheMonthDay ? 1 : 27}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay27()}
                    </tbody>
                  </table>
                </div>
                <div className="monthDayTitleChild">
                  <span>
                    {startOfTheMonthDay + 27 > endOfTheMonthDay ? 1 : 28}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay28()}
                    </tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  style={{
                    display:
                      startOfTheMonthDay + 28 > endOfTheMonthDay
                        ? 'none'
                        : 'inline',
                  }}
                >
                  <span>
                    {startOfTheMonthDay + 28 > endOfTheMonthDay ? 1 : 29}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay29()}
                    </tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  style={{
                    display:
                      startOfTheMonthDay + 29 > endOfTheMonthDay
                        ? 'none'
                        : 'inline',
                  }}
                >
                  <span>
                    {startOfTheMonthDay + 29 > endOfTheMonthDay ? 1 : 30}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay30()}
                    </tbody>
                  </table>
                </div>
                <div
                  className="monthDayTitleChild"
                  style={{
                    display:
                      startOfTheMonthDay + 30 > endOfTheMonthDay
                        ? 'none'
                        : 'inline',
                  }}
                >
                  <span>
                    {startOfTheMonthDay + 30 > endOfTheMonthDay ? 1 : 31}
                  </span>
                  <table className="table table-striped">
                    <thead>
                      <tr className="trStyles"></tr>
                    </thead>
                    <tbody className="trStyles">
                      {visitListMonthlyDay31()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="weekly"
              style={{
                display: selectViewValue === 'Weekly' ? 'inline' : 'none',
                paddingLeft: '0px',
                marginBottom: '0px',
              }}
            >
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
                      <tbody className="trStyles">
                        {visitListWeeklyFriday()}
                      </tbody>
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
            <div
              className="daily"
              style={{
                display: selectViewValue === 'Daily' ? '' : 'none',
                columnSpan: 'all',
              }}
            >
              <li
                className="calendar-item calendar-day"
                id="calendarDaily"
                style={gridWeeklyStart}
              >
                <div className="calendarDailyDate" id="calendarDailyDate">
                  <h5
                    style={{ marginBottom: '0px', backgroundColor: '#b9b9b9' }}
                  >
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
                    <tbody className="trStyles">{patientListDaily()}</tbody>
                  </table>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}