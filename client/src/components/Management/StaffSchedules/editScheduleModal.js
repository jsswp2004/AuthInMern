import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
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

  const hourValues = Hour

  const [schedule, setSchedule] = useState(
    {
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
      addedDate: format(new Date(), 'yyyy-MM-dd'),
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }
  )


  const DrID = props.providerID
  console.log('DrID', DrID)
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/schedules/${DrID}`)
      .then((res) => {
        setSchedule({
          providerID: res.data.providerID,
          provider: res.data.provider,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          amStartTime: res.data.amStartTime,
          amEndTime: res.data.amEndTime,
          pmStartTime: res.data.pmStartTime,
          pmEndTime: res.data.pmEndTime,
          scheduledMon: res.data.scheduledMon,
          scheduledTues: res.data.scheduledTues,
          scheduledWed: res.data.scheduledWed,
          scheduledThurs: res.data.scheduledThurs,
          scheduledFri: res.data.scheduledFri,
          addedDate: res.data.addedDate,
          lastUpdated: res.data.lastUpdated,
        })
        // setSchedule(res.data)
      })
      .catch((err) => {
        console.log('Error from EditSchedule')
      })
  }, [DrID])

  const { scheduledMon, scheduledTues, scheduledWed, scheduledThurs, scheduledFri } = schedule
  //tracking previou value using useRef
  const prevScheduledMon = useRef()
  const prevScheduledTues = useRef()
  const prevScheduledWed = useRef()
  const prevScheduledThurs = useRef()
  const prevScheduledFri = useRef()


  useEffect(() => {
    prevScheduledMon.current = scheduledMon
    prevScheduledTues.current = scheduledTues
    prevScheduledWed.current = scheduledWed
    prevScheduledThurs.current = scheduledThurs
    prevScheduledFri.current = scheduledFri
  }, [scheduledMon, scheduledTues, scheduledWed, scheduledThurs, scheduledFri])
  // const [scheduleMon, setScheduleDay1] = useState(' ')
  // const [scheduleTues, setScheduleDay2] = useState(' ')
  // const [scheduleWed, setScheduleDay3] = useState(' ')
  // const [scheduleThurs, setScheduleDay4] = useState(' ')
  // const [scheduleFri, setScheduleDay5] = useState(' ')
  console.log('scheduledMon', scheduledMon)
  const [scheduledMon1, setScheduleDay1] = useState(scheduledMon)
  const [scheduledTues1, setScheduleDay2] = useState(scheduledTues)
  const [scheduledWed1, setScheduleDay3] = useState(scheduledWed)
  const [scheduledThurs1, setScheduleDay4] = useState(scheduledThurs)
  const [scheduledFri1, setScheduleDay5] = useState(scheduledFri)

  const [isMondayChecked, setIsMondayChecked] = useState('')
  const [isTuesdayChecked, setIsTuesdayChecked] = useState('')
  const [isWednesdayChecked, setIsWednesdayChecked] = useState('')
  const [isThursdayChecked, setIsThursdayChecked] = useState('')
  const [isFridayChecked, setIsFridayChecked] = useState('')








  function toggleMonday() {
    scheduledMon === 'Mon' ? setScheduleDay1('') : setScheduleDay1('Mon')
    setIsMondayChecked(!isMondayChecked)

  }

  function toggleTuesday() {
    scheduledTues === 'Tue' ? setScheduleDay2('') : setScheduleDay2('Tue')
    setIsTuesdayChecked(!isTuesdayChecked)
  }
  function toggleWednesday() {
    scheduledWed === 'Wed' ? setScheduleDay3('') : setScheduleDay3('Wed')
    setIsWednesdayChecked(!isWednesdayChecked)
  }
  function toggleThursday() {
    scheduledThurs === 'Thurs' ? setScheduleDay4('') : setScheduleDay4('Thurs')
    setIsThursdayChecked(!isThursdayChecked)
  }
  function toggleFriday() {
    scheduledFri === 'Fri' ? setScheduleDay5('') : setScheduleDay5('Fri')
    setIsFridayChecked(!isFridayChecked)
  }

  const onChange = (e) => {
    // setSchedule({ ...schedule, [e.target.name]: e.target.value })
    setSchedule({
      providerID: schedule.providerID,
      provider: schedule.provider,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      amStartTime: schedule.amStartTime,
      amEndTime: schedule.amEndTime,
      pmStartTime: schedule.pmStartTime,
      pmEndTime: schedule.pmEndTime,
      // scheduledMon: scheduledMon1,
      // scheduledTues: scheduledTues1,
      // scheduledWed: scheduledWed1,
      // scheduledThurs: scheduledThurs1,
      // scheduledFri: scheduledFri1,
      addedDate: schedule.addedDate,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
      [e.target.name]: e.target.value,

    })

  }
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      providerID: props.providerID,
      provider: schedule.provider,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      amStartTime: schedule.amStartTime,
      amEndTime: schedule.amEndTime,
      pmStartTime: schedule.pmStartTime,
      pmEndTime: schedule.pmEndTime,
      scheduledMon: isMondayChecked ? scheduledMon1 : scheduledMon,
      scheduledTues: isTuesdayChecked ? scheduledTues1 : scheduledTues,
      scheduledWed: isWednesdayChecked ? scheduledWed1 : scheduledWed,
      scheduledThurs: isThursdayChecked ? scheduledThurs1 : scheduledThurs,
      scheduledFri: isFridayChecked ? scheduledFri1 : scheduledFri,
      addedDate: schedule.addedDate,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }

    axios
      .put(`http://localhost:8081/api/schedules/${props.providerID}`, data)
      .then((res) => {
        // Push to      
        window.location.reload()
        window.location.close()

      })
      .catch((err) => {
        console.log('Error in EditSchedule!')
      })
  }
  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="createRoleModalBody">
          <form noValidate onSubmit={onSubmit} className='formModal'>
            <div
              className="form-grid-containers"
              style={{ display: 'flex', columnGap: '10px' }}
            >
              <div >
                <div className="form-group">
                  <div>
                    <label style={{ display: 'none' }}>
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
                    {/* <label><b>Scheduled Days:</b></label>
                  <br />
                  <span>{schedule.scheduledMon}{' '}{schedule.scheduledTues}{' '}{schedule.scheduledWed}{' '}{schedule.scheduledThurs}{' '}{schedule.scheduledFri}</span>
                  <br /> */}
                    <div className="form-group">
                      <label><b>Change to:</b></label>
                      <br />
                    </div>
                    <div className="form-group">
                      <label className="scheduleCheckboxContainer">
                        Mondays
                        <input
                          Checked={scheduledMon === 'Mon' ? 'true' : 'false'}
                          id='Mon'
                          type="checkbox"
                          onClick={toggleMonday}
                          // onClick={() => setScheduleDay1('Mon')}
                          name="Mon"
                          value={schedule.scheduledMon}
                        />
                        <span className="scheduleCheckboxCheckmark"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="scheduleCheckboxContainer">
                        Tuesdays
                        <input
                          Checked={scheduledTues === 'Tue' ? 'true' : 'false'}
                          id='Tue'
                          type="checkbox"
                          onClick={toggleTuesday}
                          // onClick={() => { setScheduleDay2('Tue') }}
                          name="Tue"
                          value={schedule.scheduledTues}
                        />
                        <span className="scheduleCheckboxCheckmark"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="scheduleCheckboxContainer">
                        Wednesdays

                        <input
                          Checked={scheduledWed === 'Wed' ? 'true' : 'false'}
                          id='Wed'
                          type="checkbox"
                          onClick={toggleWednesday}
                          // onClick={() => setScheduleDay3('Wed')}
                          name="Wed"
                          value={schedule.scheduledWed}
                        />
                        <span className="scheduleCheckboxCheckmark"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="scheduleCheckboxContainer">
                        Thursdays
                        <input
                          Checked={scheduledThurs === 'Thurs' ? 'true' : 'false'}
                          id='Thu'
                          type="checkbox"
                          onClick={toggleThursday}
                          // onClick={() => setScheduleDay4('Thu')}
                          name="Thu"
                          value={schedule.scheduledThurs}
                        />
                        <span className="scheduleCheckboxCheckmark"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="scheduleCheckboxContainer">
                        Fridays
                        <input
                          Checked={scheduledFri === 'Fri' ? 'true' : 'false'}
                          id='Fri'
                          type="checkbox"
                          onClick={toggleFriday}
                          // onClick={() => setScheduleDay5('Fri')}
                          name="Fri"
                          value={schedule.scheduledFri}
                        />
                        <span className="scheduleCheckboxCheckmark"></span>
                      </label>
                    </div>
                  </div>
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
                  <label style={{ marginLeft: '2px' }}>
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
                  <label htmlFor="lastUpdated">
                    Last Updated
                    <input
                      type="date"
                      className="form-control scheduleInput"
                      name="lastUpdated"
                      value={schedule.lastUpdated}
                      onChange={onChange}
                    />

                  </label>
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
