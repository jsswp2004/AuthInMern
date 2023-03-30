import "./ClassicAbout.css";
import "../../global.css";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

const ClassicHome = () => {

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
                <div className="aboutIntros-Text">
                    <b className="aboutIntros-TextContainer">
                        <p className="textInPage">About us</p>
                    </b>
                    <div className="aboutIntros-TextContainer2">
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            We offer revolutionary solution to industry problems.
                        </p>
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Join POEHR community and experience the benefits of patient management optimization today!
                        </p>
                    </div>
                    <div className="aboutIntros-Image"></div>
                    <b className="aboutIntros-TextContainer">
                        <p className="textInPage">Our mission</p>
                    </b>
                    <div className="aboutIntros-TextContainer2">
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            At POEHR, we are committed to providing excellent services to our customers </p>
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            and clients and to help them achieve the best outcomes.
                        </p>
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            We believe that we can make a positive impact on our community, industry and the world. </p>
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Our POEHR team is dedicated to providing the best possible service and support,
                        </p>
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            and we are always looking for ways to improve and innovate.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
                        <div className="aboutIntros-TextContainer1" >Let's start working more efficiently today!</div>
                        <div className="aboutIntrosWorkingEfficiently-Image"></div>
                    </div>
                    <b className="aboutIntros-TextContainer">
                        <p className="textInPage">Our Team</p>
                    </b>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%', width: '120px', height: '220px' }}>
                            <div className="aboutIntrosTeam-Image-Jess" />
                            <p className="aboutIntros-TeamContainer1" ><b>Jesus Salvacion</b> CEO/CTO</p>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%', width: '120px', height: '220px' }}>
                            <div className="aboutIntrosTeam-Image"></div>
                            <p className="aboutIntros-TeamContainer1" ><b>Charlina Pangilinan</b> COO</p>
                        </div>
                    </div>

                </div>

            </div>
            {/* Introducing the poehr solution */}
            <div className="poehrIntrosFlexContainer bottomMargin" >
                <div className="poehrIntros-Text">
                    <div className="poehrIntros-InnerBackground" >
                        <div className="poehrIntros-InnerBackgroundText">
                            <b>
                                <p className="textInPage">Get started  </p>
                                <p className="textInPage">with POEHR.</p>
                                <p className="textInPageh6">Start optimizing your scheduling processes today!</p>

                            </b>
                            <button className='btn  btn-primary  ' onClick={toSignup} >
                                Try for free
                            </button>
                        </div>

                    </div>
                </div>
                <div className="poehrIntros-Image">
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
