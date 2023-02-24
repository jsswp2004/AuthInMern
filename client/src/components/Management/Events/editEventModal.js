import React, { useState, useEffect } from 'react'
import axios from 'axios'


function EditEventModal(props) {
  const [clinicEvents, setClinicEvents] = useState([])

  const ClinicEvents = clinicEvents.filter((event) => {
    return event.name //.toString().toLowerCase()
  })
  const clinicVisitEvents = ClinicEvents.map((doc) => doc.name)
  // console.log(clinicVisitEvents)

  // const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  // pull event values from database
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      .then((res) => {
        setClinicEvents(res.data)
      })
      .catch((error) => {
        console.log('Error from events list')
      })
  }, [])
  const [clinicEvent, setClinicEvent] = useState({
    name: '',
    addedDate: '',
  })

  const EventID = props.eventID
  // console.log(clinicEvent)

  // const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${EventID}`)
      .then((res) => {
        setClinicEvent({
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
    setClinicEvent({ ...clinicEvent, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      _id: props.eventID,
      name: clinicEvent.name,
      addedDate: clinicEvent.addedDate,//format(new Date(), 'MM-dd-yyyy'),
    }

    axios
      .put(`http://localhost:8081/api/events/${props.eventID}`, data)
      .then((res) => {
        // Push to /
        // navigate('/settingsPage')
        window.location.reload()
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
            <div className="form-group ">
              <label style={{ display: 'none' }}>
                Event ID
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="_id"
                  value={clinicEvent._id}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="name">
                Event
                <select
                  key={clinicEvent._id}
                  // placeholder="Select Event"
                  name="name"
                  className="form-control select"
                  value={clinicEvent.name}
                  onChange={handleChange}
                >
                  <option key="0" value="Select Event">
                    Select Event
                  </option>
                  {clinicVisitEvents.map((event) => (
                    <option key={event._id} value={event.name}>
                      {event}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Date Added
                <input
                  type="date"
                  className="form-control scheduleInput"
                  name="addedDate"
                  value={clinicEvent.addedDate}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
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

export default EditEventModal
