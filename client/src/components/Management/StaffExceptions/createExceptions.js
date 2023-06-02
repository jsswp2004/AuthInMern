import React, { useState, useEffect } from 'react'
import { parseISO } from 'date-fns'
// import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import axios from 'axios'
import { Hour } from '../../listDictionaries/listData/listDictionariesData'

const CreateException = (props) => {

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
    amStartTime: '09:00',
    amEndTime: '12:00',
    pmStartTime: '13:00',
    pmEndTime: '18:00',
    exceptionMon: '',
    exceptionTues: '',
    exceptionWed: '',
    exceptionThurs: '',
    exceptionFri: '',
    addedDate: format(new Date(), 'yyyy-MM-dd'),
    lastUpdated: format(new Date(), 'yyyy-MM-dd'),
  })

  const [defaultAmStartTime, setDefaultAmStartTime] = useState('09:00')
  const [defaultAmEndTime, setDefaultAmEndTime] = useState('12:00')
  const [defaultPmStartTime, setDefaultPmStartTime] = useState('13:00')
  const [defaultPmEndTime, setDefaultPmEndTime] = useState('18:00')



  const onChange = (e) => {
    setException({ ...exception, [e.target.name]: e.target.value })

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

  const providerSelected = attendings.find((user) => user.name === exception.provider)

  const [exceptionMon, setExceptionDay1] = useState(' ')
  const [exceptionTues, setExceptionDay2] = useState(' ')
  const [exceptionWed, setExceptionDay3] = useState(' ')
  const [exceptionThurs, setExceptionDay4] = useState(' ')
  const [exceptionFri, setExceptionDay5] = useState(' ')


  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      provider: exception.provider,
      providerID: providerSelected._id,
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
      exceptionMon: exceptionMon,
      exceptionTues: exceptionTues,
      exceptionWed: exceptionWed,
      exceptionThurs: exceptionThurs,
      exceptionFri: exceptionFri,
      addedDate: format(new Date(), 'yyyy-MM-dd'),
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }

    axios
      .post('http://localhost:8081/api/exceptions', data)
      .then((res) => {
        setException({
          providerID: '',
          provider: '',
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
        })

        // Push to /
        // navigate('/settingsPage')
        window.location.reload()
        window.location.close()
      })
      .catch((err) => {
        console.log('Error in CreateException!')
      })
  }
  console.log(exception)
  return (
    <div className="grid_containers">
      <div className="item3">
        {/* <h5 className="createPageHeader">Create Exception</h5> */}
        <div className="createRoleModalBody">
          {/* <label className="createPageHeader">Create Exception</label> */}
          <form noValidate onSubmit={onSubmit} className='formModal'>
            <div className="form-grid-containers" style={{ display: 'flex', columnGap: '10px' }}>
              <div className="form-group">
                <div>
                  <label style={{ display: 'none' }} >
                    {/* style={{display: 'none'}} */}
                    Provider ID
                    <input
                      type="text"
                      className="form-control scheduleInput"
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
                        <option key={doc._id} value={doc.name}>
                          {doc}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* <div>
                  <label>Exception Days:</label>
                  <label className="scheduleCheckboxContainer">
                    Mondays
                    <input
                      type="checkbox"
                      // checked='checked'
                      onClick={() => setExceptionDay1('Mon')}
                      name="scheduleDays"
                      value={exception.exceptionMon}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay2('Tue')}
                      name="scheduleDays"
                      value={exception.exceptionTues}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Wednesdays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay3('Wed')}
                      name="scheduleDays"
                      value={exception.exceptionWed}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Thursdays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay4('Thur')}
                      name="scheduleDays"
                      value={exception.exceptionThurs}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Fridays
                    <input
                      type="checkbox"
                      onClick={() => setExceptionDay5('Fri')}
                      name="scheduleDays"
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
                      // value={exception.amStartTime}
                      value={defaultAmStartTime}
                      // onChange={onChange}
                      onChange={e => setDefaultAmStartTime(e.target.value)}
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
                      // value={exception.amEndTime}
                      value={defaultAmEndTime}
                      // onChange={onChange}
                      onChange={e => setDefaultAmEndTime(e.target.value)}
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
                      // value={exception.pmStartTime}
                      value={defaultPmStartTime}
                      // onChange={onChange}
                      onChange={e => setDefaultPmStartTime(e.target.value)}
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
                      // value={exception.pmEndTime}
                      value={defaultPmEndTime}
                      // onChange={onChange}
                      onChange={e => setDefaultPmEndTime(e.target.value)}
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
                    value={exception.addedDate}
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

export default CreateException
