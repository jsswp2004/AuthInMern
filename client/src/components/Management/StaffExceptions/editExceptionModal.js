import React, { useState, useEffect, useRef } from 'react'
import { format, parseISO } from 'date-fns'
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
      firstDayOfMonth: '',
      secondDayOfMonth: '',
      thirdDayOfMonth: '',
      fourthDayOfMonth: '',
      fifthDayOfMonth: '',
      sixthDayOfMonth: '',
      seventhDayOfMonth: '',
      eighthDayOfMonth: '',
      ninthDayOfMonth: '',
      tenthDayOfMonth: '',
      eleventhDayOfMonth: '',
      twelfthDayOfMonth: '',
      thirteenthDayOfMonth: '',
      fourteenthDayOfMonth: '',
      fifteenthDayOfMonth: '',
      sixteenthDayOfMonth: '',
      seventeenthDayOfMonth: '',
      eighteenthDayOfMonth: '',
      nineteenthDayOfMonth: '',
      twentiethDayOfMonth: '',
      twentyFirstDayOfMonth: '',
      twentySecondDayOfMonth: '',
      twentyThirdDayOfMonth: '',
      twentyFourthDayOfMonth: '',
      twentyFifthDayOfMonth: '',
      twentySixthDayOfMonth: '',
      twentySeventhDayOfMonth: '',
      twentyEighthDayOfMonth: '',
      twentyNinthDayOfMonth: '',
      thirtiethDayOfMonth: '',
      thirtyFirstDayOfMonth: '',
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
          firstDayOfMonth: res.data.firstDayOfMonth,
          secondDayOfMonth: res.data.secondDayOfMonth,
          thirdDayOfMonth: res.data.thirdDayOfMonth,
          fourthDayOfMonth: res.data.fourthDayOfMonth,
          fifthDayOfMonth: res.data.fifthDayOfMonth,
          sixthDayOfMonth: res.data.sixthDayOfMonth,
          seventhDayOfMonth: res.data.seventhDayOfMonth,
          eighthDayOfMonth: res.data.eighthDayOfMonth,
          ninthDayOfMonth: res.data.ninthDayOfMonth,
          tenthDayOfMonth: res.data.tenthDayOfMonth,
          eleventhDayOfMonth: res.data.eleventhDayOfMonth,
          twelfthDayOfMonth: res.data.twelfthDayOfMonth,
          thirteenthDayOfMonth: res.data.thirteenthDayOfMonth,
          fourteenthDayOfMonth: res.data.fourteenthDayOfMonth,
          fifteenthDayOfMonth: res.data.fifteenthDayOfMonth,
          sixteenthDayOfMonth: res.data.sixteenthDayOfMonth,
          seventeenthDayOfMonth: res.data.seventeenthDayOfMonth,
          eighteenthDayOfMonth: res.data.eighteenthDayOfMonth,
          nineteenthDayOfMonth: res.data.nineteenthDayOfMonth,
          twentiethDayOfMonth: res.data.twentiethDayOfMonth,
          twentyFirstDayOfMonth: res.data.twentyFirstDayOfMonth,
          twentySecondDayOfMonth: res.data.twentySecondDayOfMonth,
          twentyThirdDayOfMonth: res.data.twentyThirdDayOfMonth,
          twentyFourthDayOfMonth: res.data.twentyFourthDayOfMonth,
          twentyFifthDayOfMonth: res.data.twentyFifthDayOfMonth,
          twentySixthDayOfMonth: res.data.twentySixthDayOfMonth,
          twentySeventhDayOfMonth: res.data.twentySeventhDayOfMonth,
          twentyEighthDayOfMonth: res.data.twentyEighthDayOfMonth,
          twentyNinthDayOfMonth: res.data.twentyNinthDayOfMonth,
          thirtiethDayOfMonth: res.data.thirtiethDayOfMonth,
          thirtyFirstDayOfMonth: res.data.thirtyFirstDayOfMonth,
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
  // console.log('exceptionMon', exceptionMon)
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
    exceptionThurs === 'Thurs' ? setExceptionDay4('') : setExceptionDay4('Thur')
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
      firstDayOfMonth: exception.firstDayOfMonth,
      secondDayOfMonth: exception.secondDayOfMonth,
      thirdDayOfMonth: exception.thirdDayOfMonth,
      fourthDayOfMonth: exception.fourthDayOfMonth,
      fifthDayOfMonth: exception.fifthDayOfMonth,
      sixthDayOfMonth: exception.sixthDayOfMonth,
      seventhDayOfMonth: exception.seventhDayOfMonth,
      eighthDayOfMonth: exception.eighthDayOfMonth,
      ninthDayOfMonth: exception.ninthDayOfMonth,
      tenthDayOfMonth: exception.tenthDayOfMonth,
      eleventhDayOfMonth: exception.eleventhDayOfMonth,
      twelfthDayOfMonth: exception.twelfthDayOfMonth,
      thirteenthDayOfMonth: exception.thirteenthDayOfMonth,
      fourteenthDayOfMonth: exception.fourteenthDayOfMonth,
      fifteenthDayOfMonth: exception.fifteenthDayOfMonth,
      sixteenthDayOfMonth: exception.sixteenthDayOfMonth,
      seventeenthDayOfMonth: exception.seventeenthDayOfMonth,
      eighteenthDayOfMonth: exception.eighteenthDayOfMonth,
      nineteenthDayOfMonth: exception.nineteenthDayOfMonth,
      twentiethDayOfMonth: exception.twentiethDayOfMonth,
      twentyFirstDayOfMonth: exception.twentyFirstDayOfMonth,
      twentySecondDayOfMonth: exception.twentySecondDayOfMonth,
      twentyThirdDayOfMonth: exception.twentyThirdDayOfMonth,
      twentyFourthDayOfMonth: exception.twentyFourthDayOfMonth,
      twentyFifthDayOfMonth: exception.twentyFifthDayOfMonth,
      twentySixthDayOfMonth: exception.twentySixthDayOfMonth,
      twentySeventhDayOfMonth: exception.twentySeventhDayOfMonth,
      twentyEighthDayOfMonth: exception.twentyEighthDayOfMonth,
      twentyNinthDayOfMonth: exception.twentyNinthDayOfMonth,
      thirtiethDayOfMonth: exception.thirtiethDayOfMonth,
      thirtyFirstDayOfMonth: exception.thirtyFirstDayOfMonth,
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
  const { startDate, endDate } = exception
  const startExceptionDate = parseISO(startDate, "yyyy-MM-dd", new Date());

  const endExceptionDate = parseISO(endDate, "yyyy-MM-dd", new Date());

  // console.log(startExceptionDate, endExceptionDate)
  const exceptionDatesArray = Array.from({ length: (endExceptionDate - startExceptionDate) / (1000 * 60 * 60 * 24) + 1 }, (_, i) => {
    const d = new Date(startExceptionDate);
    d.setDate(startExceptionDate.getDate() + i);
    return format(new Date(d), "dd");
  });

  console.log(exceptionDatesArray)

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      providerID: props.providerID,
      provider: exception.provider,
      startDate: exception.startDate,
      endDate: exception.endDate,
      firstDayOfMonth: exceptionDatesArray.includes('01') ? 'true' : 'false',
      secondDayOfMonth: exceptionDatesArray.includes('02') ? 'true' : 'false',
      thirdDayOfMonth: exceptionDatesArray.includes('03') ? 'true' : 'false',
      fourthDayOfMonth: exceptionDatesArray.includes('04') ? 'true' : 'false',
      fifthDayOfMonth: exceptionDatesArray.includes('05') ? 'true' : 'false',
      sixthDayOfMonth: exceptionDatesArray.includes('06') ? 'true' : 'false',
      seventhDayOfMonth: exceptionDatesArray.includes('07') ? 'true' : 'false',
      eighthDayOfMonth: exceptionDatesArray.includes('08') ? 'true' : 'false',
      ninthDayOfMonth: exceptionDatesArray.includes('09') ? 'true' : 'false',
      tenthDayOfMonth: exceptionDatesArray.includes('10') ? 'true' : 'false',
      eleventhDayOfMonth: exceptionDatesArray.includes('11') ? 'true' : 'false',
      twelfthDayOfMonth: exceptionDatesArray.includes('12') ? 'true' : 'false',
      thirteenthDayOfMonth: exceptionDatesArray.includes('13') ? 'true' : 'false',
      fourteenthDayOfMonth: exceptionDatesArray.includes('14') ? 'true' : 'false',
      fifteenthDayOfMonth: exceptionDatesArray.includes('15') ? 'true' : 'false',
      sixteenthDayOfMonth: exceptionDatesArray.includes('16') ? 'true' : 'false',
      seventeenthDayOfMonth: exceptionDatesArray.includes('17') ? 'true' : 'false',
      eighteenthDayOfMonth: exceptionDatesArray.includes('18') ? 'true' : 'false',
      nineteenthDayOfMonth: exceptionDatesArray.includes('19') ? 'true' : 'false',
      twentiethDayOfMonth: exceptionDatesArray.includes('20') ? 'true' : 'false',
      twentyFirstDayOfMonth: exceptionDatesArray.includes('21') ? 'true' : 'false',
      twentySecondDayOfMonth: exceptionDatesArray.includes('22') ? 'true' : 'false',
      twentyThirdDayOfMonth: exceptionDatesArray.includes('23') ? 'true' : 'false',
      twentyFourthDayOfMonth: exceptionDatesArray.includes('24') ? 'true' : 'false',
      twentyFifthDayOfMonth: exceptionDatesArray.includes('25') ? 'true' : 'false',
      twentySixthDayOfMonth: exceptionDatesArray.includes('26') ? 'true' : 'false',
      twentySeventhDayOfMonth: exceptionDatesArray.includes('27') ? 'true' : 'false',
      twentyEighthDayOfMonth: exceptionDatesArray.includes('28') ? 'true' : 'false',
      twentyNinthDayOfMonth: exceptionDatesArray.includes('29') ? 'true' : 'false',
      thirtiethDayOfMonth: exceptionDatesArray.includes('30') ? 'true' : 'false',
      thirtyFirstDayOfMonth: exceptionDatesArray.includes('31') ? 'true' : 'false',
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
                {/* <div className="form-group">
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
                </div> */}
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
