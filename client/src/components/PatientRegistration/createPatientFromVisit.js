import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
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

const CreatePatientFromVisit = (props) => {
  //autocreate MRN
  const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  //autocreate visit number
  const setVisitNumber = Math.floor(1 + Math.random() * 99999)
  
  // Define the state with useState hook
  const navigate = useNavigate()
  const [visit, setVisit] = useState({
    medicalRecordNumber: '',
    visitNumber:'',
    lastName: '',
    middleName: '',
    visitDate: '',
    hourOfVisit: '',
    email: '',
    provider: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  const { id } = useParams()
  // console.log(visit.firstName)
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/visits/${id}`)
      .then((res) => {
        setVisit({
          medicalRecordNumber: res.data.medicalRecordNumber,
          visitNumber: res.data.visitNumber,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          visitDate: res.data.visitDate,
          hourOfVisit: res.data.hourOfVisit,
          email: res.data.email,
          provider: res.data.provider,
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from CreatePatientFromVisit')
      })
  }, [id])
  // console.log(visit)
  // console.log(visit.medicalRecordNumber)
  const {
    medicalRecordNumber,
    visitNumber,
    firstName,
    lastName,
    middleName,
    gender,
    race,
    dateOfBirth,
    age,
    language,
    address,
    city,
    zipCode,
    state,
    email,
    addedDate,
  } = visit

  // console.log(firstName)
  const today = new Date()
  // const setVisitNumber = visit.visitNumber
  const [record, setRecord] = useState({
    medicalRecordNumber: setMedicalRecordNumber,
    visitNumber: setVisitNumber,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    gender: '',
    race: '',
    dateOfBirth: '',
    age: '',
    language: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    email: visit.email,
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value })
  }

  // console.log(record)
  //calculate age
  
  const birthDate = new Date(record.dateOfBirth)
  // let clientAge = visit.age
  record.age = today.getFullYear() - birthDate.getFullYear()
  // const m = today.getMonth() - birthDate.getMonth()
  // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //   age--
  // }
  // console.log(record.age)
  // //save age to record.age
  // record.age = age.toString()

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: record.medicalRecordNumber,
      visitNumber: record.visitNumber,
      firstName: visit.firstName.toUpperCase(),
      lastName: visit.lastName.toUpperCase(),
      middleName: visit.middleName.toUpperCase(),
      gender: record.gender,
      race: record.race,
      dateOfBirth: record.dateOfBirth,
      age: record.age,
      language: record.language,
      address: record.address,
      city: record.city,
      zipCode: record.zipCode,
      state: record.state,
      email: visit.email,
      addedDate: visit.addedDate,
    }

    const data2 = {
      medicalRecordNumber: record.medicalRecordNumber,
      visitNumber: record.visitNumber,
    }

    axios
    .post('http://localhost:8081/api/visits', data2)
    .then((res) => {


      // Push to /
      navigate('/patientlist')
      
    })
    .catch((err) => {
      console.log('Error in CreatePatientFromVisit!')
    })
    

    axios
      .post('http://localhost:8081/api/records', data)
      .then((res) => {


        // Push to /
        //navigate('/patientlist')
        
      })
      .catch((err) => {
        console.log('Error in CreatePatientFromVisit!')
      })
    
    const visit2 = {
      medicalRecordNumber: data2.medicalRecordNumber,
      visitNumber: data2.visitNumber,
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      email: visit.email,
      provider: visit.provider,
      addedDate: visit.addedDate,
    }
    
      axios
      .put(`http://localhost:8081/api/visits/${id}`, visit2)
      .then((res) => {


        // Push to /
        navigate('/patientlist')
        
      })
      .catch((err) => {
        console.log('Error in CreatePatientFromVisit!')
      })
  }

  
  // console.log(data2)
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
        <h5 className="createPageHeader">Patient Registration</h5>
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
                      value={visit.firstName}
                      // defaultValue={record.firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="middleName">Middlename</label>
                    <input
                      type="text"
                      name="middleName"
                      defaultValue={visit.middleName}
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
                      defaultValue={visit.lastName}
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
                    value={visit.email}                    
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

export default CreatePatientFromVisit
