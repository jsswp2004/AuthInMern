import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

function EditEvent(props) {
  const [event, setEvent] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  //   console.log(id)
  //   const [eventx, setEvents] = useState([])
  const events = event.filter((event) => {
    return event.Name.toString().toLowerCase()
  })
  const userEvents = events.map((event) => {
    return event.Name
  })
  const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      .then((res) => {
        setEvent(res.data)
      })
      .catch((error) => {
        console.log('Error from events list')
      })
  }, [])

  const [data, setData] = useState({
    Name: '',
    addedDate: dateAdded,
  })

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setEvent({
          Name: res.data.Name,
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from EditEvent')
      })
  }, [id])
  //   const onChange = (e) => {
  //     setEvent({ ...event, [e.target.Name]: e.target.value })
  //   }
  const handleChange = (e) => {
    setData({ ...data, [e.target.Name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      _id: props.visitID,
      Name: event.Name,
      addedDate: event.addedDate,
    }
    const VisitID = props.visitID
    axios
      .put(`http://localhost:8081/api/events/${VisitID}`, data)
      .then((res) => {
        // Push to /
        // navigate('/settingsPage')
        window.location.reload()
        window.location.close()
      })
      .catch((err) => {
        console.log('Error in EditEvent!')
      })
  }

  return (
    <div className="grid_containers">
      {/* <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div> */}
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
                          <label >
                          {/* style={{ display: 'none' }} */}
                Event ID
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="visitID"
                  value={event._id}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="Name">Event </label>
              {/* <input
                type="text"
                className="form-control eventInput"
                Name="Name"
                value={event.Name}
                onChange={onChange}
              /> */}
              <select
                key={event._id}
                // placeholder="Select Event"
                Name="Name"
                className="form-control select"
                value={event.Name}
                onChange={handleChange}
              >
                <option key="0" value="Select Event">
                  Select Event
                </option>
                {userEvents.map((event) => (
                  <option key={event._id} value={event.Name}>
                    {event}
                  </option>
                ))}
              </select>

              <input value="Update" type="submit" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
