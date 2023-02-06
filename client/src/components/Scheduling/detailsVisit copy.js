import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import PatientDetail from './PatientDetails'

const PatientDetails = (props) => {
  return (    
    <div className="patientDetails">
      <div className="patientDetailsDemographics">
        {' '}
        <div>
          <h6>Patient Name </h6>
          {props.visit.firstName} {props.visit.middleName}{' '}
          {props.visit.lastName}
        </div>{' '}
        <div>
          <h6>Email</h6>
          {props.visit.email}
        </div>
      </div>
      <div className="patientDetailsDemographics">
        {' '}
        <div>
          <h6>Appointment Date & Time </h6>
          {props.visit.visitDate} {props.visit.hourOfVisit}
        </div>
        <div>
          <h6>Provider</h6>
          {props.visit.provider}
        </div>
      </div>
      <div className="patientDetailsDemographics"></div>
    </div>
  )
}

function UpdateVisitInfo(props) {
  const [visit, setVisit] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          email: res.data.email,
          addedDate: res.data.addedDate,
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

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      firstName: visit.firstName,
      lastName: visit.lastName,
      middleName: visit.middleName,
      email: visit.email,
      addedDate: visit.addedDate,
      visitDate: visit.visitDate,
      hourOfVisit: visit.hourOfVisit,
      provider: visit.provider,
    }

    axios
      .put(`http://localhost:8081/api/visits/${id}`, data)
      .then((res) => {
        navigate(`/calendarSchedule`)
      })
      .catch((err) => {
        console.log('Error in UpdateVisitInfo!')
      })
  }

  function patientDetailsInfo() {
    return (
      // <React.forwardRef>

      <PatientDetails visit={visit} key={visit._id} />

      // </React.forwardRef>
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
        <div className="App">
          <PatientDetail visit={visit} key={visit._id} />
        </div>
      </div>
    </div>
  )
}

export default UpdateVisitInfo
