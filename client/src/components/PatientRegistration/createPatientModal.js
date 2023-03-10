import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
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
    addedDate: format(new Date(), 'yyyy-MM-dd'),
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
        console.log('Error in creating a new registration!')
      })
  }

  //Race
  const racevalues = Race
  //Gender
  const gendervalues = Gender
  //Language
  const languagevalues = Language
  //States
  const statevalues = States

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-containers" style={{ display: 'flex', columnGap: '10px' }}>
              <div className="div-items">
                <div className="forms-group">
                  <div className="form-group">
                    <label htmlFor="firstName">Firstname </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={record.firstName.toUpperCase()}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="middleName">Middlename</label>
                    <input
                      type="text"
                      name="middleName"
                      value={record.middleName.toUpperCase()}
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
                      value={record.lastName.toUpperCase()}
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
                        key={record.gender}
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
                        key={record.race}
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
                      key={record.language}
                      className="form-control select"
                      name="language"
                      value={record.language}
                      onChange={onChange}
                    >
                      {languagevalues.map((languageval) => (
                        <option key={languageval.value} value={languageval.value}>
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
              <div className="div-items updateRegistrationGrp">
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
                      key={record.state}
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

export default CreateRecord
