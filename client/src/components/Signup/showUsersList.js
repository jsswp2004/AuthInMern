import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import User from './userlist'
import axios from 'axios'
import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

const ShowUsersList = () => {
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/users/${id}`)
      .then((response) => {
        setUsers(users.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete record')
      })
  }

  const filteredData = users.filter((user) => {
    if (searchInput === '') {
      return user
    } else {
      return (
        user.firstName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        user.lastName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        user.email
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        user.role
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        user.addedDate
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
    }
  })
  const [sortedField, setSortedField] = useState(null)
  const [sortedDirection, setSortedDirection] = useState(null)

  function userList() {
    if (sortedField === 'firstName' && sortedDirection === 'asc') {
      return filteredData
        .sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    } else if (sortedField === 'firstName' && sortedDirection === 'dsc') {
      return filteredData
        .sort((a, b) => (a.firstName > b.firstName ? -1 : 1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    } else if (sortedField === 'lastName' && sortedDirection === 'asc') {
      return filteredData
        .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    } else if (sortedField === 'lastName' && sortedDirection === 'dsc') {
      return filteredData
        .sort((a, b) => (a.lastName > b.lastName ? -1 : 1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    } else if (sortedField === 'email' && sortedDirection === 'asc') {
      return filteredData
        .sort((a, b) => (a.email > b.email ? 1 : -1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    } else if (sortedField === 'email' && sortedDirection === 'dsc') {
      return filteredData
        .sort((a, b) => (a.email > b.email ? -1 : 1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    }
    
    else if (sortedField === 'role' && sortedDirection === 'asc') {
      return filteredData
        .sort((a, b) => (a.role > b.role ? 1 : -1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    } else if (sortedField === 'role' && sortedDirection === 'dsc') {
      return filteredData
        .sort((a, b) => (a.role > b.role ? -1 : 1))
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    }
    else if (sortedField === 'addedDate' && sortedDirection === 'asc') {
      return filteredData
        .sort((a, b) =>
          Date.parse(a.addedDate) > Date.parse(b.addedDate) ? 1 : -1,
        )
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    }
    else if (sortedField === 'addedDate' && sortedDirection === 'dsc') {
      return filteredData
        .sort((a, b) =>
          Date.parse(a.addedDate) > Date.parse(b.addedDate) ? -1 : 1,
        )
        .map((user) => {
          return <User user={user} deleteRecord={deleteRecord} key={user._id} />
        })
    }else {
      return filteredData.map((user) => {
        return <User user={user} deleteRecord={deleteRecord} key={user._id} />
      })
    }
    // return filteredData
    //   .sort((a, b) => (Date.parse(a.addedDate) > Date.parse(b.addedDate) ? -1 : 1))
    // .map((user) => {
    //   return <User user={user} deleteRecord={deleteRecord} key={user._id} />
    // })
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
        <div className="item3A">
          <h3>Registered Users</h3>
          <label htmlFor="search" className="searchLabel">
            Search :{' '}
            <input
              id="search"
              type="text"
              placeholder="Search users"
              onChange={handleChange}
              value={searchInput}
            />
          </label>
        </div>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th id="columnName">
                <div className="parent">
                  <div className="child">First Name</div>
                  <div className="child sortdirection">
                    <i
                      className="fa fa-arrow-up fa-sm asc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('firstName')
                        setSortedDirection('asc')
                      }}
                    />{' '}
                    <i
                      className="fa fa-arrow-down fa-sm dsc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('firstName')
                        setSortedDirection('desc')
                      }}
                    />
                  </div>
                </div>
              </th>

              <th id="columnName">
                <div className="parent">
                  <div className="child">Last Name</div>
                  <div className="child sortdirection">
                    <i
                      className="fa fa-arrow-up fa-sm asc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('lastName')
                        setSortedDirection('asc')
                      }}
                    />{' '}
                    <i
                      className="fa fa-arrow-down fa-sm dsc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('lastName')
                        setSortedDirection('dsc')
                      }}
                    />
                  </div>
                </div>
              </th>
              <th id="columnName" >
                <div className="parent">
                  <div className="child">Email</div>
                  <div className="child sortdirection">
                    <i
                      className="fa fa-arrow-up fa-sm asc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('email')
                        setSortedDirection('asc')
                      }}
                    />{' '}
                    <i
                      className="fa fa-arrow-down fa-sm dsc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('email')
                        setSortedDirection('dsc')
                      }}
                    />
                  </div>
                </div>
              </th>
              <th id="columnName">
              <div className="parent">
                  <div className="child">Role</div>
                  <div className="child sortdirection">
                    <i
                      className="fa fa-arrow-up fa-sm asc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('role')
                        setSortedDirection('asc')
                      }}
                    />{' '}
                    <i
                      className="fa fa-arrow-down fa-sm dsc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('role')
                        setSortedDirection('dsc')
                      }}
                    />
                  </div>
                </div>
              </th>
              <th id="columnName" onClick={() => setSortedField('addedDate')}>
                <div className="parent">
                  <div className="child">Date Added</div>
                  <div className="child sortdirection">
                    <i
                      className="fa fa-arrow-up fa-sm asc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('addedDate')
                        setSortedDirection('asc')
                      }}
                    />{' '}
                    <i
                      className="fa fa-arrow-down fa-sm dsc"
                      aria-hidden="true"
                      onClick={() => {
                        setSortedField('addedDate')
                        setSortedDirection('dsc')
                      }}
                    />
                  </div>
                </div>
              </th>
              <th id="columnName">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {users.map((user) => (
              <User user={user} deleteRecord={deleteRecord} key={user._id} />
            ))} */}
            {userList()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowUsersList
