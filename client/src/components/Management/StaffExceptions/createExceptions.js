import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
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
    amStartTime: '',
    amEndTime: '',
    pmStartTime: '',
    pmEndTime: '',
    exceptionMon: '',
    exceptionTues: '',
    exceptionWed: '',
    exceptionThurs: '',
    exceptionFri: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setException({ ...exception, [e.target.name]: e.target.value })
    // setSelectedMD(exception.provider.name)
  }

  const providerSelected = attendings.find((user) => user.name === exception.provider )
  // console.log(providerSelected)
  // const { _id, name } = providerSelected
  const [exceptionMon, setExceptionDay1] = useState(' ')
  const [exceptionTues, setExceptionDay2] = useState(' ')
  const [exceptionWed, setExceptionDay3] = useState(' ')
  const [exceptionThurs, setExceptionDay4] = useState(' ')
  const [exceptionFri, setExceptionDay5] = useState(' ')
  // console.log(exception.startDate)
  // console.log(providerSelected._id)

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      provider: exception.provider,
      providerID: providerSelected._id,
      startDate: exception.startDate,
      endDate: exception.endDate,
      amStartTime: exception.amStartTime,
      amEndTime: exception.amEndTime,
      pmStartTime: exception.pmStartTime,
      pmEndTime: exception.pmEndTime,
      exceptionMon: exceptionMon,
      exceptionTues: exceptionTues,
      exceptionWed: exceptionWed,
      exceptionThurs: exceptionThurs,
      exceptionFri: exceptionFri,
      addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }

    axios
      .post('http://localhost:8081/api/exceptions', data)
      .then((res) => {
        setException({
          providerID: '',
          provider: '',
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
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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

  return (
    <div className="grid_containers">
      <div className="item3">
        {/* <h5 className="createPageHeader">Create Exception</h5> */}
        <div className="item3A createRoleModalBody">
        {/* <label className="createPageHeader">Create Exception</label> */}
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-containers" style={{display:'flex', columnGap: '10px'}}>
              <div className="form-group">
                <div>
                  <label style={{display: 'none'}} >
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
                <div>
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
                      onClick={() => setExceptionDay4('Thu')}
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
                  <label>
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
                      key={exception.pmStartTime._id}
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
