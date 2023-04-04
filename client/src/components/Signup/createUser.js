import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import styles from './styles.module.css'

const CreateUser = () => {
  //Define the state
  const [role, setRoles] = useState(
    {
      name: '',
    }
  )
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/roles')
      .then((response) => {
        setRoles(response.data)
        // .filter=(user) => user.role === 'Attending'
      })
      .catch((error) => {
        console.log('Error from roles list')
      })
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    facilityID: 'Generic Clinic',
  })

  const fullName = user.firstName + ' ' + user.lastName
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8081/api/users', user)
      .then((res) => {
        setUser({
          name: fullName,
          firstName: '',
          lastName: '',
          role: '',
          email: '',
          password: '',
          addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          facilityID: 'Generic Clinic',
        })
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select
            key={role._id}
            name="role"
            className='form-control select'
            value={user.role}
            onChange={onChange}
          >
            <option key="0" value=''>Select Role</option>
            {role.map((role) => (
              <option key={role._id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="addedDate">Added Date</label>
          <input
            type="text"
            name="addedDate"
            value={user.addedDate}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="addedDate">Added Date</label>
          <input
            type="text"
            name="facilityID"
            value={user.facilityID}
            onChange={onChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.btn}>
            Create User
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateUser
