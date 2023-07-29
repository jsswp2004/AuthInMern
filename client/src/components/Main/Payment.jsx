import { useState, useEffect, createContext, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import styles from '../Signup/styles.module.css'
import HeaderMain from '../shared/HeaderMain'
import CheckOut from '../Stripe/CheckOutForm'
import { Elements } from "@stripe/react-stripe-js";
import BodyLogo from '../shared/BodyLogo'
import StripeCheckoutButton from '../Stripe/stripeButton';
import {
    States
} from '../listDictionaries/listData/listDictionariesData'
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = 'pk_test_51NAPxIFfk7zi0PnM7LYWqLVLIQwDr9FuQzQl5QEstme535leiUQeopQcJdErTlRQISIKSI0wjOt1zuqi9aKAwGgZ00lXn84J3k';

const stripePromise = loadStripe(publishableKey);
export const UserContext = createContext()

const Register = () => {
    // const statevalues = States
    // const [selectedState, setSelectedState] = useState('')

    // const handleStateChange = (e) => {
    //     setSelectedState(e.target.value)
    // }


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

    //this is code for strip button
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://js.stripe.com/v3/buy-button.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

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
    const totalPrice = 0;
    const totalPrice2 = 7;

    return (
        <div className="grid_container_home">
            <div className="item1_home">
                <HeaderMain />
            </div>
            {/* <script async
                                src="https://js.stripe.com/v3/buy-button.js">
                            </script> */}


            <div className="item3_home">
                <div className={styles.signup_container}>
                    <div className={styles.signup_form_container}>

                        <div className={styles.right}>
                            {/* <div style={{ marginBottom: '5px' }} >
                                <BodyLogo />
                            </div> */}
                            {/* <h5>Payment</h5> */}
                            <div style={{ display: 'flex' }}>
                                <div className={styles.form_container}>
                                    {/* <h5 style={{ textAlign: 'center' }}>Make Stripe Payment to POEHR, Inc.</h5>
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
                                    </p> */}
                                    {/* <stripe-buy-button
                                        buy-button-id="buy_btn_1NR3nNFfk7zi0PnMZTnJlmbX"
                                        publishable-key="pk_test_51NAPxIFfk7zi0PnM7LYWqLVLIQwDr9FuQzQl5QEstme535leiUQeopQcJdErTlRQISIKSI0wjOt1zuqi9aKAwGgZ00lXn84J3k"
                                    >
                                    </stripe-buy-button> */}

                                    <Elements stripe={stripePromise}>
                                        <CheckOut />
                                    </Elements>
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
