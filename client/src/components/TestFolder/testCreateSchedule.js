import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Schedule from './schedulesList'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Checkbox } from '@mui/material'

const CreateSchedule = (props) => {
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState({
    providerID: '',
    firstName: '',
    lastName: '',
    startDate: '',
    endDate: '',
    amStartTime: '',
    amEndTime: '',
    pmStartTime: '',
    pmEndTime: '',
    scheduled: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value })
  }

  //   console.log(schedule)
  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/schedules', schedule)
      .then((res) => {
        setSchedule({
          providerID: '',
          firstName: '',
          lastName: '',
          startDate: '',
          endDate: '',
          amStartTime: '',
          amEndTime: '',
          pmStartTime: '',
          pmEndTime: '',
          scheduled: '',
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        })

        // Push to /
        navigate('/testPage')
      })
      .catch((err) => {
        console.log('Error in CreateSchedule!')
      })
  }
  // console.log(schedule)

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h5 className="createPageHeader">Create Schedule</h5>
        <div className="item3A">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-container">
              <div className="form-group">
                <label htmlFor="firstName">
                  Firstname
                  <input
                    type="text"
                    className="form-control scheduleInput"
                    name="firstName"
                    value={schedule.firstName}
                    onChange={onChange}
                  />
                </label>
                <label htmlFor="lastName">
                  Lastname
                  <input
                    type="text"
                    className="form-control scheduleInput"
                    name="lastName"
                    value={schedule.lastName}
                    onChange={onChange}
                  />
                </label>
                <label htmlFor="name">
                  Scheduled days
                  <Checkbox
                    type="checkbox"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.scheduled}
                    onChange={onChange}
                    title="Mon"
                  />
                  <Checkbox
                    type="checkbox"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.scheduled}
                    onChange={onChange}
                    title="Mon"
                  />
                  <Checkbox
                    type="checkbox"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.scheduled}
                    onChange={onChange}
                    title="Mon"
                  />
                  <Checkbox
                    type="checkbox"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.scheduled}
                    onChange={onChange}
                    title="Mon"
                  />
                  <Checkbox
                    type="checkbox"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.scheduled}
                    onChange={onChange}
                    title="Mon"
                  />
                </label>
              </div>
              <div className="form-group">
                <div>
                  <label htmlFor="name">
                    Start Date
                    <input
                      type="date"
                      className="form-control scheduleInput"
                      name="name"
                      value={schedule.firstName}
                      onChange={onChange}
                    />
                    End Date
                    <input
                      type="date"
                      className="form-control scheduleInput"
                      name="name"
                      value={schedule.firstName}
                      onChange={onChange}
                    />
                  </label>
                </div>
                <label htmlFor="name">
                  AM Start Time
                  <input
                    type="text"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.firstName}
                    onChange={onChange}
                  />
                  AM End Time
                  <input
                    type="text"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.firstName}
                    onChange={onChange}
                  />
                </label>
                <label htmlFor="name">
                  PM Start Time
                  <input
                    type="text"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.firstName}
                    onChange={onChange}
                  />
                  PM End Time
                  <input
                    type="text"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.firstName}
                    onChange={onChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  Date Created
                  <input
                    type="date"
                    className="form-control scheduleInput"
                    name="name"
                    value={schedule.firstName}
                    onChange={onChange}
                  />
                  <input
                    value="Add"
                    type="submit"
                    className="btn btn-success"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateSchedule
