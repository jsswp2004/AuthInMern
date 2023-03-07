import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
// import Navbar from '../navigation/navbar'
// import Header from '../shared/Header'
import { Hour } from '../listDictionaries/listData/listDictionariesData'

const CreateVisitFromReg = (props) => {

  const [selectedHour, setSelectedHour] = useState('')

  const navigate = useNavigate()
  const [record, setRecord] = useState({
    medicalRecordNumber: '',
    visitNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    race: '',
    dateOfBirth: '',
    age: '',
    language: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    email: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  // const { id } = useParams()
  const patientID = props.patientID

  // console.log(patientID)
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/records/${patientID}`)
      .then((res) => {
        setRecord({
          medicalRecordNumber: res.data.medicalRecordNumber,
          visitNumber: res.data.visitNumber,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          gender: res.data.gender,
          race: res.data.race,
          dateOfBirth: res.data.dateOfBirth,
          age: res.data.age,
          language: res.data.language,
          address: res.data.address,
          city: res.data.city,
          zipCode: res.data.zipCode,
          state: res.data.state,
          email: res.data.email,
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from CreateVisitFromReg')
      })
  }, [patientID])

  const {
    medicalRecordNumber,
    firstName,
    lastName,
    middleName,
    visitDate,
    // hourOfVisit,
    provider,
    email,
    event,
  } = record
  //autocreate visit number
  const setVisitNumber = Math.floor(1 + Math.random() * 99999)

  const [visit, setVisit] = useState({
    medicalRecordNumber: medicalRecordNumber,
    visitNumber: setVisitNumber,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    visitDate: '',
    hourOfVisit: selectedHour,
    email: email,
    provider: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    event: '',
  })

  //Hour of visit
  const hourValues = Hour

  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })
  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        setUserMD(response.data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const [schedEvent, setSchedEvent] = useState([])
  const schedEvents = schedEvent.filter((event) => {
    return event.name.toString().toLowerCase()
  })
  const clinicEvents = schedEvents.map((doc) => doc.name)

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      .then((response) => {
        setSchedEvent(response.data)
      })
      .catch((error) => {
        console.log('Error from event list')
      })
  }, [])
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
  let { hourOfVisit } = visit
  hourOfVisit = selectedHour
  const selectedMD = visit.provider
  const selectedDate = visit.visitDate
  const filteredVisitsWithMD = getVisits.filter((visit) => {
    return visit.provider === selectedMD && visit.visitDate === selectedDate
  })
  const filteredVisitsWithMDAndDate = filteredVisitsWithMD.map((doc) => doc.hourOfVisit)

//pull scheduled days
  const [schedDays, setSchedDays] = useState([])
  // const schedDay = schedDays.filter((event) => {
  //   return event.name.toString().toLowerCase()
  // })
  // const clinicDays = schedDay.map((doc) => doc.day)

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/schedules')
      .then((response) => {
        setSchedDays(response.data)
      })
      .catch((error) => {
        console.log('Error from schedule list')
      })
  }, [])

  // const filteredSchedDays = schedDays.find((event) =>event.provider === selectedMD )

  // const { scheduledMon, scheduledTues, scheduledWed, scheduledThurs, SsheduledFri } = filteredSchedDays
  // console.log(scheduledMon, filteredSchedDays.scheduledTues, filteredSchedDays.scheduledWed,selectedMD)//, schedDays, schedDays.find((doc) => doc.provider === selectedMD))
  // const filteredSchedDaysWithMD = filteredSchedDays.map((doc) => doc.day)

  // const filteredSchedDaysWithMDAndDate = filteredSchedDays.filter((event) => {
    // return event.day.toString().toLowerCase().includes(selectedDate)
  // })
  
      
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: record.medicalRecordNumber,
      visitNumber: visit.visitNumber,
      firstName: record.firstName,
      lastName: record.lastName,
      middleName: record.middleName,
      email:
        record.email === null
          ? visit.email === null
            ? record.email
            : visit.email
          : record.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: hourOfVisit,
      provider: visit.provider,
      event: visit.event,
    }
    axios
      .post('http://localhost:8081/api/visits', data)
      .then((res) => {
        // Push to /
        navigate('/visitlist')
      })
      .catch((err) => {
        console.log('Error in CreateVisitFromReg!')
      })
  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-containers modalContainer " >
              <div className="div-items">
                <div className="forms-group">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      Firstname
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        // value={firstName}
                        defaultValue={firstName}
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
                        defaultValue={middleName}
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
                        defaultValue={lastName}
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
                        defaultValue={email}
                        // value={visit.email}
                        onChange={onChange}
                      />
                    </label>
                  </div>

                </div>
              </div>

              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="medicalRecordNumber">
                    MRN
                    <input
                      type="number"
                      className="form-control"
                      name="medicalRecordNumber"
                      placeholder="Automatically generated"
                      value={record.medicalRecordNumber}
                      readOnly
                      onChange={onChange}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="visitNumber">
                    Visit Number
                    <input
                      type="number"
                      className="form-control"
                      name="visitNumber"
                      placeholder="Automatically generated"
                      value={record.visitNumber}
                      readOnly
                      onChange={onChange}
                    />
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
                <div className="form-group">
                  <label htmlFor="provider">
                    Provider
                    <select
                      key={visit.provider}
                      className="form-control select"
                      name="provider"
                      value={visit.provider}
                      onChange={onChange}
                    >
                      {' '}
                      <option key="0" value="Select Provider">
                        Select Provider
                      </option>
                      {providerMD.map((doc) => (
                        <option key={doc._id} value={doc.provider}>
                          {doc}
                        </option>
                      ))}
                    </select>
                    <label>Available days:</label>
                    {/* <span> {[filteredSchedDays.scheduledMon,' ',
                      filteredSchedDays.scheduledTues,' ',
                      filteredSchedDays.scheduledWed,' ',
                      filteredSchedDays.scheduledThurs,' ',
                      filteredSchedDays.scheduledFri]}
                    </span> */}
                  </label>
                </div>
              </div>
              <div className="div-items updateRegistrationGrp">

                <div className="form-group">
                  <label htmlFor="event">
                    Scheduled Event
                    <select
                      key={visit.event._id}
                      className="form-control select"
                      name="event"
                      value={visit.event}
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
                  <label htmlFor="hourOfVisit">
                    Hour of Visit
                    <input
                      type="text"
                      name="hourOfVisit"
                      className="form-control"
                      // value={visit.hourOfVisit}
                      value={selectedHour}
                      onChange={onChange}
                    />
                    {/* <select
                      key={visit.hourOfVisit}
                      className="form-control select"
                      name="hourOfVisit"
                      value={visit.hourOfVisit}
                      onChange={onChange}
                    >
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
                <div
                  className="form-group"
                  style={{
                    float: 'left',
                    textAlign: 'left',
                    paddingTop: '10px',
                  }}
                >
                  <input
                    value="Add"
                    type="submit"
                    className="btn btn-success updateRegistrationBtn"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateVisitFromReg
