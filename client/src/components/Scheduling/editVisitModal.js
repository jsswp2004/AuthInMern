import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Input from 'react-phone-number-input/input'
import { is } from 'date-fns/locale'

function UpdateVisitInfo(props) {
  //#region autocreate medical record number
  const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  //autocreate visit number
  const setVisitNumber = Math.floor(1 + Math.random() * 99999)
  //#endregion
  const [selectedHour, setSelectedHour] = useState('')


  //#region create provider object
  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })
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

  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)
  //#endregion
  //#region create events dropdown object
  const [schedEvent, setSchedEvent] = useState([])
  const schedEvents = schedEvent.filter((event) => {
    return event.name
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
  //#endregion
  //#region visit id value from props
  const visitID = props.visitID
  const navigate = useNavigate()
  //#endregion
  //#region create initial STATE for visit object
  const [visit, setVisit] = useState({
    medicalRecordNumber: '',
    visitNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    addedDate: '',
    visitDate: '',
    provider: '',
    hourOfVisit: selectedHour,
    event: '',
    cellphone: '',
    checkIn: '',
    checkOut: '',
  })


  // pull exisiting visit info
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/visits/${visitID}`)
      .then((res) => {
        setVisit({
          medicalRecordNumber: res.data.medicalRecordNumber,
          visitNumber: res.data.visitNumber,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          email: res.data.email,
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          visitDate: res.data.visitDate,
          hourOfVisit: res.data.hourOfVisit,
          provider: res.data.provider,
          event: res.data.event,
          cellphone: res.data.cellphone,
          checkIn: res.data.checkIn,
          checkOut: res.data.checkOut,
        })
      })
      .catch((err) => {
        console.log('Error from UpdateVisitInfo')
      })

  }, [visitID])
  //#endregion
  //deconstruct visit object
  const { medicalRecordNumber, visitNumber, firstName, lastName, middleName, email, addedDate, checkIn, checkOut } = visit
  console.log(medicalRecordNumber, checkIn, checkOut)
  const checkInValue = checkIn
  const checkOutValue = checkOut
  //pull visits to know available hours in a day
  const [getVisits, setGetVisits] = useState([])
  // console.log(checkInValue)
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/visits')
      .then((response) => {
        const data = response.data
        setGetVisits(data)
        //   .filter((visit) => {
        //   return visit.provider === selectedMD && visit.visitDate === selectedDate
        // })
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

  //checkout , checkin methods
  const [isCheckedIn, setIsCheckedIn] = useState(checkIn.length > 0 ? true : false)
  const [checkInTime, setCheckInTime] = useState(checkIn)
  const [isCheckedOut, setIsCheckedOut] = useState(checkOut.length > 0 ? true : false)
  const [checkOutTime, setCheckOutTime] = useState(checkOut)
  const [checkInDisplay, setCheckInDisplay] = useState(checkInValue.length > 0 ? true : false)
  const [checkOutDisplay, setCheckOutDisplay] = useState(checkOutValue.length > 0 ? true : false)

  console.log(isCheckedIn, checkIn)
  function toggleCheckIn() {
    setCheckInTime(checkInValue.length > 0 ? '' : format(new Date(), 'HH:mm:ss'))
    setIsCheckedIn(!isCheckedIn)
    setCheckInDisplay(!checkInDisplay)
  }

  function toggleCheckOut() {
    // setCheckOutTime(format(new Date(), 'HH:mm:ss'))
    setCheckOutTime(checkOutValue.length > 0 ? '' : format(new Date(), 'HH:mm:ss'))
    setIsCheckedOut(!isCheckedOut)
    setCheckOutDisplay(!checkOutDisplay)
  }

  console.log(checkInTime, checkInDisplay)
  // , checkInTime, checkOutTime, isCheckedIn, isCheckedOut, checkInDisplay
  const onChange = (e) => {
    // setVisit({ ...visit, [e.target.name]: e.target.value })
    setVisit({
      medicalRecordNumber: setMedicalRecordNumber,
      visitNumber: setVisitNumber,
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      email: visit.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      provider: visit.provider,
      event: visit.event,
      cellphone: visit.cellphone,
      // checkIn: visit.checkIn,
      // checkIn: checkInTime,
      // checkOut: visit.checkOut,
      // checkOut: checkOutTime,
      [e.target.name]: e.target.value,
    })

  }


  const [data, setData] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: setMedicalRecordNumber,
      visitNumber: setVisitNumber,
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      email: visit.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      provider: visit.provider,
      event: visit.event,
      cellphone: visit.cellphone,
      // checkIn: visit.checkIn,
      checkIn: checkInTime,
      // checkOut: visit.checkOut,
      checkOut: checkOutTime,

    }

    setData(data)

    axios
      .put(`http://localhost:8081/api/visits/${visitID}`, data)
      .then((res) => {
        navigate(`/clinicVisit`)
      })
      .catch((err) => {
        console.log('Error in UpdateVisitInfo!')
      })
    window.location.reload()
    window.location.close()
  }



  return (
    <div className="grid_containers">
      <div className="item3">

        <div className="createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-containers modalContainer ">
              <div className="div-items">
                <div className="forms-group">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      Firstname
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={visit.firstName}
                        onChange={onChange}
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="cellphone">
                      Cellphone
                      <Input
                        className="form-control"
                        Country='US'
                        international
                        withCountryCallingCode
                        placeholder="Enter phone number"
                        value={visit.cellphone}
                        onChange={(value) => {
                          setVisit({ ...visit, cellphone: value })
                        }}
                      >

                      </Input>
                    </label>
                  </div>
                </div>
                <div className="form-group "
                  style={{
                    float: 'left',
                    textAlign: 'left',
                    marginTop: '10px',
                  }}
                >
                  <input
                    value="Update"
                    type="submit"
                    className="btn btn-success btngap "
                  // style={{ display: selectedRecord.length === 0 ? 'none' : 'inline' }}
                  />

                  {/* <Link
                    className="btn btn-info"
                    to={`/createPatientFromVisit/${visitID}`}
                    style={{ display: selectedRecord.length === 0 ? 'inline' : 'none' }}
                  >
                    <i
                      className="fa fa-hospital-o "
                      aria-hidden="true"
                      title="Add registration"
                    />{' '}
                    Register
                  </Link> */}
                </div>
              </div>
              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="medicalRecordNumber">
                    MRN
                    <input
                      placeholder="Auto-generated MRN"
                      type="text"
                      name="medicalRecordNumber"
                      className="form-control"
                      value={visit.medicalRecordNumber}
                      onChange={onChange}
                      readOnly
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="visitNumber">
                    Visit ID
                    <input
                      placeholder="Auto-generated Visit ID"
                      type="text"
                      name="visitNumber"
                      className="form-control"
                      value={visit.visitNumber}
                      onChange={onChange}
                      readOnly
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="addedDate">
                    Date Created
                    <input
                      // type="date"
                      name="addedDate"
                      className="form-control"
                      value={visit.addedDate}
                      onChange={onChange}
                      readOnly
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
                      key={visit.provider._id}
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
                  <label htmlFor="event">
                    Scheduled Event
                    <select
                      key={visit._id}
                      className="form-control select"
                      name="event"
                      value={visit.event}
                      onChange={onChange}
                    >
                      {' '}
                      <option key="0" value="Select Event" disabled selected>
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
              </div>
              <div className="div-items updateRegistrationGrp">
                <div className="form-group">
                  <label htmlFor="hourOfVisit">
                    Hour of Visit
                    <input
                      type="text"
                      name="hourOfVisit"
                      className="form-control"
                      placeholder={visit.hourOfVisit}
                      // defaultValue={visit.hourOfVisit}
                      value={hourOfVisit}
                      onChange={onChange}
                    />
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
                <div className="form-group">
                  <label htmlFor="checkIn" className="scheduleCheckboxContainer">
                    Check In: &nbsp;
                    {checkIn}
                    {/* <span style={{ display: checkInDisplay === true ? 'inline' : 'none' }}>{checkInTime}</span> */}
                    {/* <span style={{ display: checkInValue.length > 0 ? 'inline' : 'none' }}>{checkInTime}</span> */}

                    {/* <span onClick={setCheckInDisplay} style={{ display: checkInDisplay }}>{checkInTime}</span> */}
                    {/* <span >{checkInTime}</span> */}

                    <input
                      Checked={checkInValue.length > 0 ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleCheckIn}
                      name="CheckIn"
                      id='checkIn'
                      value={checkInTime}
                    // value={checkIn}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label htmlFor="checkOut" className="scheduleCheckboxContainer">
                    Check Out: &nbsp;
                    {checkOut}
                    {/* <span style={{ display: checkOutDisplay === true ? 'inline' : 'none' }}>{checkOutTime}</span> */}

                    {/* {checkOut} */}

                    <input
                      Checked={checkOutValue.length > 0 ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleCheckOut}
                      name="CheckOut"
                      id='checkOut'
                      value={checkOutTime}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>


              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateVisitInfo
