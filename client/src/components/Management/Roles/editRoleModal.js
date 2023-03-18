import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'


function EditRoleModal(props) {
  const [clinicRole, setClinicRole] = useState({
    name: '',
    addedDate: '',
    lastUpdated: format(new Date(), 'yyyy-MM-dd'),
  })

  const RoleID = props.roleID
  // console.log(clinicRole)

  // const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/roles/${RoleID}`)
      .then((res) => {
        setClinicRole({
          // _id: res.data._id,
          name: res.data.name,
          addedDate: res.data.addedDate,
          lastUpdated: res.data.lastUpdated,
        })
      })
      .catch((err) => {
        console.log('Error from EditRole')
      })
  }, [RoleID])

  // console.log(role)
  const handleChange = (e) => {
    setClinicRole({ ...clinicRole, [e.target.name]: e.target.value })
    // window.location.reload()
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      _id: props.roleID,
      name: clinicRole.name,
      addedDate: clinicRole.addedDate,
      lastUpdated: format(new Date(), 'yyyy-MM-dd'),
    }

    axios
      .put(`http://localhost:8081/api/roles/${props.roleID}`, data)
      .then((res) => {
        // Push to /
        // navigate('/settingsPage')

        window.location.reload()
        window.location.close()

      })
      .catch((err) => {
        console.log('Error in EditRole!')
      })

  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="createRoleModalBody">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group ">
              <label style={{ display: 'none' }}>
                Role ID
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="_id"
                  value={clinicRole._id}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="name">
                Role
                <input
                  type="text"
                  className="form-control scheduleInput"
                  name="name"
                  value={clinicRole.name}
                  onChange={handleChange}
                />

              </label>
            </div>

            <div className="form-group ">
              <label>
                Date Added
                <input
                  type="date"
                  className="form-control scheduleInput"
                  name="addedDate"
                  value={clinicRole.addedDate}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="lastUpdated" style={{ marginLeft: '2px' }}>
                Last Updated
                <input
                  type="date"
                  className="form-control scheduleInput"
                  name="lastUpdated"
                  value={clinicRole.lastUpdated}
                  onChange={handleChange}
                />

              </label>
            </div>
            <div className="form-group ">
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

export default EditRoleModal
