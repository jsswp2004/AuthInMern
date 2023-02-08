import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Role from './rolesList'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

const CreateRole = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate()
  const [role, setRole] = useState({
    name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })

  const onChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/records', role)
      .then((res) => {
        setRole({
          name: '',
          addedDate: '',
        })

        // Push to /
        navigate('/roleList')
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
              <div className="div-items">
                <div className="forms-group">
                  <div className="form-group">
                    <label htmlFor="firstName">Firstname </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={role.name}
                      // defaultValue={record.firstName}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="div-items">
                <div
                  className="form-group"
                  style={{
                    float: 'left',
                    textAlign: 'left',
                    paddingTop: '10px',
                  }}
                >
                  <input
                    value="Add"
                    type="submit"
                    className="btn btn-success"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRole
