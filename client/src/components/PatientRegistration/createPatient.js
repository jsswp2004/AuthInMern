import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import {
  Race,
  Gender,
  Language,
  States,
} from '../listDictionaries/listData/listDictionariesData'

const CreateRecord = (props) => {
  //autocreate MRN
  const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  //autocreate visit number
  const setVisitNumber = Math.floor(1 + Math.random() * 99999)

  // Define the state with useState hook
  const navigate = useNavigate()
  const [record, setRecord] = useState({
    medicalRecordNumber: setMedicalRecordNumber,
    visitNumber: setVisitNumber,
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    race: '',
    dateOfBirth: format(new Date(), 'yyyy-MM-dd'),
    age: '',
    language: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    email: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value })
  }
  //calculate age
  const today = new Date()
  const birthDate = new Date(record.dateOfBirth)
  var age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  //save age to record.age
  record.age = age.toString()

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/records', record)
      .then((res) => {
        setRecord({
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
          addedDate: '',
        })

        // Push to /
        navigate('/patientlist')
      })
      .catch((err) => {
        console.log('Error in CreateRecord!')
      })
  }
// console.log(record)
  //Race
  const racevalues = Race
  const [racevalue, setraceValue] = React.useState('')

  const racevalueChange = (event) => {
    setraceValue(event.target.value)
    // onChange({ race: event.target.value })
    // onChange({ racevalue })
  }

  // console.log(racevalue)
  //Gender
  const gendervalues = Gender
  const [gendervalue, setgenderValue] = React.useState('')

  const gendervalueChange = (event) => {
    setgenderValue(event.target.value)
    // onChange({ gendervalue })
  }

  const languagevalues = Language
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const languagevalueChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const statevalues = States
  const [selectedState, setSelectedState] = useState('')

  const statevalueChange = (event) => {
    setSelectedState(event.target.value)
  }
  // console.log(record)
  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h3>Patient Registration</h3>
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
                      value={record.firstName}
                      // defaultValue={record.firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="middleName">Middlename</label>
                    <input
                      type="text"
                      name="middleName"
                      defaultValue={record.middleName}
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
                      defaultValue={record.lastName}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={record.dateOfBirth}
                      className="form-control"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">
                      Gender
                      <select
                        className="form-control select"
                        name="gender"
                        value={record.gender}
                        onChange={onChange}
                      >
                        {gendervalues.map((genderval) => (
                          <option key={genderval.value} value={genderval.value}>
                            {genderval.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="race">
                      Race
                      <select
                        className="form-control select"
                        name="race"
                        value={record.race}
                        onChange={onChange}
                      >
                        {racevalues.map((raceval) => (
                          <option key={raceval.value} value={raceval.value}>{raceval.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="medicalRecordNumber">MRN </label>
                  <input
                    type="number"
                    className="form-control"
                    name="medicalRecordNumber"
                    placeholder="Automatically generated"
                    value={record.medicalRecordNumber}
                    readOnly
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="visitNumber">Visit Number </label>
                  <input
                    type="number"
                    className="form-control"
                    name="visitNumber"
                    placeholder="Automatically generated"
                    value={record.visitNumber}
                    readOnly
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="language">
                    Language
                    <select
                      className="form-control select"
                      name="language"
                      value={record.language}
                      onChange={onChange}
                    >
                      {languagevalues.map((languageval) => (
                        <option key={languageval.value}  value={languageval.value}>
                          {languageval.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age </label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    placeholder="Automatically generated"
                    value={record.age}
                    readOnly
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder='Enter email'
                    value={record.email}                    
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={record.address}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    name="city"
                    className="form-control"
                    value={record.city}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="number"
                    name="zipCode"
                    className="form-control"
                    value={record.zipCode}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">
                    State
                    <select
                      className="form-control select"
                      name="state"
                      value={record.state}
                      onChange={onChange}
                    >
                      {statevalues.map((stateval) => (
                        <option key={stateval.value} value={stateval.value}>{stateval.name}</option>
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

export default CreateRecord
