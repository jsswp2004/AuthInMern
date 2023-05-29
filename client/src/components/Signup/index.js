import { useState, useEffect, createContext, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import styles from './styles.module.css'
import HeaderMain from '../shared/HeaderMain'
import BodyLogo from '../shared/BodyLogo'
import StripeCheckoutButton from '../Stripe/stripeButton';


export const UserContext = createContext()

const Signup = () => {


  //Define the state
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
    facilityID: 'Generic Clinic',
  })


  const [error, setError] = useState('')

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }

  const { email } = data
  const emailRef = useRef()
  useEffect(() => {
    emailRef.current = email
  }, [email])

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
  const totalPrice = 58;

  return (
    <div className="grid_container_home">
      <div className="item1_home">
        <HeaderMain />
      </div>
      <div className="item3_home">
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
              <div style={{ marginBottom: '5px' }} >
                <BodyLogo />
              </div>
              <h5>Create Account</h5>
              <div style={{ display: 'flex' }}>

                <form className={styles.form_container} onSubmit={handleSubmit}>



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
                  <input
                    type="text"
                    // placeholder="Role"
                    name="facilityID"
                    onChange={handleChange}
                    value={data.facilityID}
                    // required
                    className={styles.input}
                  />
                  {error && <div className={styles.error_msg}>{error}</div>}
                  <button type="submit" className={styles.green_btn}>
                    Sign Up
                  </button>
                </form>
                <div className={styles.form_container}>
                  {/* <header className="App-header"> */}
                  <h5 style={{ textAlign: 'center' }}>Make Stripe Payment to POEHR, Inc.</h5>
                  <p>
                    Pay Total of $ {totalPrice}
                  </p>
                  <p>
                    <StripeCheckoutButton email={data.email} price={totalPrice} />
                  </p>
                  {/* </header> */}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Signup
