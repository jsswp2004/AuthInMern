import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Hour } from '../listDictionaries/listData/listDictionariesData'

const CreateVisit = (props) => {
  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })
  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)

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
  const { id } = useParams()
  console.log(record)
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/records/${id}`)
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
        console.log('Error from UpdateRecordInfo')
      })
  }, [id])

  
  const firstName = record.firstName
  const lastName = record.lastName
  const middleName = record.middleName
  // const visitDate = record.visitDate
  const email = record.email
  // const 
 
  const [visit, setVisit] = useState({
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    visitDate: '',
    hourOfVisit: '',
    email: email,
    provider: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  const patientVisit = visit
  console.log(patientVisit.firstName)
  const hourValues = Hour
  const [hourvalue, sethourValue] = useState('')

  const hourvalueChange = (event) => {
    sethourValue(event.target.value)
    // onChange({ gendervalue })
  }

  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        setUserMD(response.data)
        // .filter=(user) => user.role === 'Attending'
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      firstName: record.firstName,
      lastName: record.lastName,
      middleName: record.middleName,
      email: record.email === null ? visit.email === null ? record.email : visit.email : record.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      provider: visit.provider,
    }
    axios
      .post('http://localhost:8081/api/visits', data)
      .then((res) => {
        // setVisit({
        //   firstName: firstName,
        //   lastName: lastName,
        //   middleName: middleName,
        //   visitDate: '',
        //   hourOfVisit: '',
        //   email: email,
        //   provider: '',
        //   addedDate: '',
        // })

        // Push to /
        navigate(-1)
      })
      .catch((err) => {
        console.log('Error in CreateVisit!')
      })
  }

  console.log(email)
  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h3>Schedule a visit</h3>
        <div className="item3A">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-container">
              <div className="div-items">
                <div className="forms-group">
                  <div className="form-group">
                    <label htmlFor="firstName">Firstname </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      // value={firstName}
                      defaultValue={firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="middleName">Middlename</label>
                    <input
                      type="text"
                      name="middleName"
                      defaultValue={middleName}
                      className="form-control"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Lastname</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      defaultValue={lastName}
                      onChange={onChange}
                    />
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
                        {hourValues.map((hourval) => (
                          <option value={hourval.value}>{hourval.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    defaultValue={email}
                    // value={visit.email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addedDate">Date Created</label>
                  <input
                    name="addedDate"
                    className="form-control"
                    value={visit.addedDate}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="visitDate">Visit Date</label>
                  <input
                    type="date"
                    name="visitDate"
                    className="form-control"
                    value={visit.visitDate}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="provider">Provider</label>
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
                    className="btn btn-success"
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

export default CreateVisit
