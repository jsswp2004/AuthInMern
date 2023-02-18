import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
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
import RegistrationDetail from './registrationDetails'

function UpdateRecordInfo(props) {
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

  // console.log('record', record)
  const { id } = useParams()
  const navigate = useNavigate()

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
  //will make this active if age is to be updated
  // record.age = age

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: record.medicalRecordNumber,
      visitNumber: record.visitNumber,
      firstName: record.firstName.toUpperCase(),
      lastName: record.lastName.toUpperCase(),
      middleName: record.middleName.toUpperCase(),
      gender: record.gender,
      race: record.race,
      dateOfBirth: record.dateOfBirth,
      age: record.age,
      language: record.language,
      address: record.address,
      city: record.city,
      zipCode: record.zipCode,
      state: record.state,
      email: record.email,
      addedDate: record.addedDate,
    }

    axios
      .put(`http://localhost:8081/api/records/${id}`, data)
      .then((res) => {
        // navigate(`/patientlist/${id}`)
        navigate(`/patientlist`)
      })
      .catch((err) => {
        console.log('Error in UpdateRecordInfo!')
      })
  }

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

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <div className="item3A">
          <div className="item3AItem left">
            <h4 className="createPageHeader">Patient Registration</h4>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-grid-container">
                <div className="div-items">
                  <div className="forms-group">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        Firstname
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={record.firstName}
                          // defaultValue={record.firstName}
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
                          defaultValue={record.middleName}
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
                          defaultValue={record.lastName}
                          onChange={onChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">
                        Date of Birth
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={record.dateOfBirth}
                          className="form-control"
                          onChange={onChange}
                        />
                      </label>
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
                            <option value={genderval.value}>
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
                            <option value={raceval.value}>
                              {raceval.label}
                            </option>
                          ))}
                        </select>
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
                    <label htmlFor="language">
                      Language
                      <select
                        className="form-control select"
                        name="language"
                        value={record.language}
                        onChange={onChange}
                      >
                        {languagevalues.map((languageval) => (
                          <option value={languageval.value}>
                            {languageval.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">
                      Age
                      <input
                        type="number"
                        className="form-control"
                        name="age"
                        placeholder="Automatically generated"
                        value={record.age}
                        readOnly
                        onChange={onChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        value={record.email}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="div-items">
                  <div className="form-group">
                    <label htmlFor="address">
                      Address
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={record.address}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">
                      City
                      <input
                        name="city"
                        className="form-control"
                        value={record.city}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">
                      Zip Code
                      <input
                        type="number"
                        name="zipCode"
                        className="form-control"
                        value={record.zipCode}
                        onChange={onChange}
                      />
                    </label>
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
                          <option value={stateval.value}>
                            {stateval.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div
                    className="form-group updateRegistrationBtn"
                    // style={{
                    //   float: 'right',
                    //   textAlign: 'left',
                    //   paddingTop: '10px',
                    //   bottom: '0px',
                    //   position: 'absolute'
                    // }}
                  >
                    <input
                      value="Update"
                      type="submit"
                      className="btn btn-success"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="item3AItem right">
            <h4 className="createPageHeader">Details</h4>
            <RegistrationDetail />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateRecordInfo
