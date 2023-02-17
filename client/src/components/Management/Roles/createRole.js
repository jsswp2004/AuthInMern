import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Role from './rolesList'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

const CreateRole = (props) => {

  const navigate = useNavigate()
  const [role, setRole] = useState({
    name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value })
  }

  console.log(role)
  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/roles', role)
      .then((res) => {
        setRole({
          name: '',
          addedDate: '',
        })

        // Push to /
        navigate('/settingsPage')
      })
      .catch((err) => {
        console.log('Error in CreateRole!')
      })
  }
  // console.log(role)

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h5 className="createPageHeader">Create Role</h5>
        <div className="item3A">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-grid-container">
              <div className="form-group">
                <label htmlFor="name">Role </label>
                <input
                  type="text"
                  className="form-control roleInput"
                  name="name"
                  value={role.name}
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

export default CreateRole
