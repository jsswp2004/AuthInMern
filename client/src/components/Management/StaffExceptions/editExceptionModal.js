import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
import { Hour } from '../../listDictionaries/listData/listDictionariesData'


function EditException(props) {

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

  const [exception, setException] = useState(
    {
      providerID: '',
      provider: 'Select Doctor',
      startDate: '',
      endDate: '',
      amStartTime: '',
      amEndTime: '',
      pmStartTime: '',
      pmEndTime: '',
      exceptionMon: '',
      exceptionTues: '',
      exceptionWed: '',
      exceptionThurs: '',
      exceptionFri: '',
      addedDate: format(new Date(), 'yyyy-MM-dd'),
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }
  )


  const DrID = props.providerID


  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/exceptions/${DrID}`)
      .then((res) => {
        setException({
          providerID: res.data.providerID,
          provider: res.data.provider,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          amStartTime: res.data.amStartTime,
          amEndTime: res.data.amEndTime,
          pmStartTime: res.data.pmStartTime,
          pmEndTime: res.data.pmEndTime,
          exceptionMon: res.data.exceptionMon,
          exceptionTues: res.data.exceptionTues,
          exceptionWed: res.data.exceptionWed,
          exceptionThurs: res.data.exceptionThurs,
          exceptionFri: res.data.exceptionFri,
          addedDate: res.data.addedDate,
          lastUpdated: res.data.lastUpdated,
        })
      })
      .catch((err) => {
        console.log('Error from EditException')
      })
  }, [DrID])

  const { exceptionMon, exceptionTues, exceptionWed, exceptionThurs, exceptionFri } = exception
  //tracking previouys val;ue using useRef
  const prevExceptionMon = useRef()
  const prevExceptionTues = useRef()
  const prevExceptionWed = useRef()
  const prevExceptionThurs = useRef()
  const prevExceptionFri = useRef()
  useEffect(() => {
    prevExceptionMon.current = exceptionMon
    prevExceptionTues.current = exceptionTues
    prevExceptionWed.current = exceptionWed
    prevExceptionThurs.current = exceptionThurs
    prevExceptionFri.current = exceptionFri
    // console.log(prevExceptionMon.current)
    // console.log(exceptionMon)
  }, [exceptionFri, exceptionMon, exceptionThurs, exceptionTues, exceptionWed])
  // console.log('prevExceptionMon', prevExceptionMon, exception.exceptionMon)
  //end


  const [exceptionMon1, setExceptionDay1] = useState(exceptionMon)
  const [exceptionTues1, setExceptionDay2] = useState(exceptionTues)
  const [exceptionWed1, setExceptionDay3] = useState(exceptionWed)
  const [exceptionThurs1, setExceptionDay4] = useState(exceptionThurs)
  const [exceptionFri1, setExceptionDay5] = useState(exceptionFri)

  const [isMondayChecked, setIsMondayChecked] = useState('')
  const [isTuesdayChecked, setIsTuesdayChecked] = useState('')
  const [isWednesdayChecked, setIsWednesdayChecked] = useState('')
  const [isThursdayChecked, setIsThursdayChecked] = useState('')
  const [isFridayChecked, setIsFridayChecked] = useState('')


  // console.log('isMondayChecked', isMondayChecked, exceptionMon)
  // console.log('isTuesdayChecked', isTuesdayChecked, exceptionTues)
  // console.log('isWednesdayChecked', isWednesdayChecked, exceptionWed)
  // console.log('isThursdayChecked', isThursdayChecked, exceptionThurs)
  // console.log('isFridayChecked', isFridayChecked, exceptionFri)

  function toggleMonday() {
    exceptionMon === 'Mon' ? setExceptionDay1('') : setExceptionDay1('Mon')
    setIsMondayChecked(!isMondayChecked)
  }

  function toggleTuesday() {
    exceptionTues === 'Tue' ? setExceptionDay2('') : setExceptionDay2('Tue')
    setIsTuesdayChecked(!isTuesdayChecked)

  }


  function toggleWednesday() {
    exceptionWed === 'Wed' ? setExceptionDay3('') : setExceptionDay3('Wed')
    setIsWednesdayChecked(!isWednesdayChecked)
  }

  function toggleThursday() {
    exceptionThurs === 'Thurs' ? setExceptionDay4('') : setExceptionDay4('Thurs')
    setIsThursdayChecked(!isThursdayChecked)
  }

  function toggleFriday() {
    exceptionFri === 'Fri' ? setExceptionDay5('') : setExceptionDay5('Fri')
    setIsFridayChecked(!isFridayChecked)
  }

  // const onChange = (e) => {
  //   setException({ ...exception, [e.target.name]: e.target.value })
  //   // setDefaultAmStartTime(e.target.value)
  // }

  const onChange = (e) => {
    setException({
      providerID: exception.providerID,
      provider: exception.provider,
      startDate: exception.startDate,
      endDate: exception.endDate,
      amStartTime: exception.amStartTime,
      amEndTime: exception.amEndTime,
      pmStartTime: exception.pmStartTime,
      pmEndTime: exception.pmEndTime,
      // exceptionMon: exception.exceptionMon,
      // exceptionTues: exception.exceptionTues,
      // exceptionWed: exception.exceptionWed,
      // exceptionThurs: exception.exceptionThurs,
      // exceptionFri: exception.exceptionFri,
      addedDate: exception.addedDate,
      lastUpdated: exception.lastUpdated,
      [e.target.name]: e.target.value
    })

  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      providerID: props.providerID,
      provider: exception.provider,
      startDate: exception.startDate,
      endDate: exception.endDate,
      amStartTime: exception.amStartTime,
      amEndTime: exception.amEndTime,
      pmStartTime: exception.pmStartTime,
      pmEndTime: exception.pmEndTime,
      exceptionMon: isMondayChecked ? exceptionMon1 : exceptionMon,
      exceptionTues: isTuesdayChecked ? exceptionTues1 : exceptionTues,
      exceptionWed: isWednesdayChecked ? exceptionWed1 : exceptionWed,
      exceptionThurs: isThursdayChecked ? exceptionThurs1 : exceptionThurs,
      exceptionFri: isFridayChecked ? exceptionFri1 : exceptionFri,
      addedDate: exception.addedDate,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }
    // console.log(exceptionMon1 === '' ? exceptionMon : exceptionMon1)
    axios
      .put(`http://localhost:8081/api/exceptions/${props.providerID}`, data)
      .then((res) => {
        // Push to      
        window.location.reload()
        window.location.close()

      })
      .catch((err) => {
        console.log('Error in EditException!')
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
                  <label style={{ display: 'none' }}>
                    Provider ID
                    <input
                      type="text"
                      className="form-control exceptionInput"
                      name="providerID"
                      value={exception.providerID}
                      onChange={onChange}
                    />
                  </label>
                  <label htmlFor="provider">
                    Provider
                    <select
                      key={exception.provider}
                      className="form-control select"
                      name="provider"
                      value={exception.provider}
                      onChange={onChange}
                    >
                      {' '}
                      <option key="0" value="Select Provider">
                        Select Provider
                      </option>
                      {providerMD.map((doc) => (
                        <option key={doc.providerID} value={doc.name}>
                          {doc}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* <div>
                  <label><b>Exception Days:</b></label>
                  <br />
                  <span>{exception.exceptionMon}{' '}{exception.exceptionTues}{' '}{exception.exceptionWed}{' '}{exception.exceptionThurs}{' '}{exception.exceptionFri}</span>
                  <br />
                </div> */}
                <div className="form-group">
                  <label><b>Change to:</b></label>
                  <br />
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Mondays
                    <input
                      Checked={exceptionMon === 'Mon' ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleMonday}
                      name="exceptionDaysMon"
                      id="exceptionDaysMon"
                      value={exception.exceptionMon}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    <input
                      Checked={exceptionTues === 'Tue' ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleTuesday}
                      name="exceptionDaysTues"
                      id="exceptionDaysTues"
                      value={exception.exceptionTues}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Wednesdays
                    {/* <input
                      Checked={exceptionWed === 'Wed' ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleWednesday}
                      name="exceptionDaysWed"
                      value={exception.exceptionWed}
                    /> */}
                    <input
                      Checked={exceptionWed === 'Wed' ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleWednesday}
                      name="exceptionDaysWed"
                      value={exception.exceptionWed}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Thursdays
                    <input
                      Checked={exceptionThurs === 'Thurs' ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleThursday}
                      name="exceptionDaysThurs"
                      value={exception.exceptionThurs}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Fridays
                    <input
                      Checked={exceptionFri === 'Fri' ? 'true' : 'false'}
                      type="checkbox"
                      onClick={toggleFriday}
                      name="exceptionDaysFri"
                      value={exception.exceptionFri}
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
                      value={exception.startDate}
                      onChange={onChange}
                    />
                  </label>
                  <label style={{ marginLeft: '2px' }}>
                    End Date
                    <input
                      type="date"
                      className="form-control scheduleInput"
                      name="endDate"
                      value={exception.endDate}
                      onChange={onChange}
                    />
                  </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <label htmlFor="amStartTime">
                    AM Start Time
                    <select
                      key={exception.hourOfVisit}
                      className="form-control select"
                      name="amStartTime"
                      value={exception.amStartTime}
                      // value={defaultAmStartTime}
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
                      key={exception.hourOfVisit}
                      className="form-control select"
                      name="amEndTime"
                      value={exception.amEndTime}
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
                      key={exception.hourOfVisit}
                      className="form-control select"
                      name="pmStartTime"
                      value={exception.pmStartTime}
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
                      key={exception.hourOfVisit}
                      className="form-control select"
                      name="pmEndTime"
                      value={exception.pmEndTime}
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
              <div className="form-group updateRegistrationGrp" style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="addedDate">
                  Date Created
                  <input
                    type="date"
                    className="form-control scheduleInput"
                    name="addedDate"
                    value={exception.addedDate}
                    onChange={onChange}
                    readOnly
                  />
                </label>
                <label htmlFor="lastUpdated">
                  Last Updated
                  <input
                    type="date"
                    className="form-control scheduleInput"
                    name="lastUpdated"
                    value={exception.lastUpdated}
                    onChange={onChange}
                  />

                </label>
                <input
                  value="Update"
                  type="submit"
                  className="btn btn-success updateRegistrationBtn"
                />
              </div>
            </div>
          </form>



          {/* --this is a sample code for toggling (do not erase)
          <p>Test</p>
          <div>
            <button onClick={handleToggle}>Show name</button>
            {visible && <p style={{ color: 'blue' }}>Coding Beauty</p>}
            {!visible && <p style={{ color: 'red' }}>Coding Beauty</p>}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default EditException
