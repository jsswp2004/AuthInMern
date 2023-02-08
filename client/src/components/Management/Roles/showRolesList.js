import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Role from './rolesList'
import axios from 'axios'
import logo from '../../shared/images/logoPOWER.png'
// import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

const ShowRolesList = () => {
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  console.log(roles)
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/roles')
      .then((res) => {
        // const data = response.data
        setRoles(res.data)
      })
      .catch((error) => {
        console.log('Error from roles list')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/roles/${id}`)
      .then((res) => {
        setRoles(roles.filter((el) => el._id !== id))
        console.log('Role successfully deleted!')
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
  }
  console.log('roles', roles)

  //   const roleList = () => {
  //     return roles.map((currentrole, i) => {
  //       return <Role role={currentrole} deleteRecord={deleteRecord} key={i} />
  //     })
  //     }

  function roleList() {
    return roles
      .filter((role) => {
        if (searchInput === '') {
          return role
        } else if (
          role.role.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return role
        }
      })
      .map((currentrole, i) => {
        return <Role role={currentrole} deleteRecord={deleteRecord} key={i} />
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
        <div className="col-md-12">
          <div className="card">
            <div className="item3A">
              <h5 className="createPageHeader">Roles</h5>
              <label htmlFor="search" className="searchLabel">
                Search :{' '}
                <input
                  id="search"
                  type="text"
                  placeholder="Search roles"
                  onChange={handleChange}
                  value={searchInput}
                />
              </label>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{roleList()}</tbody>
              </table>
              {/* {roleList()} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowRolesList
