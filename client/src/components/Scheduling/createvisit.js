import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'


const CreateVisit = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate()
  const [visit, setVisit] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    visitDate: '',
    provider: '',
  })

  const onChange = (e) => {
    setVisit({ ...visit, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/visits', visit)
      .then((res) => {
        setVisit({
          firstName: '',
          lastName: '',
          middleName: '',
          email: '',
          addedDate: '',
          visitDate: '',
          provider: '',
        })

        // Push to /
        navigate('/visitlist')
      })
      .catch((err) => {
        console.log('Error in CreateVisit!')
      })
  }


  // console.log(visit)
  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <h3>Patient Registration</h3>
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
                      value={visit.firstName}
                      // defaultValue={visit.firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="middleName">Middlename</label>
                    <input
                      type="text"
                      name="middleName"
                      defaultValue={visit.middleName}
                      className="form-control"
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Lastname</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      defaultValue={visit.lastName}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="div-items">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={visit.email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addedDate">Date Created</label>
                  <input
                    name="addedDate"
                    className="form-control"
                    value={visit.addedDate}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="visitDate">Visit Date</label>
                  <input
                    type="string"
                    name="visitDate"
                    className="form-control"
                    value={visit.visitDate}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="provider">Provider</label>
                  <input
                    type="string"
                    name="provider"
                    className="form-control"
                    value={visit.provider}
                    onChange={onChange}
                  />
                </div>
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

export default CreateVisit