import React, { useState, useEffect } from 'react'
import axios from 'axios'


function EditRoleModal(props) {
  const [clinicRole, setClinicRole] = useState({
    name: '',
    addedDate: '',
  })

  const RoleID = props.roleID

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/roles/${RoleID}`)
      .then((res) => {
        setClinicRole({
          // _id: res.data._id,
          name: res.data.name,
          addedDate: res.data.addedDate,
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
      addedDate: clinicRole.addedDate,//format(new Date(), 'MM-dd-yyyy'),
    }

    axios
      .put(`http://localhost:8081/api/roles/${props.roleID}`, data)
      .then((res) => {
        // Push to /
        // navigate('/settingsPage')
            
      window.location.reload()
      // window.location.close()
  
      })
      .catch((err) => {
        console.log('Error in EditRole!')
      })

  }

  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="item3A createRoleModalBody">
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
                {/* <select
                  key={clinicRole._id}
                  // placeholder="Select Role"
                  name="name"
                  className="form-control select"
                  value={clinicRole.name}
                  onChange={handleChange}
                >
                  <option key="0" value="Select Role">
                    Select Role
                  </option>
                  {clinicVisitRoles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role}
                    </option>
                  ))}
                </select> */}
              </label>
            </div>

            <div>
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

export default EditRoleModal
