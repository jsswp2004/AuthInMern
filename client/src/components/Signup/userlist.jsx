import logo from '../shared/images/logoPOWER.png'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../Navigation/navbar'

const Users = (props) => (
  <tr>
    <td>{props.record.firstName}</td>
    <td>{props.record.lastName}</td>
    <td>{props.record.email}</td>
    <td>
      <Link className="btn btn-info btn-sm" to={`/edit/${props.record._id}`}>
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </Link>{' '}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          props.deleteRecord(props.record._id)
        }}
      >
        <i className="fa fa-trash-o" aria-hidden="true" />
      </button>
    </td>
  </tr>
)

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const [data, setData] = useState()

  const [userRecords, setUsersRecords] = useState([])

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const url = 'http://localhost:8080/api/userlist'
      const { data: res } = await axios.get(url, data)

      const userList = res.data
      setUsersRecords(userList)
      // window.location = '/'
    }

    getRecords()
  }, [data, userRecords.length])

  // This method will delete a record from the database
  async function deleteRecord(id) {
    await axios
      .delete(`http://localhost:8080/api/userlist/${id}`)
      .then(() => {
        console.log('delete successful')
      })
      .catch((error) => {
        console.log(error)
      })
    
    const newRecords = userRecords.filter((el) => el._id !== id)
    setUsersRecords(newRecords)
  }

  // const [user, setUserData] = useState()
  // async function updateUser(id) {
  //   await axios
  //     .put(`http://localhost:8080/api/userlist/${id}`)
  //     .then(() => {
  //       console.log('update successful')
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
    
  //   const newRecord = userRecords.filter((el) => el._id !== id)
  //   setUserData(newRecord)
  // }

  // This method will map out the records on the table
  function usersList() {
    return userRecords.map((record) => {
      return (
        <Users
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      )
    })
  }

  // console.log(usersList())
  return (
    <div className="grid-container">
      <div className="item1">
        <div className="header_logo">
          <img src={logo} className="App_logo" alt="poehr" />
          <h3>POEHR</h3>
        </div>

        <button
          className="btn btn-danger btn-sm btn-rounded"
          onClick={handleLogout}
        >
          <i
            className="fa fa-sign-out fa-lg"
            aria-hidden="true"
            title="Exit"
          ></i>
        </button>
      </div>
      <div className="item2">
        <Navbar/> 
      </div>

      <div className="item3">
        <h3>Users</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{usersList()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Main
