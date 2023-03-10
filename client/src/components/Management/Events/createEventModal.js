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
        navigate(-1)
      })
      .catch((err) => {
        console.log('Error in CreateEvent!')
      })
  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div
              className="form-grid-containers"
              style={{ display: 'flex', columnGap: '10px' }}
            >
              <div className="form-group" >
                <div >
                  <label htmlFor="name">Event
                    <input
                      type="text"
                      className="form-control eventInput"
                      name="name"
                      value={event.name}
                      onChange={onChange}
                    />
                    <input
                      value="Add"
                      type="submit"
                      className="btn btn-success"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent
