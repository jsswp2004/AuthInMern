import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
// import { format } from 'date-fns'
import axios from 'axios'
// import Navbar from '../../navigation/navbar'
// import Header from '../../shared/Header'

function SendSMSMessage(props) {

    const navigate = useNavigate()

    //iniitial state for mobile phone
    const [mobilePhone, setMobilePhone] = useState('')
    //deconstruct mobile phone
    const { cellphone } = mobilePhone

    //visit ID of patient selected from props
    const visitID = props.visitID



    //initial state of the message
    const [smsMessage, setSMSMassage] = useState({
        to: '',
        body: '',

    })

    //on change method to update the value from the jsx object
    const onChange = (e) => {
        setSMSMassage({ ...smsMessage, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/visits/${visitID}`)
            .then((res) => {
                setMobilePhone({
                    cellphone: res.data.cellphone,
                })
            })
            .catch((err) => {
                console.log('Error from UpdateVisitInfo')
            })

    }, [visitID])


    const onSubmit = (e) => {
        e.preventDefault()

        const { to, body } = e.target.elements;
        let message = {
            to: to.value,
            body: body.value
        };

        axios
            .post('http://localhost:8081/api/messages', message)
            .then((res) => {
                setSMSMassage({
                    to: '',
                    body: '',
                })
                console.log('Message successful!')
                // let result = res.json();
                alert('Message sent successfully');
                // Push to /
                // navigate('/clinicVisit')
                navigate(-1)
            })
            .catch((err) => {
                console.log('Error in Sending a message!')
            })
    }


    return (
        <div className="grid_containers">
            <div className="item3">
                {/* <h5 className="createPageHeader">Send a reminder to patient</h5> */}
                <div className="createRoleModalBody">
                    <form onSubmit={onSubmit} noValidate >
                        {/* onSubmit={onSubmit} */}
                        <div className="form-grid-containers modalContainer">
                            <div className="div-items">
                                <div className="forms-group">
                                    <div className="form-group">
                                        <label htmlFor="to">To:
                                            <input
                                                type="tel"
                                                className="form-control roleInput"
                                                name="to"
                                                id="to"
                                                value={cellphone}
                                                onChange={onChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">Message:
                                        <textarea
                                            type="text"
                                            className="form-control roleInput"
                                            name="body"
                                            id="body"
                                            // value={'Your appointment is coming up on'}
                                            onChange={onChange}
                                            rows='10'
                                            cols='40'
                                        />
                                    </label>
                                    {/* <input value="Add" type="submit" className="btn btn-success" /> */}
                                </div>
                                <button className="btn btn-success" type='submit'>Send message</button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SendSMSMessage
