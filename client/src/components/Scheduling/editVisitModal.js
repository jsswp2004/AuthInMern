import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
// import Navbar from '../navigation/navbar'
// import Header from '../shared/Header'
import { Hour } from '../listDictionaries/listData/listDictionariesData'
// import CreatePatientFromVisit from '../PatientRegistration/createPatientFromVisit'

function UpdateVisitInfo(props) {
  //create provider object
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

  const [schedEvent, setSchedEvent] = useState([])
  const schedEvents = schedEvent.filter((event) => {
    return event.name //.toString().toLowerCase() //.includes('attending')
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

  const hourValues = Hour
  const [hourvalue, sethourValue] = useState('')

  const hourvalueChange = (event) => {
    sethourValue(event.target.value)
    // onChange({ gendervalue })
  }
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
    hourOfVisitz: '',
    event: '',
  })

  const visitID = props.visitID
  // const { id } = useParams()
  const navigate = useNavigate()

  // const [prevID, setprevID] = useState('')
  // const previousID = useRef('')

  // useEffect(() => {
  //   previousID.current = prevID
  // }, [prevID])

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
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), //res.data.addedDate,
          visitDate: res.data.visitDate,
          hourOfVisit: res.data.hourOfVisit,
          provider: res.data.provider,
          event: res.data.event,
        })
      })
      .catch((err) => {
        console.log('Error from UpdateVisitInfo')
      })
    // setprevID(id)
  }, [visitID])

  // console.log(previousID.current)

  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

  const [data, setData] = useState([])
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: visit.medicalRecordNumber,
      visitNumber: visit.visitNumber,
      // firstName: visit.firstName.toUpperCase(),
      // lastName: visit.lastName.toUpperCase(),
      // middleName: visit.middleName.toUpperCase(),
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      email: visit.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      provider: visit.provider,
      event: visit.event,
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
  }

  // const createFromVisit = () => {
  //   return <CreatePatientFromVisit data={data} />
  // }
  return (
    <div className="grid_containers">
      <div className="item3">
        {/* <h4 className="createPageHeader">Edit Visit</h4> */}
        <div className="item3A createRoleModalBody">
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
                  {/* <div className="form-group">
                    <label htmlFor="hourOfVisit">Appointment Time</label>
                    <input
                      name="hourOfVisit"
                      className="form-control"
                      value={visit.hourOfVisit}
                      onChange={onChange}
                    />
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="hourOfVisit">
                      Hour of Visit
                      <select
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
                      type="string"
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
              </div>
              <div className="div-items updateRegistrationGrp">
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

                <div className="form-group">
                  <label htmlFor="medicalRecordNumber">
                    MRN
                    <input
                      placeholder="Please register client"
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
                      placeholder="Please register client"
                      type="text"
                      name="visitNumber"
                      className="form-control"
                      value={visit.visitNumber}
                      onChange={onChange}
                      readOnly
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
                  <input
                    value="Update"
                    type="submit"
                    className="btn btn-success btn-sm "
                  />

                  <Link
                    className="btn btn-info btn-sm "
                    to={`/createPatientFromVisit/${visitID}`}
                    // data={data}
                    firstName={data.firstName}
                  >
                    <i
                      className="fa fa-hospital-o fa-sm"
                      aria-hidden="true"
                      title="Add registration"
                    />{' '}
                    Register
                  </Link>
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
