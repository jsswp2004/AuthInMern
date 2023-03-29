import "./ClassicAbout.css";
import "./ClassicHome.css";
import "../../global.css";
import styles from '../Signup/styles.module.css'
import { useState, useEffect } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'
import { format } from 'date-fns'
import axios from 'axios'

const ClassicHome = () => {
    const [role, setRoles] = useState(
        {
            name: '',
        }
    )
    useEffect(() => {
        axios
            .get('http://localhost:8081/api/roles')
            .then((response) => {
                setRoles(response.data)
                // .filter=(user) => user.role === 'Attending'
            })
            .catch((error) => {
                console.log('Error from roles list')
            })
    }, [])
    const [user, setUser] = useState({
        name: '',
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        password: '',
        addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    })

    const fullName = user.firstName + ' ' + user.lastName
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        axios
            .post('http://localhost:8081/api/users', user)
            .then((res) => {
                setUser({
                    name: fullName,
                    firstName: '',
                    lastName: '',
                    role: '',
                    email: '',
                    password: '',
                    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                })
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const navigate = useNavigate()
    const toSignup = () => {
        localStorage.removeItem('token')
        navigate('/Signup')
    }
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
            {/* Introduction */}
            <div className="aboutIntrosFlexContainer" >
                <div className="aboutIntros-TextContact">
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>

                        <div className="aboutIntros-TextContainerContact1" >
                            <div className='homeIntros-TextContainer'>
                                <p className="textInPage contactFontHeader">
                                    Explore the future with us.
                                    Feel free to get in touch.
                                </p>
                            </div>
                            <form onSubmit={onSubmit} className='formInqury'>
                                <div className='form-group'>
                                    <label htmlFor="name" className="textInPageh6 contactFont">Name: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        // value={user.name}
                                        onChange={onChange}
                                    // className={styles.formControl}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="email" className="textInPageh6 contactFont">Email: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        // value={user.email}
                                        onChange={onChange}
                                    // className={styles.formControl}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="message" className="textInPageh6 contactFont">Message: </label>
                                    <textarea
                                        className="form-control"
                                        rows='15'
                                        cols='40'
                                        type="textarea"
                                        name="message"
                                        // value={user.email}
                                        onChange={onChange}
                                    // className={styles.formControl}
                                    />
                                </div>
                                <div >
                                    {/* <div className={styles.formGroup} ></div>*/}
                                    <button type="submit" className='btn btn-primary'>
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="poehrIntros-ImageContact" />
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

export default ClassicHome;
