import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
// import Button from "@material-ui/core/Button";
import { ReactToPrint } from 'react-to-print'
import { Button } from 'react-bootstrap'

class PatientDetails extends React.Component {
  // const PatientDetails = (props) => {
  render() {
    return (
      // <h5 className='patientDetailsTitle' >Patient Visit Details</h5>
      <div className="patientDetails">
        <div className="patientDetailsDemographics">
          {' '}
          <div>
            <h6>Patient Name </h6>
            {this.visit.firstName} {this.visit.middleName}{' '}
            {this.visit.lastName}
          </div>{' '}
          <div>
            <h6>Email</h6>
            {this.visit.email}
          </div>
        </div>
        <div className="patientDetailsDemographics">
          {' '}
          <div>
            <h6>Appointment Date & Time </h6>
            {this.visit.visitDate} {this.visit.hourOfVisit}
          </div>
          <div>
            <h6>Provider</h6>
            {this.visit.provider}
          </div>
          {/* <div>
        button is placed at the bottom
          <button className="btn btn-info printDetails" onClick={handlePrint}>Print</button>
        </div> */}
        </div>
        <div className="patientDetailsDemographics"></div>
      </div>
    )
  }
}

function UpdateVisitInfo(props) {
  let componentRef = useRef()

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
    return <PatientDetails visit={visit} key={visit._id} />
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
        <div>
          <h5 className="patientDetailsTitle">Patient Visit Details</h5>
          {patientDetailsInfo()}
        </div>
        {/* <div>
          <button className="btn btn-info printDetails" >Print</button>
        </div> */}
        <div>
          {/* button to trigger printing of target component */}
          <ReactToPrint
            trigger={() => <Button>Print this out!</Button>}
            content={() => componentRef}
          />

          {/* component to be printed */}
          <PatientDetails ref={(el) => (componentRef = el)} />
        </div>

        {/* <PatientDetails visit={visit} key={visit._id} /> */}

        {/* <div className='patientDetails' >
          <div className='patientDetailsDemographics'  >
            {' '}
            <div>
              <h6>Patient Name </h6>
              {visit.firstName} {visit.middleName} {visit.lastName}
            </div>{' '}
            <div>
              <h6>Email</h6>
              {visit.email}
            </div>
          </div>
          <div className='patientDetailsDemographics'>
            {' '}
            <div>
              <h6>Appointment Date & Time </h6>
              {visit.visitDate} {visit.hourOfVisit}
            </div>
            <div>
              <h6>Provider</h6>
              {visit.provider}
            </div>
            <div>
              <button className="btn btn-info printDetails">Print</button>
            </div>
          </div>
          <div className='patientDetailsDemographics' >

          </div>
        </div> */}

        {/* form below is not being displayed */}
        <div className="item3A" style={{ display: 'none' }}>
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
                      readOnly
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
                      readOnly
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
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hourOfVisit">Appointment Time</label>
                    <input
                      name="hourOfVisit"
                      className="form-control"
                      value={visit.hourOfVisit}
                      onChange={onChange}
                      readOnly
                    />
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
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addedDate">Date Created</label>
                  <input
                    name="addedDate"
                    className="form-control"
                    value={visit.addedDate}
                    onChange={onChange}
                    readOnly
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
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="provider">Provider</label>
                  <input
                    type="string"
                    name="provider"
                    className="form-control"
                    value={visit.provider}
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
                  {/* <input
                    value="Update"
                    type="submit"
                    className="btn btn-success"
                                  /> */}
                  <input value="Print" type="submit" className="btn btn-info" />
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
