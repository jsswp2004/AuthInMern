import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
// import { format } from 'date-fns'
import axios from 'axios'
// import Navbar from '../../navigation/navbar'
// import Header from '../../shared/Header'

function SendSMSMessage(props) {

    // const navigate = useNavigate()
    const [mobilePhone, setMobilePhone] = useState('')

    const onChange = (e) => {
        setMobilePhone({ ...mobilePhone, [e.target.name]: e.target.value })
    }

    console.log(mobilePhone)
    const visitID = props.visitID

    const { cellphone } = mobilePhone
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


    // const onSubmit = (e) => {
    //     e.preventDefault()

    //     axios
    //         .post('http://localhost:8081/api/roles', role)
    //         .then((res) => {
    //             setRole({
    //                 name: '',
    //                 addedDate: '',
    //             })

    //             // Push to /
    //             navigate('/settingsPage')
    //         })
    //         .catch((err) => {
    //             console.log('Error in CreateRole!')
    //         })
    // }
    // console.log(role)

    return (
        <div className="grid_containers">
            <div className="item3">
                {/* <h5 className="createPageHeader">Send a reminder to patient</h5> */}
                <div className="createRoleModalBody">
                    <form noValidate >
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
                                            value={'Your appointment is coming up on'}
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
