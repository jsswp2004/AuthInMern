import "../Main/ClassicAbout.css";
import "../Main/ClassicHome.css";
import "../../global.css";
import styles from '../Signup/styles.module.css'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Modal, Button } from 'react-bootstrap'
// import TermsOfService from './TermsOfService'
// import PrivacyPolicy from './PrivacyPolicy'
// import { format } from 'date-fns'
// import { FacilityContext } from "../../App";
import axios from 'axios'

function SendEmailMessage(props) {
    // use navigate to redirect to a page
    const navigate = useNavigate();
    // use facility context to get facility data
    // const facilityName = useContext(FacilityContext);
    //initial state for patient email
    const [patientEmailAddress, setPatientEmailAddress] = useState('')
    //deconstruct patient email
    const { email } = patientEmailAddress
    //visit ID of patient selected from props
    const visitID = props.visitID
    //initial state of button message
    const [status, setStatus] = useState("Submit");
    //initial state of email
    const [mail, setMail] = useState({
        name: '',
        email: '',
        message: '',
    })

    //on change method to update the value from the jsx object
    const onChange = (e) => {
        setMail({ ...mail, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/visits/${visitID}`)
            .then((res) => {
                setPatientEmailAddress({
                    email: res.data.email,
                })
            })
            .catch((err) => {
                console.log('Error from UpdateVisitInfo')
            })

    }, [visitID])
    console.log(visitID)
    console.log(email)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        axios
            .post('http://localhost:8081/api/emails', details)
            .then((res) => {
                setMail({
                    name: '',
                    email: '',
                    message: '',
                })
                alert('Message sent successfully');
                navigate('/visitlist')
                // let result = res.json();
                // alert(result.status);
            })
            .catch((err) => {
                console.log(err)
                alert('Message sent error. Please contact site administrator.');
            })
        setStatus("Sent");
    }
    // end of new code

    //#region Define the state for create registration modal

    return (
        <div className="grid_containers">

            <div className="item3" >
                <div className="createRoleModalBody">
                    <form onSubmit={handleSubmit} className='formInqury'>
                        <div className="form-grid-containers modalContainer">
                            <div className="div-items">
                                <div className='form-group contactFont'>
                                    <label htmlFor="name" className="textInPageh6 contactFont" required>Name:
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                        // value={facilityName}
                                        // onChange={onChange}
                                        // className={styles.formControl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group contactFont'>
                                    <label htmlFor="email" className="textInPageh6 contactFont">Email:
                                        <input
                                            className="form-control"
                                            // type="email"
                                            type="text"

                                            id="email"
                                            value={email}
                                            onChange={onChange}
                                        // className={styles.formControl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group contactFont'>
                                    <label htmlFor="message" className="textInPageh6 contactFont">Message:
                                        <textarea
                                            className="form-control"
                                            rows='10'
                                            cols='40'
                                            // type="textarea"
                                            id="message"
                                            // value={user.email}
                                            onChange={onChange}
                                        // className={styles.formControl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group contactFont' >
                                    <button type="submit" className='btn btn-primary'>

                                        {status}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default SendEmailMessage;
