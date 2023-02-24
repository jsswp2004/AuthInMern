import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'

import axios from 'axios'

const CreateRole = (props) => {
  const navigate = useNavigate()
  const [role, setRole] = useState({
    name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd'),
  })

  const onChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/roles', role)
      .then((res) => {
        setRole({
          name: '',
          addedDate: '',
        })
        window.location.reload()
        // setShow(false)
        // Push to /
        navigate('/settingsPage')
      })
      .catch((err) => {
        console.log('Error in CreateRole!')
      })
  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Role </label>
              <input
                type="text"
                className="form-control roleInput"
                name="name"
                value={role.name}
                onChange={onChange}
              />
              
              <div className="form-group re">
              <label htmlFor="addedDate">Date Created </label>
              <input
                type="text"
                className="form-control roleInput"
                name="addedDate"
                value={role.addedDate}
                onChange={onChange}
              />
              <input value="Add" type="submit" className="btn btn-success updateRegistrationBtn" />
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRole
