import { createContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import HeaderMain from '../shared/HeaderMain'
import HeaderLogo from '../shared/HeaderLogo'

export const UserContext = createContext();
export const RoleContext = createContext();
export const FirstNameContext = createContext();

const Login = () => {
  // const userToken = localStorage.getItem('token')
  // const useremail = localStorage.getItem('email')

  // let userData = useremail
  const [data, setData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  // const [user, setUser] = useState()
  // const [currentUser, setCurrentUser] = useState([])
  // const loggedUserRole = currentUser.map((user) => user.role)
  // const loggedUserFirstName = currentUser.map((user) => user.firstName)
  // console.log(userToken, useremail)
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

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
      window.location = '/patientlist'
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

  return (
    // <UserContext.Provider value={userData}>
    //   <RoleContext.Provider value={loggedUserRole}>
    //     <FirstNameContext.Provider value={loggedUserFirstName}>
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
                  <HeaderLogo />
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
    </div >
    //     </FirstNameContext.Provider>
    //   </RoleContext.Provider>
    // </UserContext.Provider>

  )
}

export default Login
