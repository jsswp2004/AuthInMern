import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

function EditEvent(props) {
  const [clinicEvents, setClinicEvents] = useState([])
  //   useState({
  //   name: '',
  //   addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  // })
  const { id } = useParams()
  // const navigate = useNavigate()
  console.log(clinicEvents)
  
  const ClinicEvents = clinicEvents.filter((event) => {
    return event.name//.toString().toLowerCase()
  })
  const clinicVisitEvents = ClinicEvents.map((doc) => doc.name)
  console.log(clinicVisitEvents)

  const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  // pull event values from database
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/events')
      .then((response) => {
        setClinicEvents(response.data)
      })
      .catch((error) => {
        console.log('Error from events list')
      })
  }, [])

  const [clinicEvent, setClinicEvent] = useState({
    name: '',
    addedDate: dateAdded,
  })

  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value })
  // }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setClinicEvent({
          name: res.data.name,
          addedDate: dateAdded,
        })
      })
      .catch((err) => {
        console.log('Error from EditEvent')
      })
  }, [id, dateAdded])


  const onChange = (e) => {
    setClinicEvent({ ...clinicEvent, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      name: clinicEvent.name,
      addedDate: format(new Date(), 'MM-dd-yyyy'),
    }

    axios
      .put(`http://localhost:8081/api/events/${id}`, data)
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
              <lable htmlFor="_id">
                {' '}
                ID
                <input
                  type="text"
                  className="form-control eventInput"
                  name="_id"
                  value={clinicEvent._id}
                  onChange={onChange}
                />{' '}
              </lable>
              <label htmlFor="name">
                Event
                {/* <input
                type="text"
                className="form-control eventInput"
                name="name"
                value={event.name}
                onChange={onChange}
              /> */}
                <select
                  key={clinicEvent._id}
                  // placeholder="Select Event"
                  name="name"
                  className="form-control select"
                  value={clinicEvent.name}
                  onChange={onChange}
                >
                  <option key="0" value="">
                    Select Event
                  </option>
                  {clinicVisitEvents.map((event) => (
                    <option key={event._id} value={event.name}>
                      {event}
                    </option>
                  ))}
                </select>
              </label>
              <input value="Update" type="submit" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
