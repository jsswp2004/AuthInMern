import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import { Hour } from '../listDictionaries/listData/listDictionariesData'
// import SelectedHour from '../../components/ClinicVisits/selectedHour'
// import { array } from 'prop-types'
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'

const CreateVisitMonthly = (props) => {
  const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  //autocreate visit number
  const setVisitNumber = Math.floor(1 + Math.random() * 99999)

  const [selectedHour, setSelectedHour] = useState('')
  // console.log(selectedHour)
  const navigate = useNavigate()
  const [visit, setVisit] = useState({
    medicalRecordNumber: setMedicalRecordNumber,
    visitNumber: setVisitNumber,
    firstName: props.firstName,
    lastName: props.lastName,
    middleName: props.middleName,
    visitDate: props.visitDate,
    hourOfVisit: selectedHour ,
    email: props.email,
    provider: props.provider,
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    event: '',
  })

  let { hourOfVisit } = visit
  hourOfVisit = selectedHour
  // console.log(hourOfVisit)
  // const hourValues = Hour
  // const [hourvalue, sethourValue] = useState('')

  // const hourvalueChange = (event) => {
  //   sethourValue(event.target.value)
  //   // onChange({ gendervalue })
  // }
  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

  // console.log(visit)
  //create provider object
  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })
  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)

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

  const [schedEvent, setSchedEvent] = useState([])
  const schedEvents = schedEvent.filter((event) => {
    return event.name//.toString().toLowerCase() //.includes('attending')
  })
  const clinicEvents = schedEvents.map((doc) => doc.name)


  const [getVisits, setGetVisits] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/visits')
      .then((response) => {
        const data = response.data
        setGetVisits(data)
      })
      .catch((error) => {
        console.log('Error from visit list')
      })
  }, [])


  const selectedMD = visit.provider
  const selectedDate = visit.visitDate
  // const visits = new array(visit)
  const filteredVisitsWithMD = getVisits.filter((visit) => {
    return visit.provider === selectedMD && visit.visitDate === selectedDate //selectedDate props.visitDate selectedMD
    //&& visit.hourOfVisit === selectedHour
  })
  // console.log(selectedMD, selectedDate, filteredVisitsWithMD)
  const filteredVisitsWithMDAndDate = filteredVisitsWithMD.map((doc) => doc.hourOfVisit)

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      // .limit(10)
      .then((response) => {
        setSchedEvent(response.data)
      })
      .catch((error) => {
        console.log('Error from event list')
      })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: visit.medicalRecordNumber,
      visitNumber: visit.visitNumber,
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      visitDate: visit.visitDate,
      hourOfVisit:hourOfVisit,
      email: visit.email,
      provider: visit.provider,
      event: visit.event,
      addedDate: visit.addedDate,

    }

    console.log(data)
    axios
      .post('http://localhost:8081/api/visits', data)
      .then((res) => {
        setVisit({
          medicalRecordNumber: '',
          visitNumber: '',
          firstName: '',
          lastName: '',
          middleName: '',
          visitDate: '',
          hourOfVisit: hourOfVisit,
          email: '',
          provider: '',
          addedDate: '',
          event: '',
        })

        // Push to /patientlist
        navigate('/patientlist')
      })

      .catch((err) => {
        console.log('Error in CreateVisit!')
      })
  }
  // const [searchInput, setSearchInput] = useState('')
  // //captures and sets value of the input text
  // const handleChange = (e) => {
  //   e.preventDefault()
  //   setSearchInput(e.target.value)
  // }


  // var filteredEvents = clinicEvents.filter((events) => {
  //   // if (searchInput === '') {
  //   //   return 'please select an event'
  //   // } else {
  //     return events.toString().toLowerCase().includes(searchInput)
  //   // } 
  // })
  //selected hour of visit

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="form-grid-containers modalContainer">
        <div className="div-items">

          <div className="form-group">
            <label htmlFor="firstName">
              Firstname
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={visit.firstName}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="middleName">
              Middlename
              <input
                type="text"
                name="middleName"
                value={visit.middleName}
                className="form-control"
                onChange={onChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              Lastname
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={visit.lastName}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                className="form-control"
                value={visit.email}
                onChange={onChange}
              />
            </label>
          </div>

        </div>
        <div className="div-items">
          <div className="form-group">
            <label htmlFor="provider">
              Provider
              <select
                className="form-control select"
                name="provider"
                value={visit.provider}
                onChange={onChange}
              >
                {' '}
                <option value="" disabled selected>
                  Select Provider
                </option>
                {providerMD.map((doc) => (
                  <option key={doc._id} value={doc.provider}>
                    {doc}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="hourOfVisit">
              Hour of Visit
              <input
                type="text"
                name="hourOfVisit"
                className="form-control"
                //value={visit.hourOfVisit}
                value={selectedHour}
                onChange={onChange}
              />
              {/* <select
                className="form-control select"
                name="hourOfVisit"
                value={visit.hourOfVisit}
                onChange={onChange}
              >
                {' '}
                {hourValues.map((hourval) => (
                  <option key={hourval.value} value={hourval.value}>
                    {hourval.label}
                  </option>
                ))}
              </select> */}
              
              <div className='hour-flex'>

                <div className='hour-flex_Item' onClick={() => setSelectedHour('09:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('09:00') ? '#AA336A' : '#90EE90' }}>9:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('09:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('09:15') ? '#AA336A' : '#90EE90' }}>9:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('09:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('09:30') ? '#AA336A' : '#90EE90' }}>9:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('09:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('09:45') ? '#AA336A' : '#90EE90' }}>9:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('10:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('10:00') ? '#AA336A' : '#90EE90' }}>10:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('10:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('10:15') ? '#AA336A' : '#90EE90' }}>10:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('10:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('10:30') ? '#AA336A' : '#90EE90' }}>10:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('10:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('10:45') ? '#AA336A' : '#90EE90' }}>10:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('11:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('11:00') ? '#AA336A' : '#90EE90' }}>11:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('11:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('11:15') ? '#AA336A' : '#90EE90' }}>11:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('11:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('11:30') ? '#AA336A' : '#90EE90' }}>11:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('11:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('11:45') ? '#AA336A' : '#90EE90' }}>11:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('12:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('12:00') ? '#AA336A' : '#90EE90' }}>12:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('12:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('12:15') ? '#AA336A' : '#90EE90' }}>12:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('12:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('12:30') ? '#AA336A' : '#90EE90' }}>12:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('12:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('12:45') ? '#AA336A' : '#90EE90' }}>12:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('13:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('13:00') ? '#AA336A' : '#90EE90' }}>13:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('13:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('13:15') ? '#AA336A' : '#90EE90' }}>13:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('13:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('13:30') ? '#AA336A' : '#90EE90' }}>13:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('13:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('13:45') ? '#AA336A' : '#90EE90' }}>13:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('14:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('14:00') ? '#AA336A' : '#90EE90' }}>14:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('14:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('14:15') ? '#AA336A' : '#90EE90' }}>14:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('14:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('14:30') ? '#AA336A' : '#90EE90' }}>14:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('14:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('14:45') ? '#AA336A' : '#90EE90' }}>14:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('15:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('15:00') ? '#AA336A' : '#90EE90' }}>15:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('15:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('15:15') ? '#AA336A' : '#90EE90' }}>15:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('15:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('15:30') ? '#AA336A' : '#90EE90' }}>15:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('15:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('15:45') ? '#AA336A' : '#90EE90' }}>15:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('16:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('16:00') ? '#AA336A' : '#90EE90' }}>16:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('16:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('16:15') ? '#AA336A' : '#90EE90' }}>16:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('16:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('16:30') ? '#AA336A' : '#90EE90' }}>16:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('16:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('16:45') ? '#AA336A' : '#90EE90' }}>16:45</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('17:00')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('17:00') ? '#AA336A' : '#90EE90' }}>17:00</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('17:15')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('17:15') ? '#AA336A' : '#90EE90' }}>17:15</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('17:30')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('17:30') ? '#AA336A' : '#90EE90' }}>17:30</div>
                <div className='hour-flex_Item' onClick={() => setSelectedHour('17:45')} style={{ backgroundColor: filteredVisitsWithMDAndDate.includes('17:45') ? '#AA336A' : '#90EE90' }}>17:45</div>
              </div>
            </label>
          </div>
          {/* create an hour grid using css */}

        </div>
        <div className="div-items updateRegistrationGrp">
          <div className="form-group">
            <label htmlFor="event">
              Scheduled Event
              <select
                key={visit.event._id}
                className="form-control select"
                name="event"
                value={visit.name}
                onChange={onChange}
              >
                {' '}
                <option key="0" value="Select Event">
                  Select Event
                </option>
                {clinicEvents.map((doc) => (
                  <option key={doc._id} value={doc.name}>
                    {doc}
                  </option>
                ))}
              </select>
            </label>


          </div>
          <div className="form-group">
            <label htmlFor="addedDate">
              Date Created
              <input
                name="addedDate"
                className="form-control"
                value={visit.addedDate}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="visitDate">
              Visit Date
              <input
                type="date"
                name="visitDate"
                className="form-control"
                value={visit.visitDate}
                onChange={onChange}
              />
            </label>
          </div>

          <div
            className="form-group updateRegistrationBtn"
            style={{
              float: 'left',
              textAlign: 'left',
              paddingTop: '10px',
            }}
          >
            <input value="Add" type="submit" className="btn btn-success" />
            {/* <Alert variant="success" dismissible style={{ display: show ? 'false' : 'true' } }>
          <Alert.Heading>Visit added!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert> */}
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateVisitMonthly
