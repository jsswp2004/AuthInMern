import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import HeaderMain from '../shared/HeaderMain'
import HeaderLogo from '../shared/HeaderLogo'
import BodyLogo from '../shared/BodyLogo'

// export const UserContext = createContext();
export const RoleContext = createContext();
// export const FirstNameContext = createContext();

const Login = () => {
  // const userToken = localStorage.getItem('token')
  // const useremail = localStorage.getItem('email')

  // let userData = useremail
  const [data, setData] = useState({ email: '', password: '' })
  const [rolex, setRolex] = useState({ role: '' })
  const [error, setError] = useState('')
  const userData = data.email
  const userRole = data.role
  // const { role } = userRole
  // const [user, setUser] = useState()
  // const [currentUser, setCurrentUser] = useState([])
  // const loggedUserRole = currentUser.map((user) => user.role)
  // const loggedUserFirstName = currentUser.map((user) => user.firstName)
  // console.log(userData, rolex.role)
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  //this includes setting the local storage item
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = 'http://localhost:8081/api/auth'
      const { data: res } = await axios.post(url, data)
      // set the state of the user
      // setUser(res.data)
      localStorage.setItem('token', res.data)
      localStorage.setItem('email', data.email)
      // setCurrentUser(data.email)
      // console.log(res.data)
      window.location = '/applications'
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users`)
      .then((response) => {
        const data = response.data
        setRolex(data.find((user) => user.email === userData))
        // (data.find((user) => user.email === useremail))
        console.log(data)
      })
      // .includes((user) => user.email === userData)
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [userData])

  return (
    // <UserContext.Provider value={userData}>
    <RoleContext.Provider value={userRole}>
      {/* //     <FirstNameContext.Provider value={loggedUserFirstName}>  */}
      <div className="grid_container_home">
        <div className="item1_home">
          <HeaderMain />
        </div>
        <div className="item3_home">
          <div className={styles.login_container}>
            <div className={styles.login_form_container}>
              <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '30px' }} >
                    <BodyLogo />
                  </div>
                  <h5>Login to Your Account</h5>
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
                  {error && <div className={styles.error_msg}>{error}</div>}
                  <button type="submit" className={styles.green_btn}>
                    Sign In
                  </button>
                </form>
              </div>
              <div className={styles.right}>
                <h1>New Here?</h1>
                <Link to="/signup">
                  <button type="button" className={styles.white_btn}>
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //     </FirstNameContext.Provider> */}
    </RoleContext.Provider>
    // {/* </UserContext.Provider> */}

  )
}

export default Login
