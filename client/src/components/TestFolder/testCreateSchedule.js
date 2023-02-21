import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Schedule from './schedulesList'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Hour } from '../listDictionaries/listData/listDictionariesData'

const CreateSchedule = (props) => {
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
  const hourValues = Hour
  const [hourvalue, sethourValue] = useState('')

  const hourvalueChange = (event) => {
    sethourValue(event.target.value)
  }

  const navigate = useNavigate()
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

  // const providerMDSelected = schedule.provider
  // const attendingsID = userMD.find((md) => md.name === providerMDSelected)
  // const providerMDSelectedID = userMD.filter((user) => {
  //   return user.toString().toLowerCase().includes(providerMDSelected)
  // })

  // const { _id, name } = attendingsID
  // const providersID = _id
  // console.log(_id, name)
  // console.log(providersID)
  // console.log(attendingsID)

  // const [selectedMD, setSelectedMD] = useState('')

  const onChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value })
    // setSelectedMD(schedule.provider.name)
  }

  const providerSelected = attendings.find((user) => user.name === schedule.provider )
  // console.log(providerSelected)
  // const { _id, name } = providerSelected
  const [scheduleMon, setScheduleDay1] = useState('0')
  const [scheduleTues, setScheduleDay2] = useState('0')
  const [scheduleWed, setScheduleDay3] = useState('0')
  const [scheduleThurs, setScheduleDay4] = useState('0')
  const [scheduleFri, setScheduleDay5] = useState('0')
  // console.log(schedule.startDate)
  // console.log(providerSelected._id)

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      provider: schedule.provider,
      providerID: providerSelected._id,
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
      addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }

    axios
      .post('http://localhost:8081/api/schedules', data)
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
          scheduledMon: '',
          scheduledTues: '',
          scheduledWed: '',
          scheduledThurs: '',
          scheduledFri: '',
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        })

        // Push to /
        navigate('/testPage')
      })
      .catch((err) => {
        console.log('Error in CreateSchedule!')
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
        <h5 className="createPageHeader">Create Schedule</h5>
        <div className="item3A">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-container">
              <div className="form-group">
                <div>
                  <label style={{display: 'none'}} >
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
                      onClick={() => setScheduleDay1('1')}
                      name="scheduledDays"
                      value={schedule.scheduledMon}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay2('2')}
                      name="scheduledDays"
                      value={schedule.scheduledTues}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Wednesdays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay3('3')}
                      name="scheduledDays"
                      value={schedule.scheduledWed}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Thursdays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay4('4')}
                      name="scheduledDays"
                      value={schedule.scheduledThurs}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Fridays
                    <input
                      type="checkbox"
                      onClick={() => setScheduleDay5('5')}
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
              <div className="form-group updateRegistrationGrp">
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
                    value="Add"
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

export default CreateSchedule
