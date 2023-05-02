import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
import { Hour } from '../../listDictionaries/listData/listDictionariesData'
import { is } from 'date-fns/locale'

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
        // setExceptionMondayCheckedValue(res.data.exceptionMon === 'Mon' ? true : false)
        // console.log('res.data.addedDate', res.data.addedDate)
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
  console.log('prevExceptionMon', prevExceptionMon, exception.exceptionMon)
  //end


  const [exceptionMon1, setExceptionDay1] = useState(exceptionMon)
  const [exceptionTues1, setExceptionDay2] = useState(exceptionTues)
  const [exceptionWed1, setExceptionDay3] = useState(exceptionWed)
  const [exceptionThurs1, setExceptionDay4] = useState(exceptionThurs)
  const [exceptionFri1, setExceptionDay5] = useState(exceptionFri)

  const [isMondayChecked, setIsMondayChecked] = useState('')
  useEffect(() => {
    setIsMondayChecked(exceptionMon === 'Mon' ? 'true' : 'false')
  }, [exceptionMon])

  // const isMondayChecked = exceptionMon === 'Mon' ? 'true' : 'false'
  const isTuesdayChecked = exceptionTues === 'Tue' ? 'true' : 'false'
  const isWednesdayChecked = exceptionWed === 'Wed' ? 'true' : 'false'
  const isThursdayChecked = exceptionThurs === 'Thurs' ? 'true' : 'false'
  const isFridayChecked = exceptionFri === 'Fri' ? 'true' : 'false'

  console.log('isMondayChecked', isMondayChecked, exceptionMon)

  function toggleMonday() {
    exceptionMon === 'Mon' ? setExceptionDay1('') : setExceptionDay1('Mon')
    // isMondayChecked = !isMondayChecked
    // setIsMondayChecked(!isMondayChecked)
    // exceptionMon === 'Mon' ? setExceptionDay1('') : setExceptionDay1('Mon')

    // exceptionMon === 'Mon' ? exception.exceptionMon = '' : exception.exceptionMon = 'Mon'
  }
  // console.log(isMondayChecked)

  // const toggleTuesday = () => {
  function toggleTuesday() {
    exceptionTues === 'Tue' ? setExceptionDay2('') : setExceptionDay2('Tue')
  }

  // const toggleWednesday = () => {
  function toggleWednesday() {
    exceptionWed === 'Wed' ? setExceptionDay3('') : setExceptionDay3('Wed')
  }

  // const toggleThursday = () => {
  function toggleThursday() {
    exceptionThurs === 'Thurs' ? setExceptionDay4('') : setExceptionDay4('Thurs')
  }
  // const toggleFriday = () => {
  function toggleFriday() {
    exceptionFri === 'Fri' ? setExceptionDay5('') : setExceptionDay5('Fri')
  }

  const onChange = (e) => {
    setException({ ...exception, [e.target.name]: e.target.value })
    // setDefaultAmStartTime(e.target.value)
  }

  const onMondayChange = (e) => {
    setExceptionDay1(e => e.exceptionMon = 'Mon')
    // setDefaultAmStartTime(e.target.value)
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
      exceptionMon: isMondayChecked === 'true' ? exceptionMon1 : exceptionMon,
      exceptionTues: isTuesdayChecked ? exceptionTues1 : exceptionTues,
      exceptionWed: exceptionWed1,
      exceptionThurs: exceptionThurs1,
      exceptionFri: exceptionFri1,
      addedDate: exception.addedDate,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
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

  // console.log(exceptionMon)
  // const xxxx = exceptionMon === 'Mon' ? 'true' : 'false'
  // const [exceptionMonday, setExceptionMonday] = useState(exceptionMon !== null ? true : false)
  // const [exceptionMonday, setExceptionMonday] = useState(exception.exceptionMon === 'Mon' ? 'true' : 'false')
  // const [exceptionTuesday, setExceptionTuesday] = useState(exception.exceptionTues === 'Tue' ? 'true' : 'false')


  // console.log(exceptionMonday)
  // const [exceptionMonday, setExceptionMonday] = useState('')
  // const [checkOut, setCheckOut] = useState('')
  // const [exceptionMondayCheckedValue, setExceptionMondayCheckedValue] = useState(false)
  // const [checkOutValue, setCheckOutValue] = useState(false)

  // function setExceptionForMonday(e) {
  //   // setExceptionDay1(e.target.value)
  //   // setExceptionMondayCheckedValue(!exceptionMondayCheckedValue)
  //   setExceptionMonday(!exceptionMonday)
  //   exception.exceptionMon = 'Mon'

  // }

  // console.log(exceptionMonday, exceptionMondayCheckedValue)

  //End of 4/22/2023 this is try out code for checkbox


  // console.log(xxxx)

  // const exceptionMondayValue = useRef();

  // useEffect(function () {
  //   setTimeout(() => {
  //     exceptionMondayValue.current = exceptionMonday //.textContent = "Updated Text"
  //   }, 1000); // Update the content of the element after 2seconds 
  // }, [exceptionMonday]);
  // const xx = exceptionMon === 'Mon'
  // console.log(xx)
  // function toggleMonday(value) {
  //   return value = exceptionMonday === 'true' ? setExceptionDay1('Mon') : setExceptionDay1('')
  // }
  // const afterFirstRender = useRef(false);
  // const [visibleMon, setVisibleMon] = useState(() => exceptionMon === 'Mon' ? true : false)
  // console.log('1', visibleMon)
  // const toggleMonday = () => {
  //   exceptionMon === 'Mon' ? setExceptionDay1('') : setExceptionDay1('Mon')
  // }



  //first render sample code to skip first render (do not delete)
  // const afterFirstRender = useRef(false);
  // console.log('afterFirstRender', afterFirstRender, exceptionMon1)
  // const [visible, setVisible] = useState(false);
  // const handleToggle = () => {
  //   setVisible((current) => !current);
  // };
  // useEffect(() => {
  //   if (!afterFirstRender.current) {
  //     afterFirstRender.current = true;
  //     return;
  //   }

  //   if (visibleMon) {
  //     axios.post('https://example.com/stats/name/show').then(() => {
  //       console.log('Stats updated successfully')
  //     });
  //   }
  // }, [visible]);

  //end first render
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
                    {/* {alert('Value of exceptionMon1 is ' + exceptionMon1)} */}
                    <input
                      // Checked={isMondayChecked}
                      Checked={exceptionMon === 'Mon' ? 'true' : 'false'}
                      // checked={isMondayChecked === 'true' ? true : false}
                      // checked={exceptionMon === 'Mon' ? true : false}
                      type="checkbox"
                      onClick={toggleMonday}
                      // onChange={() => toggleMonday}
                      // onChange={onMondayChange}
                      name="exceptionDaysMon"
                      id="exceptionDaysMon"
                      value={exception.exceptionMon}
                    // onChange={mondayChange}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    <input
                      // Checked={exceptionTues === 'Tue' ? 'true' : 'false'}
                      Checked={isTuesdayChecked}
                      type="checkbox"
                      onClick={toggleTuesday}
                      name="exceptionDaysTues"
                      id="exceptionDaysTues"
                      value={exception.exceptionTues}
                    />
                    {/* {console.log(toggleTuesday)} */}
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="scheduleCheckboxContainer">
                    Wednesdays
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
