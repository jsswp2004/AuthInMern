import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Schedule from './schedulesList'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Checkbox } from '@mui/material'
import { Hour } from '../listDictionaries/listData/listDictionariesData'

const CreateSchedule = (props) => {
  const hourValues = Hour
  const [hourvalue, sethourValue] = useState('')

  const hourvalueChange = (event) => {
    sethourValue(event.target.value)
    // onChange({ gendervalue })
  }

  const navigate = useNavigate()
  const [schedule, setSchedule] = useState({
    providerID: '',
    provider: '',
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
          provider: '',
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
  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })
  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        setUserMD(response.data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

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
                <label htmlFor="provider">Provider</label>
                <select
                  key={schedule.provider}
                  className="form-control select"
                  name="provider"
                  value={schedule.provider}
                  onChange={onChange}
                >
                  {' '}
                  <option key="0" value="Select Provider">
                    Select Provider
                  </option>
                  {providerMD.map((doc) => (
                    <option key={doc.value} value={doc.value}>
                      {doc}
                    </option>
                  ))}
                </select>
                {/* <label htmlFor="firstName">
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
                </label> */}
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
                  <select
                        key={schedule.hourOfVisit}
                        className="form-control select"
                        name="amStartTime"
                        value={schedule.amStartTime}
                        onChange={onChange}
                      >
                        {hourValues.map((hourval) => (
                          <option key={hourval.value} value={hourval.value}>
                            {hourval.label}
                          </option>
                        ))}
                      </select>
                  AM End Time
                  <select
                        key={schedule.hourOfVisit}
                        className="form-control select"
                        name="amEndTime"
                        value={schedule.amEndTime}
                        onChange={onChange}
                      >
                        {hourValues.map((hourval) => (
                          <option key={hourval.value} value={hourval.value}>
                            {hourval.label}
                          </option>
                        ))}
                      </select>
                </label>
                <label htmlFor="name">
                  PM Start Time
                  <select
                        key={schedule.hourOfVisit}
                        className="form-control select"
                        name="pmStartTime"
                        value={schedule.pmStartTime}
                        onChange={onChange}
                      >
                        {hourValues.map((hourval) => (
                          <option key={hourval.value} value={hourval.value}>
                            {hourval.label}
                          </option>
                        ))}
                      </select>
                  PM End Time
                  <select
                        key={schedule.hourOfVisit}
                        className="form-control select"
                        name="pmEndTime"
                        value={schedule.pmEndTime}
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
