import "./ClassicAbout.css";
import "./ClassicHome.css";
import "../../global.css";
import styles from '../Signup/styles.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'
import { format } from 'date-fns'
import axios from 'axios'

const ClassicContact = () => {
    const [status, setStatus] = useState("Submit");
    const [mail, setMail] = useState({
        name: '',
        email: '',
        message: '',
    })
    // const onChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value })
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value
        };
        // let response =
        // await fetch("http://localhost:8081/api/emails", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //     },
        //     body: JSON.stringify(details),
        // });

        axios
            .post('http://localhost:8081/api/emails', details)
            .then((res) => {
                setMail({
                    name: '',
                    email: '',
                    message: '',
                })
                // navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
        setStatus("Submit");
        // let result = await response.json();
        // alert(response.status);
    }


    // end of new code
    // const [user, setUser] = useState({
    //     name: '',
    //     firstName: '',
    //     lastName: '',
    //     role: '',
    //     email: '',
    //     password: '',
    //     addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    // })

    // const fullName = user.firstName + ' ' + user.lastName
    // const onChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value })
    // }

    // const onSubmit = async (e) => {
    //     e.preventDefault()

    //     axios
    //         .post('http://localhost:8081/api/users', user)
    //         .then((res) => {
    //             setUser({
    //                 name: fullName,
    //                 firstName: '',
    //                 lastName: '',
    //                 role: '',
    //                 email: '',
    //                 password: '',
    //                 addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    //             })
    //             navigate('/login')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // const navigate = useNavigate()
    // const toSignup = () => {
    //     localStorage.removeItem('token')
    //     navigate('/Signup')
    // }
    //#region Define the state for create registration modal

    const [showPrivacy, setShowPrivacy] = useState(false)
    const handleClosePrivacy = () => setShowPrivacy(false)
    const handleShowPrivacy = () => {
        setShowPrivacy(true)
    }
    //#endregion
    //#region Method to set show for create modal to false
    const handleClickPrivacy = (e) => {
        e.preventDefault()
        setShowPrivacy(false)
    }
    //#endregion
    //#region Create Registration Modal
    const PrivacyModal = () => (
        <>
            <Modal show={showPrivacy} onHide={handleClosePrivacy} size="lg" centered>
                <Modal.Header>
                    <Modal.Title>Privacy Policy</Modal.Title>
                    <Button variant="secondary" onClick={handleClickPrivacy} >
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <PrivacyPolicy />
                </Modal.Body>
            </Modal>
        </>
    )

    // Function to display create registration modal
    function displayPrivacyModal() {
        return <PrivacyModal />
    }
    //#endregion
    //#region Define the state for create registration modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
    }
    //#endregion
    //#region Method to set show for create modal to false
    const handleClick = (e) => {
        e.preventDefault()
        setShow(false)
    }
    //#endregion
    //#region Create Registration Modal
    const TermsOfServiceModal = () => (
        <>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header>
                    <Modal.Title>Terms of Service</Modal.Title>
                    <Button variant="secondary" onClick={handleClick} >
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <TermsOfService />
                </Modal.Body>
            </Modal>
        </>
    )

    // Function to display create registration modal
    function displayTermsOfServiceModal() {
        return <TermsOfServiceModal />
    }
    //#endregion
    return (
        <div className="classic-home">

            <div className="aboutIntrosFlexContainer" >
                <div className="aboutIntros-TextContact">
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>

                        <div className="aboutIntros-TextContainerContact1" >
                            <div className='homeIntros-TextContainerContact'>
                                <p className="textInPage contactFontHeader">
                                    Explore the future with us.
                                    Feel free to get in touch.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className='formInqury'>
                                <div className='form-group contactFont'>
                                    <label htmlFor="name" className="textInPageh6 contactFont" required>Name:
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                        // value={user.name}
                                        // onChange={onChange}
                                        // className={styles.formControl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group contactFont'>
                                    <label htmlFor="email" className="textInPageh6 contactFont">Email:
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                        // value={user.email}
                                        // onChange={onChange}
                                        // className={styles.formControl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group contactFont'>
                                    <label htmlFor="message" className="textInPageh6 contactFont">Message:
                                        <textarea
                                            className="form-control"
                                            rows='15'
                                            cols='40'
                                            // type="textarea"
                                            id="message"
                                        // value={user.email}
                                        // onChange={onChange}
                                        // className={styles.formControl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group contactFont' >
                                    <button type="submit" className='btn btn-primary'>

                                        {status}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="aboutIntros-TextContainerContact2" >
                            <div className="poehrIntros-ImageContact" />
                        </div>
                    </div>

                </div>

            </div>

            <div>{displayTermsOfServiceModal()}</div>
            <div>{displayPrivacyModal()}</div>
            <div className="footer-strip" >
                <b className="terms-of-service"><button className="btn" onClick={handleShow}>Terms of Service</button></b>
                <b className="privacy-policy"><button className="btn" onClick={handleShowPrivacy}>Privacy Policy</button></b>
                <b className="copyright"><button className="btn" >© 2023 POEHR. All Rights Reserved.</button></b>

            </div>
        </div>
    );
};

export default ClassicContact;
