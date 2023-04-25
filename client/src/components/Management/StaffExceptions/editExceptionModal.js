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

  const [exception, setException] = useState({
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
  })

  // const [defaultAmStartTime, setDefaultAmStartTime] = useState('09:00')
  // const ref = useRef(null);
  // const handleClick = () => {
  //   console.log(ref.current.value);
  // };

  // console.log(exception.exceptionMon)

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
        setExceptionMondayCheckedValue(res.data.exceptionMon === 'Mon' ? true : false)
        // console.log('res.data.addedDate', res.data.addedDate)
      })
      .catch((err) => {
        console.log('Error from EditException')
      })
  }, [DrID])


  const [exceptionMon1, setExceptionDay1] = useState(' ')
  const [exceptionTues1, setExceptionDay2] = useState(' ')
  const [exceptionWed1, setExceptionDay3] = useState(' ')
  const [exceptionThurs1, setExceptionDay4] = useState(' ')
  const [exceptionFri1, setExceptionDay5] = useState(' ')



  const onChange = (e) => {
    setException({ ...exception, [e.target.name]: e.target.value })
    // setDefaultAmStartTime(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      providerID: props.providerID,
      provider: exception.provider,
      startDate: exception.startDate,
      endDate: exception.endDate,
      amStartTime: exception.amStartTime,//.length > 0 ? exception.amStartTime : '09:00',
      amEndTime: exception.amEndTime,//.length > 0 ? exception.amEndTime : '12:00',
      pmStartTime: exception.pmStartTime,//.length > 0 ? exception.pmStartTime : '13:00',
      pmEndTime: exception.pmEndTime,//.length > 0 ? exception.pmEndTime : '18:00',
      exceptionMon: exceptionMon1,
      exceptionTues: exceptionTues1,
      exceptionWed: exceptionWed1,
      exceptionThurs: exceptionThurs1,
      exceptionFri: exceptionFri1,
      addedDate: exception.addedDate,// format( new Date(), 'yyyy-MM-dd'),// 
      lastUpdated: format(new Date(), 'yyyy-MM-dd'), //exception.lastUpdated,
    }
    // console.log(exception.addedDate)
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

  //4/22/2023 this is try out code for checkbox 
  //4/24/2023 note: try to pull exception objection as a prop
  const { exceptionMon, exceptionTues, exceptionWed, exceptionThurs, exceptionFri } = exception
  // console.log(exceptionMon)
  const xxxx = exceptionMon === 'Mon' ? true : false
  // const [exceptionMonday, setExceptionMonday] = useState(exceptionMon !== null ? true : false)
  const [exceptionMonday, setExceptionMonday] = useState(xxxx)

  console.log(xxxx)
  // const [exceptionMonday, setExceptionMonday] = useState('')
  // const [checkOut, setCheckOut] = useState('')
  const [exceptionMondayCheckedValue, setExceptionMondayCheckedValue] = useState(false)
  // const [checkOutValue, setCheckOutValue] = useState(false)

  function setExceptionForMonday(e) {
    // setExceptionDay1(e.target.value)
    // setExceptionMondayCheckedValue(!exceptionMondayCheckedValue)
    setExceptionMonday(!exceptionMonday)


  }

  console.log(exceptionMonday, exceptionMondayCheckedValue)

  //End of 4/22/2023 this is try out code for checkbox


  console.log(xxxx)

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="createRoleModalBody">
          <form noValidate onSubmit={onSubmit} className='formModal'>
            <div
              className="form-grid-containers"
              style={{ display: 'flex', columnGap: '10px' }}
            >
              <div className="form-group">
                <div>
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
                <div>
                  <label><b>Exception Days:</b></label>
                  <br />
                  <span>{exception.exceptionMon}{' '}{exception.exceptionTues}{' '}{exception.exceptionWed}{' '}{exception.exceptionThurs}{' '}{exception.exceptionFri}</span>
                  <br />
                  <label><b>Change to:</b></label>
                  <br />
                  <label className="scheduleCheckboxContainer">
                    Mondays
                    <input
                      type="checkbox"
                      // onClick={() => setExceptionDay1('Mon')}
                      // onClick={() => setExceptionDay1('Mon')}

                      onChange={() => setExceptionMonday(!exceptionMonday)}
                      // onClick={() => setExceptionMonday(!exceptionMonday)}

                      checked={exceptionMonday}
                      // onClick={() => setExceptionForMonday()}
                      name="exceptionDays"
                      value={exceptionMondayCheckedValue === true ? 'Mon' : exception.exceptionMon}
                    // checked
                    // checked={exceptionMonday}
                    // checked={exceptionMon === 'Mon' ? true : false}
                    // defaultChecked={exceptionMon === 'Mon' ? true : exceptionMonday}
                    // defaultChecked={xxxx}


                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay2('Tue')}
                      name="exceptionDays"
                      value={exception.exceptionTues}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Wednesdays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay3('Wed')}
                      name="exceptionDays"
                      value={exception.exceptionWed}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Thursdays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay4('Thu')}
                      name="exceptionDays"
                      value={exception.exceptionThurs}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Fridays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay5('Fri')}
                      name="exceptionDays"
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
        </div>
      </div>
    </div>
  )
}

export default EditException
