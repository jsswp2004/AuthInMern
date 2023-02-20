import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Event from './eventsList'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

function EditEvent(props) {
  const [event, setEvent] = useState({
    Name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const [eventx, setEvents] = useState([])
  const events = eventx.filter((event) => {
    return event.Name.toString().toLowerCase()
  })
  const userEvents = events.map((event) => {
    return event.Name
  })
  const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.log('Error from events list')
      })
  }, [])
  const [data, setData] = useState({
    Name: '',
    addedDate: dateAdded,
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.Name]: e.target.value })
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setEvent({
          Name: res.data.Name,
        })
      })
      .catch((err) => {
        console.log('Error from EditEvent')
      })
  }, [id])
  const onChange = (e) => {
    setEvent({ ...event, [e.target.Name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      Name: event.Name,
    }

    axios
      .put(`http://localhost:8081/api/events/${id}`, data)
      .then((res) => {
        // Push to /
        navigate('/settingsPage')
      })
      .catch((err) => {
        console.log('Error in EditEvent!')
      })
  }

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <div className="item3A EditEventModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Event </label>
              <input
                type="text"
                className="form-control eventInput"
                Name="Name"
                value={event.Name}
                onChange={onChange}
              />
              {/* <select
                key={eventx._id}
                placeholder="Select Event"
                Name="event"
                className="form-control select"
                value={event.Name}
                onChange={handleChange}
              >
                <option key="0" value="">
                  Select Event
                </option>
                {userEvents.map((event) => (
                  <option key={event._id} value={event.Name}>
                    {event}
                  </option>
                ))}
              </select> */}

              <input value="Update" type="submit" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
