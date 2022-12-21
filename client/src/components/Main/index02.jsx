import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import logo from '../shared/images/logoPOWER.png'
import { Link } from 'react-router-dom'
import Navbar from './index02'

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

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

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

  return (
    // <div className={styles.main_container}>
    //   <nav className={styles.navbar}>
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h3>POEHR</h3>

    //     <div className={styles.header_navbar_container}>
    //       <ul>
    //         <li className="navbar-list">
    //           <Link to="/create">Registration</Link>
    //         </li>
    //         <li className="navbar-list">
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li className="navbar-list">
    //           <Link to="/contact">Contact</Link>
    //         </li>
    //         <li className="navbar-list">
    //           <a href="#about">About </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className={styles.navbar}>
    //       <button className={styles.white_btn} onClick={handleLogout} >

    // 			  <i className="fa fa-sign-out-alt fa-lg" title="Log out" style={{ color: "red" }} aria-hidden="true"></i>
    //       </button>
    //     </div>
    //   </nav>

    // </div>

    <div className="grid-container">
      <div className="item1" style={{ height: 50 }}>
        <div className="div-items" style={{ marginRight: 'auto' }}>
          <h3>Users</h3>
        </div>

        <div className={styles.navbar}>
          <button className={styles.white_btn} onClick={handleLogout}>
            <i
              className="fa fa-sign-out-alt fa-lg"
              title="Log out"
              style={{ color: 'red' }}
              aria-hidden="true"
            ></i>
          </button>
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
              <th>Firstname</th>
              <th>Middlename</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{userList()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Main
