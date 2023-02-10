import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { format } from 'date-fns'
// import Role from './rolesList'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'

function EditRole(props) {
  const [role, setRole] = useState({
    name: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const [rolex, setRoles] = useState([])
  const roles = rolex.filter((role) => {
    return role.name.toString().toLowerCase()
  })
  const userRoles = roles.map((role) => {
    return role.name
  })
  const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/roles')
      .then((response) => {
        setRoles(response.data)
      })
      .catch((error) => {
        console.log('Error from roles list')
      })
  }, [])
  const [data, setData] = useState({
    name: '',
    addedDate: dateAdded,
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/roles/${id}`)
      .then((res) => {
        setRole({
          name: res.data.name,
        })
      })
      .catch((err) => {
        console.log('Error from EditRole')
      })
  }, [id])
  const onChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      name: role.name,
    }

    axios
      .put(`http://localhost:8081/api/roles/${id}`, data)
      .then((res) => {
        // Push to /
        navigate('/rolesList')
      })
      .catch((err) => {
        console.log('Error in EditRole!')
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
        <div className="item3A EditRoleModalBody">
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
              {/* <select
                key={rolex._id}
                placeholder="Select Role"
                name="role"
                className="form-control select"
                value={data.role}
                onChange={handleChange}
              >
                <option key="0" value="">
                  Select Role
                </option>
                {userRoles.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role}
                  </option>
                ))}
              </select> */}

              <input value="Update" type="submit" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRole
