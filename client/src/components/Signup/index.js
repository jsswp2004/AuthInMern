import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import styles from './styles.module.css'

export const UserContext = createContext()

const Signup = () => {
  //Define the state
  // const [userID, setUserID] = useState('')
  const [rolex, setRoles] = useState([])
  const roles = rolex.filter((role) => {
    return role.name.toString().toLowerCase()
  })
  const userRoles = roles.map((role) => {
    return role.name
  })
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

  const navigate = useNavigate()
  const dateAdded = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: dateAdded,
  })

  const [error, setError] = useState('')
 
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = 'http://localhost:8081/api/users'
      const { data: res } = await axios.post(url, data)
      navigate('/login')
      console.log(res.message)
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
    // setUserID(data)
  }

  return (
    // <UserContext.Provider value={userID}>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sign in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>

              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className={styles.input}
              />
              <input
                display="none"
                type="text"
                placeholder="Full Name (optional)"
                name="name"
                defaultValue={data.firstName + '' + data.lastName}
                value={data.name}
                onChange={handleChange}
                className={styles.input}
              />
              {/* <input
              type="text"
              placeholder="Role"
              name="role"
              onChange={handleChange}
              value={data.role}
              required
              className={styles.input}
            /> */}
              <select
                key={rolex.role}
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
              </select>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="dateAdded"
                onChange={handleChange}
                value={dateAdded}
                required
                readOnly
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    // </UserContext.Provider>
  )
}

export default Signup
