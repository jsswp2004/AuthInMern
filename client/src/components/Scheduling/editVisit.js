import React, { useState, useEffect } from 'react'
import { Link, Button} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Hour } from '../listDictionaries/listData/listDictionariesData'
import CreatePatientFromVisit from '../PatientRegistration/createPatientFromVisit'

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
  })

  const { id } = useParams()
  const navigate = useNavigate()

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
          email: res.data.email,
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), //res.data.addedDate,
          visitDate: res.data.visitDate,
          hourOfVisit: res.data.hourOfVisit,
          provider: res.data.provider,
        })
      })
      .catch((err) => {
        console.log('Error from UpdateVisitInfo')
      })
  }, [id])

  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

  const [data, setData] = useState([])
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      medicalRecordNumber: visit.medicalRecordNumber,
      visitNumber: visit.visitNumber,
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      email: visit.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      provider: visit.provider,
    }

    setData(data)

    axios
      .put(`http://localhost:8081/api/visits/${id}`, data)
      .then((res) => {
        navigate(`/clinicVisit`)
      })
      .catch((err) => {
        console.log('Error in UpdateVisitInfo!')
      })
  }

  const createFromVisit = () =>
  {
    return (<CreatePatientFromVisit data={data} />
    )
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
        <h5 className="createPageHeader">Edit Visit</h5>
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
                    type="string"
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
              </div>
              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="medicalRecordNumber">MRN</label>
                  <input
                    placeholder="Please register client"
                    type="text"
                    name="medicalRecordNumber"
                    className="form-control"
                    value={visit.medicalRecordNumber}
                    onChange={onChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="visitNumber">Visit ID</label>
                  <input
                    placeholder="Please register client"
                    type="text"
                    name="visitNumber"
                    className="form-control"
                    value={visit.visitNumber}
                    onChange={onChange}
                    readOnly
                  />
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
                    value="Update"
                    type="submit"
                    className="btn btn-success btn-sm"
                  />
                  <Link
                    className="btn btn-info btn-sm"
                    to={`/createPatientFromVisit/${visit._id}`}
                    // data={data}
                    firstName={data.firstName}
                    
                  >
                    <i
                      className="fa fa-hospital-o fa-sm"
                      aria-hidden="true"
                      title="Edit registration"
                    />
                  </Link>{' '}
                  <button onClick={createFromVisit} className="btn btn-info btn-sm" >
                  test
                  </button>
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
