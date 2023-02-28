import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
import { Hour } from '../../listDictionaries/listData/listDictionariesData'

function EditSchedule(props) {
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

  const { id } = useParams()
  // console.log(id)
  const navigate = useNavigate()
  const hourValues = Hour
  const [hourvalue, sethourValue] = useState('')

  const hourvalueChange = (event) => {
    sethourValue(event.target.value)
  }
  const [schedule, setSchedule] = useState({
    providerID: '',
    provider: 'Select Doctor',
    startDate: '',
    endDate: '',
    amStartTime: '',
    amEndTime: '',
    pmStartTime: '',
    pmEndTime: '',
    scheduledMon: '',
    scheduledTues: '',
    scheduledWed: '',
    scheduledThurs: '',
    scheduledFri: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })



  const providerSelected = attendings.find(
    (user) => user.name === schedule.provider,
  )

  const [scheduleMon, setScheduleDay1] = useState(' ')
  const [scheduleTues, setScheduleDay2] = useState(' ')
  const [scheduleWed, setScheduleDay3] = useState(' ')
  const [scheduleThurs, setScheduleDay4] = useState(' ')
  const [scheduleFri, setScheduleDay5] = useState(' ')



  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/schedules/${id}`)
      .then((res) => {
        setSchedule({
          providerID: res.data._id,
          provider: res.data.provider,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          amStartTime: res.data.amStartTime,
          amEndTime: res.data.amEndTime,
          pmStartTime: res.data.pmStartTime,
          pmEndTime: res.data.pmEndTime,
          scheduledMon: res.data.scheduleMon,
          scheduledTues: res.data.scheduleTues,
          scheduledWed: res.data.scheduleWed,
          scheduledThurs: res.data.scheduleThurs,
          scheduledFri: res.data.scheduledFri,
          // addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from EditSchedule')
      })
  }, [id])
  // const onChange = (e) => {
  //   setSchedule({ ...schedule, [e.target.name]: e.target.value })
  // }
  const onChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value })
    // setSelectedMD(schedule.provider.name)
  }

  const [data, setData] = useState([])
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      providerID: providerSelected._id,
          provider: schedule.provider,
          startDate: schedule.startDate,
          endDate: schedule.endDate,
          amStartTime: schedule.amStartTime,
          amEndTime: schedule.amEndTime,
          pmStartTime: schedule.pmStartTime,
          pmEndTime: schedule.pmEndTime,
          scheduledMon: scheduleMon,
          scheduledTues: scheduleTues,
          scheduledWed: scheduleWed,
          scheduledThurs: scheduleThurs,
          scheduledFri: scheduleFri,
          addedDate: schedule.addedDate,
    }
    setData(data)
    axios
      .put(`http://localhost:8081/api/schedules/${id}`, data)
      .then((res) => {
        // Push to /
        navigate('/settingsPage')
      })
      .catch((err) => {
        console.log('Error in EditSchedule!')
      })
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
      <h4 className="createPageHeader">Edit Schedule</h4>
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div
              className="form-grid-containers"
              style={{ display: 'flex', columnGap: '10px' }}
            >
              <div className="form-group">
                <div>
                  <label style={{ display: 'none' }}>
                    {/* style={{display: 'none'}} */}
                    Provider ID
                    <input
                      type="text"
                      className="form-control scheduleInput"
                      name="providerID"
                      value={schedule.providerID}
                      onChange={onChange}
                    />
                  </label>
                  <label htmlFor="provider">
                    Provider
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
                        <option key={doc._id} value={doc.name}>
                          {doc}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <label>Scheduled Days:</label>
                  <label className="scheduleCheckboxContainer">
                    Mondays
                    <input
                      type="checkbox"
                      // checked='checked'
                      onClick={() => setScheduleDay1('Mon')}
                      name="scheduledDays"
                      value={schedule.scheduledMon}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay2('Tue')}
                      name="scheduledDays"
                      value={schedule.scheduledTues}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Wednesdays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay3('Wed')}
                      name="scheduledDays"
                      value={schedule.scheduledWed}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Thursdays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay4('Thur')}
                      name="scheduledDays"
                      value={schedule.scheduledThurs}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Fridays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay5('Fri')}
                      name="scheduledDays"
                      value={schedule.scheduledFri}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <label htmlFor="startDate">
                    Start Date
                    <input
                      type="date"
                      className="form-control scheduleInput"
                      name="startDate"
                      value={schedule.startDate}
                      onChange={onChange}
                    />
                  </label>
                  <label>
                    End Date
                    <input
                      type="date"
                      className="form-control scheduleInput"
                      name="endDate"
                      value={schedule.endDate}
                      onChange={onChange}
                    />
                  </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <label htmlFor="amStartTime">
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
                  </label>
                  <label htmlFor="amEndTime" style={{ marginLeft: '2px' }}>
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
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <label htmlFor="pmStartTime">
                    PM Start Time
                    <select
                      key={schedule.pmStartTime._id}
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
                  </label>
                  <label htmlFor="pmEndTime" style={{ marginLeft: '2px' }}>
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
              </div>
              <div className="form-group updateRegistrationGrp ">
                <label htmlFor="addedDate">
                  Date Created
                  <input
                    type="date"
                    className="form-control scheduleInput"
                    name="addedDate"
                    value={schedule.addedDate}
                    onChange={onChange}
                  />
                  <input
                    value="Update"
                    type="submit"
                    className="btn btn-success updateRegistrationBtn"
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

export default EditSchedule
