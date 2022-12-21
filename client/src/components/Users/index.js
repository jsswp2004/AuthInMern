import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navigation/navbar'
const User = (props) => (
  <tr>
    <td>{props.user.firstName}</td>
    <td>{props.user.lastName}</td>
    <td>{props.user.email}</td>
    <td>
      <Link className="btn btn-info btn-sm" to={`/edit/${props.user._id}`}>
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </Link>{' '}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          props.deleteRecord(props.user._id)
        }}
      >
        <i className="fa fa-trash-o" aria-hidden="true" />
      </button>
    </td>
  </tr>
)

export default function Users() {
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  // console.log(searchInput)
  // This method fetches the users from the database.
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:8080/api/users`)

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const users = await response.json()
      setUsers(users)
    }

    getUsers()

    return
  }, [users.length])

  //this method will filter the table
  const filteredData = users.filter((el) => {
    //if no input the return the original
    if (searchInput === '') {
      return el
    }
    //return the item which contains the user input
    else {
      return Object.values(el) //el.medicalRecordNumber
        .toString()
        .toLowerCase()
        .includes(searchInput)
    }
  })

  // This method will delete a user
  async function deleteRecord(id) {
    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'DELETE',
    })

    const newUsers = users.filter((el) => el._id !== id)
    setUsers(newUsers)
  }

  // This method will map out the users on the table
  function userList() {
    return filteredData.map((user) => {
      return (
        <User
          user={user}
          deleteRecord={() => deleteRecord(user._id)}
          key={user._id}
        />
      )
    })
  }

  // This following section will display the table with the users of individuals.
  return (
    <div className="grid-container">
      <div className="item1" style={{ height: 50 }}>
        <div className="div-items" style={{ marginRight: 'auto' }}>
          <h3>Patient List</h3>
        </div>
        <div className="div-items" style={{ float: 'right' }}>
          <label htmlFor="search">
            Search :{' '}
            <input
              id="search"
              type="text"
              placeholder="Search here"
              onChange={handleChange}
              value={searchInput}
            />
          </label>
        </div>
      </div>
      <div className="item2" style={{ height: 'calc(100vh - 60px)' }}>
        <Navbar></Navbar>
      </div>

      <div className="item3">
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{userList()}</tbody>
        </table>
      </div>
    </div>
  )
}
