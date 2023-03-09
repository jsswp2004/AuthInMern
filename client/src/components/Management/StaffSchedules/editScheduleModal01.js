import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import axios from 'axios'
import { Hour } from '../../listDictionaries/listData/listDictionariesData'
import CheckBoxes from './checkBoxScheduledDays'

function EditSchedule(props) {
  //useRef
  // const checkboxRef = useRef(null)

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

  const DrID = props.providerID

  // const [scheduleMon, setScheduleDay1] = useState(' ')
  // const [scheduleTues, setScheduleDay2] = useState(' ')
  // const [scheduleWed, setScheduleDay3] = useState(' ')
  // const [scheduleThurs, setScheduleDay4] = useState(' ')
  // const [scheduleFri, setScheduleDay5] = useState(' ')

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/schedules/${DrID}`)
      .then((res) => {
        // setSchedule({
        //   providerID: res.data.providerID,
        //   provider: res.data.provider,
        //   startDate: res.data.startDate,
        //   endDate: res.data.endDate,
        //   amStartTime: res.data.amStartTime,
        //   amEndTime: res.data.amEndTime,
        //   pmStartTime: res.data.pmStartTime,
        //   pmEndTime: res.data.pmEndTime,
        //   scheduledMon: res.data.scheduleMon,
        //   scheduledTues: res.data.scheduleTues,
        //   scheduledWed: res.data.scheduleWed,
        //   scheduledThurs: res.data.scheduleThurs,
        //   scheduledFri: res.data.scheduledFri,
        //   addedDate: res.data.addedDate,
        // })
        setSchedule(res.data)
      })
      .catch((err) => {
        console.log('Error from EditSchedule')
      })
  }, [DrID])

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
console.log(schedule)
  //deconstruct schedule object
  let {
    providerID,
    provider,
    startDate,
    endDate,
    amStartTime,
    amEndTime,
    pmStartTime,
    pmEndTime,
    scheduledMon: preValueMon,
    scheduledTues: preValueTues,
    scheduledWed: preValueWed,
    scheduledThurs: preValueThurs,
    scheduledFri: preValueFri,
    addedDate } = schedule

  const preValueMonday = preValueMon.toString().trim() === 'Mon' ? true : false
  const preValueTuesday = preValueTues.toString().trim() === 'Tue' ? true : false
  const preValueWednesday = preValueWed.toString().trim() === 'Wed' ? true : false
  const preValueThursday = preValueThurs.toString().trim() === 'Thu' ? true : false
  const preValueFriday = preValueFri.toString().trim() === 'Fri' ? true : false

  console.log(preValueMon,preValueTues,preValueWed,preValueThurs, preValueFri) //, scheduledWed,  scheduledThurs, scheduledFri)
  const onChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value })
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
      scheduledMon: preValueMon, //schedule.scheduleMon,
      scheduledTues: preValueTues, //schedule.scheduleTues,
      scheduledWed: preValueWed, //schedule.scheduleWed,
      scheduledThurs: preValueThurs, //schedule.scheduleThurs,
      scheduledFri: preValueFri, //schedule.scheduleFri,
      addedDate: schedule.addedDate,
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



  // const { name: checkNameMonday, checked: checkMonday } = preValueMonday

  // const { checked } = preValueTuesday
  
  // const preValueMondString = preValueMonday.toString() 
  // const preValueM = preValueMondString === 'true' ? true : false
  // console.log(preValueMonday, preValueMondString, preValueM)
  // const [isCheckedMonday, setIsCheckedMonday] = useState(preValueMonday.toString() === 'true' ? true : false)
  let ischeckmonday = preValueMonday  ? true : false
  // const [isCheckedMonday, setIsCheckedMonday] = useState(ischeckmonday.toString() === 'true' ? true : false)
  const [isCheckedMonday, setIsCheckedMonday] = useState(ischeckmonday)


  const [isCheckedTuesday, setIsCheckedTuesday] = useState(preValueTuesday.toString() === 'true' ? true : false)
  const [isCheckedWednesday, setIsCheckedWednesday] = useState(preValueWednesday)
  const [isCheckedThursday, setIsCheckedThursday] = useState(preValueThursday)
  const [isCheckedFriday, setIsCheckedFriday] = useState(preValueFriday)
  console.log(ischeckmonday, isCheckedMonday, ischeckmonday.toString() === 'true' ? true : false)
  console.log(preValueMonday, preValueTuesday, preValueWednesday, preValueThursday, preValueFriday)

  const handleOnChangeMon = () => {
    // setIsChecked((prev) => !prev);
    // setIsCheckedMonday(preValueMonday.toString()=== 'true' ? true : false);
    // setIsCheckedMonday((e)=> e.target.checked)
    // preValueMonday = isCheckedMonday
    // setIsCheckedMonday(false);
    // console.log(isCheckedMonday)
    // setScheduleDay1(' ')
    ischeckmonday = !ischeckmonday
  }


  const handleOnChangeTue = () => {
    setIsCheckedTuesday(!isCheckedTuesday);
    // setScheduleDay2(' ')
  };

  const handleOnChangeWed = () => {
    setIsCheckedWednesday(!isCheckedWednesday);
    // setScheduleDay3(' ')
  };

  const handleOnChangeThurs = () => {
    setIsCheckedThursday(!isCheckedThursday);
    // setScheduleDay4(' ')
  };

  const handleOnChangeFri = () => {
    setIsCheckedFriday(!isCheckedFriday);
    // setScheduleDay5(' ')
  };


  // console.log(scheduledMon === 'Mon' ? true : false)
  console.log(preValueMonday.toString() === 'true' ? true : false)
  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
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
                      id='Mon'
                      type="checkbox"
                      // onClick={() => setIsCheckedMonday(!isCheckedMonday)}
                      // onClick={() => setScheduleDay1('Mon')}
                       onClick={handleOnChangeMon}
                      // onDoubleClick={handleOnChangeMonFalse}
                      name="Mon"
                      value={schedule.scheduledMon}
                      // defaultChecked={preValueMon.toString() === 'Mon' ? true : false}
                      
                      // defaultChecked={schedule.scheduledMon === 'Mon' ? true : false}
                      // checked={preValueMon === 'Mon' ? true : false}
                      onChange={handleOnChangeMon}
                      // checked={preValueMon === 'Mon' ? true : false}
                      checked={ischeckmonday}
                    // isChecked={schedule.scheduledMon === 'Mon' ? true : false}
                    // checked={isCheckedMonday === 'true' ? true : false}
                      // defaultChecked= {false}
                    // checked={preValueMonday === true ? true : false}


                    />
                    {console.log(isCheckedMonday === 'true' ? true : false)}
                    {console.log(isCheckedMonday)}
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Tuesdays
                    {/* {console.log(scheduledMon)} */}
                    <input
                      id='Tue'
                      type="checkbox"
                      // onClick={() => { setScheduleDay2('Tue') }}
                      name="Tue"
                      value={schedule.scheduledTues}
                      checked={isCheckedTuesday}
                      onChange={handleOnChangeTue}
                      // checked={preValueTuesday === true ? true : false}
                    // checked={schedule.scheduledTues === 'Tue' ? true : false}
                    // defaultChecked ={schedule.scheduledTues !== ' ' ? true : false}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>

                  <label className="scheduleCheckboxContainer">
                    Wednesdays

                    <input
                      id='Wed'
                      type="checkbox"
                      // onClick={() => setScheduleDay3('Wed')}
                      // name="scheduledDays"
                      value={schedule.scheduledWed}
                      checked={isCheckedWednesday}
                      // checked={scheduledWed === 'Wed' ? true : false}
                      // isChecked={schedule.scheduledWed === 'Wed' ? true : false}
                      onChange={handleOnChangeWed}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Thursdays
                    <input
                      id='Thu'
                      type="checkbox"
                      // onClick={() => setScheduleDay4('Thu')}
                      // name="scheduledDays"
                      value={schedule.scheduledThurs}
                      checked={isCheckedThursday}
                      // checked={schedule.scheduledThurs === 'Thu' ? true : false}
                      onChange={handleOnChangeThurs}
                    />
                    <span className="scheduleCheckboxCheckmark"></span>
                  </label>
                  <label className="scheduleCheckboxContainer">
                    Fridays
                    <input
                      id='Fri'
                      type="checkbox"
                      // onClick={() => setScheduleDay5('Fri')}
                      // name="scheduledDays"
                      value={schedule.scheduledFri}
                      checked={isCheckedFriday}
                      // checked={schedule.scheduledFri === 'Fri' ? true : false}
                      onChange={handleOnChangeFri}
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
      {/* <CheckBoxes
        preValueMonday={preValueMonday.toString()}
        preValueTuesday={preValueTuesday.toString()}
        preValueWednesday={preValueWednesday.toString()}
        preValueThursday={preValueThursday.toString()}
        preValueFriday={preValueFriday.toString()}
      />
      {console.log(preValueMonday.toString() === 'true' ? true : false)} */}
    </div>
  )
}

export default EditSchedule
