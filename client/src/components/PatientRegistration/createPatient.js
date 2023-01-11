import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
    setRecord({ ...record, [e.target.name]: e.target.value })
  }

  console.log(record.firstName)

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/records', record)
      .then((res) => {
        setRecord({
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

        // Push to /
        navigate('/patientlist')
      })
      .catch((err) => {
        console.log('Error in CreateRecord!')
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
  
  console.log(racevalue)
    //Gender
    const gendervalues = Gender
    const [gendervalue, setgenderValue] = React.useState('')
  
    const gendervalueChange = (event) => {
      setgenderValue(event.target.value)
      onChange({ gendervalue })
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
        <form novalidate onSubmit={onSubmit}>   
          <div className="form-grid-container">
            <div className="div-items">
              <div className="forms-group">
                <div className="form-group">
                  <label htmlFor="firstName">Firstname </label>
                  <input
                    type="text"
                    className="form-control"
                      id="firstName"
                      // value={record.firstName}
                    defaultValue={record.firstName}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middlename</label>
                  <input
                    type="text"
                    id="middleName"
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
                    id="lastName"
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
                    id="dateOfBirth"
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
                      id="gender"
                      value={gendervalue}
                        onChange={gendervalueChange}
                      // onChange={onChange}
                        
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
                      onChange={onChange}
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
                  defaultValue={record.medicalRecordNumber}
                  readOnly
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="visitNumber">Visit Number </label>
                <input
                  type="number"
                  className="form-control"
                  id="visitNumber"
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
                    id="language"
                    // value={selectedLanguage}
                    // onChange={languagevalueChange}
                  >
                    {/* {languagevalues.map((languageval) => (
                      <option value={languageval.value}>
                        {languageval.label}
                      </option>
                    ))} */}
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
                  value={record.age}
                  readOnly
                  onChange={onChange}
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
                  value={record.address}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  className="form-control"
                  value={record.city}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="number"
                  id="zipCode"
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
                    id="state"
                    // value={selectedState}
                    // onChange={statevalueChange}
                  >
                    {/* {statevalues.map((stateval) => (
                      <option value={stateval.value}>{stateval.name}</option>
                    ))} */}
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

export default CreateRecord
