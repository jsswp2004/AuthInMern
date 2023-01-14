import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {
  Hour,
} from '../listDictionaries/listData/listDictionariesData'

export default function CreateVisit() {
  const hourvalues = Hour
  const [hourValue, setHourValue] = React.useState('')

  const hourValueChange = (event) => {
    setHourValue(event.target.value)
    updateForm({ hourOfVisit: event.target.value })
  }

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    visitDate: '',
    hourOfVisit: '',
    email: '',
    provider: '',
  })
  const navigate = useNavigate()

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }
  //pulling provider from local storage
  const [resource, setResourceValue] = React.useState('')

  const resourcecValueChange = (event) => {
    setResourceValue(event.target.value)
    updateForm({ provider: event.target.value })
  }
  const [visits, setVisits] = useState([])
  useEffect(() => {
    async function getVisits() {
      const response = await fetch(`http://localhost:8081/api/visits/`)
      //console.log(response)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const visits = await response.json()

      setVisits(visits)
    }

    getVisits() //.filter((el) => el.visitDate === showDateValue.toLocaleDateString())

    return
  }, [visits.length])

  const provider = visits.find((el) => el.provider)

  console.log(provider)

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault()

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newVisit = { ...form }

    await fetch('http://localhost:8081/visit/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVisit),
    }).catch((error) => {
      window.alert(error)
      return
    })

    setForm({
      firstName: '',
      middleName: '',
      lastName: '',
      visitDate: '',
      hourOfVisit: '',
      email: '',
      provider: '',
    })
    navigate('/clinicVisitList')
  }

  async function refreshPage() {
    window.location.reload(false)
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="homepagegrid-container">
          <div className="homepageitem1">
            <div className="div-items">
              <h5>Visit Information</h5>
            </div>
          </div>

          <div className="homepageitem2" style={{ display: 'flex' }}>
            <div className="div-items">
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="visitDate">Date of Visit </label>
                  <input
                    type="date"
                    className="form-control"
                    id="visitDate"
                    value={form.visitDate}
                    onChange={(e) => updateForm({ visitDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hourOfVisit">
                    Hour
                    <select
                      className="form-control select"
                      id="gender"
                      value={hourValue}
                      onChange={hourValueChange}
                    >
                      {hourvalues.map((hourval) => (
                        <option value={hourval.value}>
                          {hourval.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">Firstname </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => updateForm({ firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middlename</label>
                  <input
                    type="text"
                    id="middleName"
                    value={form.middleName}
                    className="form-control"
                    onChange={(e) => updateForm({ middleName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => updateForm({ lastName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="youremailaddress@email.com"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Provider </label>
                  <input
                    type="provider"
                    className="form-control"
                    id="provider"
                    placeholder="Select provider"
                    value={form.provider}
                    onChange={(e) => updateForm({ provider: e.target.value })}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="provider">
                    Provider
                    <select
                      className="form-control select"
                      id="provider"
                      value={resource}
                      onChange={resourcecValueChange}
                    >
                      {visits.map((hourval) => (
                        <option value={hourval.value}>
                          {hourval.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  </div> */}
              </div>
            </div>
            <div></div>
          </div>
          <div
            className="homepageitem3"
            style={{ float: 'left', textAlign: 'left' }}
          >
            <div className="form-group">
              <input
                value="Add"
                type="submit"
                className="btn btn-success"
                onClick={refreshPage}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
