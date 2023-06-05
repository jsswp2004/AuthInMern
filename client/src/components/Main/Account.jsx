import { useState, useEffect, createContext, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import styles from '../Signup/styles.module.css'
import HeaderMain from '../shared/HeaderMain'
import BodyLogo from '../shared/BodyLogo'
import StripeCheckoutButton from '../Stripe/stripeButton';
import {
    States
} from '../listDictionaries/listData/listDictionariesData'

export const UserContext = createContext()

const Register = () => {
    const statevalues = States
    const [selectedState, setSelectedState] = useState('')

    const handleStateChange = (e) => {
        setSelectedState(e.target.value)
    }


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

        name: '',
        email: '',
        password: '',
        companyName: '',
        role: '',
        phoneNumber: '',
        state: '',
        country: '',
        termsAndConditions: '',
        captcha: '',
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
            const url = 'http://localhost:8081/api/accounts'
            const { data: res } = await axios.post(url, data)
            navigate('/payment')
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
    const totalPrice = 0;
    const totalPrice2 = 7;

    return (
        <div className="grid_container_home">
            <div className="item1_home">
                <HeaderMain />
            </div>
            <div className="item3_home">
                <div className={styles.signup_container}>
                    <div className={styles.signup_form_container}>
                        {/* <div className={styles.left}>
                            <h1>Welcome Back</h1>
                            <Link to="/login">
                                <button type="button" className={styles.white_btn}>
                                    Sign in
                                </button>
                            </Link>
                        </div> */}
                        <div className={styles.right}>
                            <div style={{ marginBottom: '5px' }} >
                                <BodyLogo />
                            </div>
                            <h5>Register an Account</h5>
                            <div style={{ display: 'flex' }}>

                                <form className={styles.form_container} onSubmit={handleSubmit}>



                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleChange}
                                        value={data.name}
                                        required
                                        className={styles.input}
                                    />
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
                                        placeholder="Company Name"
                                        name="companyName"
                                        onChange={handleChange}
                                        value={data.companyName}
                                        required
                                        className={styles.input}
                                    />
                                    <select
                                        key={rolex.role}
                                        placeholder="Admin"
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
                                        display="none"
                                        type="phone"
                                        placeholder="Phone Number"
                                        name="name"
                                        value={data.phoneNumber}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />

                                    <select
                                        key={selectedState.name}
                                        placeholder="Select State"
                                        name="state"
                                        className="form-control select"
                                        value={data.state}
                                        onChange={handleChange}
                                    >
                                        <option key="0" value="">
                                            Select State
                                        </option>
                                        {statevalues.map((stateval) => (
                                            <option key={stateval.value} value={stateval.value}>{stateval.name}</option>
                                        ))}
                                    </select>

                                    {/* <select
                                        key={rolex.role}
                                        placeholder="Admin"
                                        name="country"
                                        className="form-control select"
                                        value={data.country}
                                        onChange={handleChange}
                                    >
                                        <option key="0" value="">
                                            Select Country
                                        </option>
                                        {userRoles.map((role) => (
                                            <option key={role._id} value={role.name}>
                                                {role}
                                            </option>
                                        ))}
                                    </select> */}

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
                                        Pay Total of $ {totalPrice} today for your 7 days free trial.
                                    </p>
                                    <p>
                                        You will be charged $ {totalPrice2} after your trial period
                                        <br />
                                        and every month for your (designated) subscription.
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

export default Register
