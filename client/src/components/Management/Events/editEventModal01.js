import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { format } from 'date-fns'
import axios from 'axios'
// import Navbar from '../../navigation/navbar'
// import Header from '../../shared/Header'

function EditEvent(props) {
  const [eventx, setEvent] = useState({
    name: '',
    addedDate: format(new Date(), 'MM-dd-yyyy'),
  })

  const [eventxx, setEvents] = useState([])

  const events = eventxx.filter((item) => {
    return item.name//.toString().toLowerCase()
  })
  const userEvents = events.map((item) => {
    return item.name
  })
  const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      .then((res) => {
        setEvents(res.data)
      })
      .catch((error) => {
        console.log('Error from events list')
      })
  }, [])

  const [eventItem, setEventItem] = useState({
    name: '',
    addedDate: dateAdded,
  })

  const EventID = props.eventID
  console.log(eventItem)

  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${EventID}`)
      .then((res) => {
        setEvents({
          // _id: res.data._id,
          name: res.data.name,
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from EditEvent')
      })
  }, [EventID])

  // console.log(event)
  const handleChange = (e) => {
    setEventItem({ ...eventItem, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      _id: props.eventID,
      name: eventxx.name,
      addedDate: eventxx.addedDate,
    }

    axios
      .put(`http://localhost:8081/api/events/${props.eventID}`, data)
      .then((res) => {
        // Push to /
        navigate('/settingsPage')
        // window.location.reload()
        // window.location.close()
      })
      .catch((err) => {
        console.log('Error in EditEvent!')
      })
  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group updateRegistrationGrp">
              <label style={{ display: 'none' }}>
                Event ID
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="_id"
                  value={eventx._id}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="name">Event 
              <select
                key={eventx._id}
                // placeholder="Select Event"
                name="name"
                className="form-control select"
                value={eventx.name}
                onChange={handleChange}
              >
                <option key="0" value="Select Event">
                  Select Event
                </option>
                {userEvents.map((event) => (
                  <option key={event._id} value={event.name}>
                    {event}
                  </option>
                ))}
                              </select>
                              </label>
              <label>
                Date Added
                <input
                  type="date"
                  className="form-control scheduleInput"
                  name="addedDate"
                  value={eventx.addedDate}
                  onChange={handleChange}
                />
              </label>

              <input
                value="Update"
                type="submit"
                className="btn btn-success updateRegistrationBtn"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
