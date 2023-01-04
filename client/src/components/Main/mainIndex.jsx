import styles from './styles.module.css'
import LogoutIcon from '@mui/icons-material/Logout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// import Navbar from '../navigation/navbar'

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
  // useEffect(() => {
  //   async function getRecords() {
  //     const url = 'http://localhost:8080/api/userlist'
  //     const { data: res } = await axios.get(url, data)
  //     window.location = '/'
  //   }
  //   getRecords()
  // }, [data, userRecords.length])

  //     const response = await fetch(`http://localhost:8080/userlist/`)

  //     if (!response.ok) {
  //       const message = `An error occurred: ${response.statusText}`
  //       window.alert(message)
  //       return
  //     }

  //     const records = await response.json()
  //     setUsersRecords(records)
  //   }

  //   getRecords()

  //   return
  // }, [userRecords.length]

  // )

  // This method will delete a record
  // async function deleteRecord(id) {
  //   await fetch(`http://localhost:8080/userlist/${id}`, {
  //     method: 'DELETE',
  //   })

  //   const newRecords = userRecords.filter((el) => el._id !== id)
  //   setUsersRecords(newRecords)
  // }

  // This method will map out the records on the table
  // function usersList() {
  //   return userRecords.map((record) => {
  //     return (
  //       <Users
  //         record={record}
  //         deleteRecord={() => deleteRecord(record._id)}
  //         key={record._id}
  //       />
  //     )
  //   })
  // }

  return (
    // <div className='main_container'>
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>POEHR</h1>
        <button className={styles.white_btn} >
          {/* Logout */}
          <LogoutIcon className={styles.tooltip} onClick={handleLogout}>Log Out
          <span className={styles.tooltiptext}>Exit</span>
          </LogoutIcon>
        </button>
      </nav>
      {/* <div className="item3">
        <table className="table table-striped" style={{ marginTop: 20 }}>
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
      </div> */}
    </div>
  )
}

export default Main
