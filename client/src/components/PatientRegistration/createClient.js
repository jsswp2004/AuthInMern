import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import styles from './styles.module.css'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import {
  Race,
  Gender,
  Language,
  States,
} from '../listDictionaries/listData/listDictionariesData'

const CreateClient = () => {
  const [form, setForm] = useState({
    medicalRecordNumber: '',
    visitNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    race: '',
    dateOfBirth: '',
    age: '',
    language: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
  })
    // These methods will update the state properties.
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value }
      })
    }

  // //autocreate MRN
  // const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  // //autocreate visit number
  // const setVisitNumber = Math.floor(1 + Math.random() * 99999)
  //calculating age
  // const today = new Date()
  // const birthDate = new Date(req.body.dateOfBirth)
  // let age = today.getFullYear() - birthDate.getFullYear()
  // const m = today.getMonth() - birthDate.getMonth()
  // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //   age--
  // }
  //
  //Race
  const racevalues = Race
  const [racevalue, setraceValue] = React.useState('')

  const racevalueChange = (event) => {
    setraceValue(event.target.value)
    updateForm({ race: event.target.value })
  }
  //Gender
  const gendervalues = Gender
  const [gendervalue, setgenderValue] = React.useState('')

  const gendervalueChange = (event) => {
    setgenderValue(event.target.value)
    updateForm({ gender: event.target.value })
  }
  //Language
  const languagevalues = Language
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const languagevalueChange = (event) => {
    setSelectedLanguage(event.target.value)
    updateForm({ language: event.target.value })
  }
  //State
  const statevalues = States
  const [selectedState, setSelectedState] = useState('')

  const statevalueChange = (event) => {
    setSelectedState(event.target.value)
    updateForm({ state: event.target.value })
  }

  //Define the state
  const navigate = useNavigate()
  //autocreate MRN
  const setMedicalRecordNumber = Math.floor(100000 + Math.random() * 900000)
  //autocreate visit number
  const setVisitNumber = Math.floor(1 + Math.random() * 99999)
  const [client, setClient] = useState({
    medicalRecordNumber: setMedicalRecordNumber,
    visitNumber: setVisitNumber,
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

  const onChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value })
  }

  console.log(client)

  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = 'http://localhost:8081/api/clients'
      const { data: res } = await axios.post(url, client)
      navigate('/clients')
      console.log(res.message)
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
  }

  return (
    <div className="grid_container">
      <div className="item1">
      <Header/>
      </div>
      <div className="item2">
      <Navbar />
      </div>
      <div className="item3">
      <h3>Patient Registration</h3>
        <div className="item3A">
        <form onSubmit={onSubmit}>   
          <div className="form-grid-container">
            <div className="div-items">
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="firstName">Firstname </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => updateForm({ firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middlename</label>
                  <input
                    type="text"
                    id="middleName"
                    value={form.middleName}
                    className="form-control"
                    onChange={(e) => updateForm({ middleName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => updateForm({ lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={form.dateOfBirth}
                    className="form-control"
                    onChange={(e) =>
                      updateForm({ dateOfBirth: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">
                    Gender
                    <select
                      className="form-control select"
                      id="gender"
                      value={gendervalue}
                      onChange={gendervalueChange}
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
                      id="race"
                      value={racevalue}
                      onChange={racevalueChange}
                    >
                      {racevalues.map((raceval) => (
                        <option value={raceval.value}>{raceval.label}</option>
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
                  id="medicalRecordNumber"
                  placeholder="Automatically generated"
                  value={form.medicalRecordNumber}
                  readOnly
                  onChange={(e) =>
                    updateForm({ medicalRecordNumber: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="visitNumber">Visit Number </label>
                <input
                  type="number"
                  className="form-control"
                  id="visitNumber"
                  placeholder="Automatically generated"
                  value={form.visitNumber}
                  readOnly
                  onChange={(e) => updateForm({ visitNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">
                  Language
                  <select
                    className="form-control select"
                    id="language"
                    value={selectedLanguage}
                    onChange={languagevalueChange}
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
                <label htmlFor="age">Age </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder="Automatically generated"
                  value={form.age}
                  readOnly
                  onChange={(e) => updateForm({ age: e.target.value })}
                />
              </div>
            </div>
            <div className="div-items">
              <div className="form-group">
                <label htmlFor="streetAddress">Address</label>
                <input
                  type="text"
                  id="streetAddress"
                  className="form-control"
                  value={form.address}
                  onChange={(e) => updateForm({ address: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  className="form-control"
                  value={form.city}
                  onChange={(e) => updateForm({ city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="number"
                  id="zipCode"
                  className="form-control"
                  value={form.zipCode}
                  onChange={(e) => updateForm({ zipCode: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">
                  State
                  <select
                    className="form-control select"
                    id="state"
                    value={selectedState}
                    onChange={statevalueChange}
                  >
                    {statevalues.map((stateval) => (
                      <option value={stateval.value}>{stateval.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div
                className="form-group"
                style={{ float: 'left', textAlign: 'left' , paddingTop: '10px' }}
              >
                <input value="Add" type="submit" className="btn btn-success" />
              </div>
            </div>
          </div>       
      </form>
      </div>
      </div>
      

    </div>
  )
}

export default CreateClient
