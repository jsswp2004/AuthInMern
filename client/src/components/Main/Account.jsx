import { useState, useEffect, createContext, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import styles from '../Signup/styles.module.css'
import styles2 from './styles.module.css'

import HeaderMain from '../shared/HeaderMain'
import BodyLogo from '../shared/BodyLogo'
import StripeCheckoutButton from '../Stripe/stripeButton';
import {
    States,
    RegistrationRoles
} from '../listDictionaries/listData/listDictionariesData'
import { is } from 'date-fns/locale'

export const UserContext = createContext()

const Register = () => {
    // Define STates
    const statevalues = States
    const [selectedState, setSelectedState] = useState('')

    const handleStateChange = (e) => {
        setSelectedState(e.target.value)
    }

    // RegistrationRoles

    //Define the Role

    const rolevalues = RegistrationRoles
    const [selectedRole, setSelectedRole] = useState('')
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value)
    }

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
    const lastUpdate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

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
        lastUpdated: lastUpdate,
        facilityID: 'Generic Clinic',
    })


    const [error, setError] = useState('')

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const { email, lastUpdated } = data
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
    // const totalPrice = 0;
    // const totalPrice2 = 7;
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };




    return (
        <div className="grid_container_home">
            <div className="item1_home">
                <HeaderMain />
            </div>
            <div className="item3_home">
                <div className={styles.signup_container}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ alignSelf: 'center', justifyContent: 'center' }}>
                            <BodyLogo style={{ alignSelf: 'center' }} />
                            <div style={{ marginBottom: '5px', justifyContent: 'center', textAlign: 'center' }} >
                                <h5>Register</h5>
                            </div>

                        </div>
                        <div className={styles.right}>

                            <div style={{ display: 'flex' }}>
                                <form style={{ display: 'flex', flexDirection: 'row' }} onSubmit={handleSubmit}>
                                    <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
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

                                        <select
                                            key={selectedRole.label}
                                            placeholder="Select Role"
                                            name="role"
                                            className={styles.input}
                                            value={data.role}
                                            onChange={handleChange}
                                        >
                                            <option key="0" value="">
                                                Select Role
                                            </option>
                                            {rolevalues.map((roleval) => (
                                                <option key={roleval.value} value={roleval.value}>{roleval.label}</option>
                                            ))}
                                        </select>

                                        <select
                                            key={selectedState.name}
                                            placeholder="Select State"
                                            name="state"
                                            className={styles.input}
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

                                        <input
                                            type="text"
                                            name="country"
                                            placeholder='United States'
                                            onChange={handleChange}
                                            value={data.country}
                                            required
                                            // readOnly
                                            className={styles.input}
                                        />

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            name="companyName"
                                            onChange={handleChange}
                                            value={data.companyName}
                                            required
                                            className={styles.input}
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                            value={data.phoneNumber}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />

                                        <input
                                            type="text"
                                            name="dateAdded"
                                            onChange={handleChange}
                                            value={dateAdded}
                                            // required
                                            readOnly
                                            className={styles.input}
                                        />
                                        <input
                                            type="text"
                                            name="lastUpdated"
                                            onChange={handleChange}
                                            value={data.lastUpdated}
                                            // required
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

                                        <label >
                                            <input
                                                type="checkbox"
                                                id='termsAndConditions'
                                                name="termsAndConditions"
                                                onChange={handleChange}
                                                value={isChecked}
                                                required
                                                onClick={handleCheckboxChange}
                                            // checked={isChecked}
                                            // className={styles.input}
                                            />
                                            &nbsp;I have read and agree to the terms and conditions.
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="captcha"
                                                onChange={handleChange}
                                                value={isChecked}
                                                required
                                                onClick={handleCheckboxChange}
                                            // className={styles.input}
                                            />
                                            &nbsp;I am not a robot.
                                        </label>
                                        {error && <div className={styles.error_msg}>{error}</div>}
                                        <button type="submit" className={styles.green_btn}>
                                            Sign Up
                                        </button>
                                    </div>

                                </form>

                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default Register
