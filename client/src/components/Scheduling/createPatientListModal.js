import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import {
Hour
} from '../listDictionaries/listData/listDictionariesData'

const CreateVisit = (props) => {
  const [record, setRecord] = useState({
    medicalRecordNumber:'',
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

  console.log('record', record)
  const { id } = useParams()
  // const navigate = useNavigate()

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

  // Define the state with useState hook
  const navigate = useNavigate()
  const [visit, setVisit] = useState({
    firstName: props.firstName,
    lastName: '',
    middleName: '',
    visitDate: props.visitDate,
    hourOfVisit: '',
    email: '',
    provider: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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
  const [userMD, setUserMD] = useState([])
  const attendings = userMD//.filter((user) => user.role === 'Attending')
  
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

    axios
      .post('http://localhost:8081/api/visits', visit)
      .then((res) => {
        setVisit({
          firstName: '',
          lastName: '',
          middleName: '',
          visitDate: '',
          hourOfVisit: '',
          email: '',
          provider: '',
          addedDate: '',
        })

        // Push to /
        navigate(-1)
      })
      .catch((err) => {
        console.log('Error in CreateVisit!')
      })
  }

 
  return (
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
                // defaultValue={visit.firstName}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middlename</label>
              <input
                type="text"
                name="middleName"
                value={visit.middleName}
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
                value={visit.lastName}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
                    <label htmlFor="hourOfVisit">
                      Gender
                      <select
                        className="form-control select"
                        name="hourOfVisit"
                        value={visit.hourOfVisit}
                        onChange={onChange}
                      >
                        {hourValues.map((hourval) => (
                          <option value={hourval.value}>
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={visit.email}
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
              type="text"
              className="form-control"
              name="provider"
              value={visit.provider}
              onChange={onChange}
            >    
              {attendings.map((doc) => (
                <option key={doc.name} value={doc.name}>{doc.firstName} {doc.lastName}</option>
                
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
            <input value="Add" type="submit" className="btn btn-success" />
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateVisit
