import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import { Hour } from '../listDictionaries/listData/listDictionariesData'
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'

const CreateVisitMonthly = (props) => {
  //autocreate MRN
  //const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  //autocreate visit number
  //const setVisitNumber = Math.floor(1 + Math.random() * 99999)

  const navigate = useNavigate()
  const [visit, setVisit] = useState({
    medicalRecordNumber: props.medicalRecordNumber, //setMedicalRecordNumber,
    visitNumber: props.visitNumber, //setVisitNumber,
    firstName: props.firstName,
    lastName: props.lastName,
    middleName: props.middleName,
    visitDate: props.visitDate,
    hourOfVisit: '',
    email: props.email,
    provider: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    event: '',
  })

  const hourValues = Hour
  const [hourvalue, sethourValue] = useState('')

  const hourvalueChange = (event) => {
    sethourValue(event.target.value)
    // onChange({ gendervalue })
  }
  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

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
    return event.Name.toString().toLowerCase() //.includes('attending')
  })
  const clinicEvents = schedEvents.map((doc) => doc.Name)

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

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/visits', visit)
      .then((res) => {
        setVisit({
          medicalRecordNumber: '',
          visitNumber: '',
          firstName: '',
          lastName: '',
          middleName: '',
          visitDate: '',
          hourOfVisit: '',
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

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="form-grid-quickvisit-container">
        <div className="div-items">
          {/* style={{width: '360px'}} */}
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
              <label htmlFor="hourOfVisit">
                Hour of Visit
                <select
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
                </select>
              </label>
            </div>
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
                    <option key={doc._id} value={doc.event}>
                      {doc}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="div-items">
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
                  <option key={doc.value} value={doc.value}>
                    {doc}
                  </option>
                ))}
              </select>
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
        <div className="div-items" style={{ display: 'none' }}>
          <div className="form-group">
            <label htmlFor="medicalRecordNumber">MRN</label>
            <input
              type="text"
              placeholder="Please register client"
              className="form-control"
              name="medicalRecordNumber"
              value={visit.medicalRecordNumber}
              onChange={onChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="visitNumber">Visit ID</label>
            <input
              placeholder="Please register client"
              type="text"
              className="form-control"
              name="visitNumber"
              value={visit.visitNumber}
              onChange={onChange}
              readOnly
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateVisitMonthly
