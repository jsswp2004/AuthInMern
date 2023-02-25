import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
// import Navbar from '../navigation/navbar'
// import Header from '../shared/Header'
import { Hour } from '../listDictionaries/listData/listDictionariesData'

const CreateVisitFromReg = (props) => {
  

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
    hourOfVisit,
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
    hourOfVisit: '',
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
      hourOfVisit: visit.hourOfVisit,
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
                      defaultValue={email}
                      // value={visit.email}
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
