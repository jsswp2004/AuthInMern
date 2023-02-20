import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'

import axios from 'axios'

const CreateEvent = (props) => {
  const navigate = useNavigate()
  const [event, setEvent] = useState({
    name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/events', event)
      .then((res) => {
        setEvent({
          name: '',
          addedDate: '',
        })
        // setShow(false)
        // Push to /
        navigate('/settingsPage')
      })
      .catch((err) => {
        console.log('Error in CreateEvent!')
      })
  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createEventModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Event </label>
              <input
                type="text"
                className="form-control eventInput"
                name="name"
                value={event.name}
                onChange={onChange}
              />
              <input value="Add" type="submit" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent
