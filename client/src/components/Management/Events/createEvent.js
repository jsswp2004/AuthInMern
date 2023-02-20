import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Events from './eventsList'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

const CreateEvents = (props) => {

  const navigate = useNavigate()
  const [event, setEvents] = useState({
    name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setEvents({ ...event, [e.target.name]: e.target.value })
  }

  console.log(event)
  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/events', event)
      .then((res) => {
        setEvents({
          name: '',
          addedDate: '',
        })

        // Push to /
        navigate('/settingsPage')
      })
      .catch((err) => {
        console.log('Error in CreateEvents!')
      })
  }
  // console.log(event)

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h5 className="createPageHeader">Create Events</h5>
        <div className="item3A">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-container">
              <div className="form-group">
                <label htmlFor="name">Events </label>
                <input
                  type="text"
                  className="form-control eventInput"
                  name="name"
                  value={event.name}
                  onChange={onChange}
                />
                <input value="Add" type="submit" className="btn btn-success" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvents
