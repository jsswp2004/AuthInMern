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
    const [showFAQ, setShowFAQ] = useState(false)
    const [showFAQ1, setShowFAQ1] = useState(false)
    const [showFAQ2, setShowFAQ2] = useState(false)
    const [showFAQ3, setShowFAQ3] = useState(false)
    const [showFAQ4, setShowFAQ4] = useState(false)
    const [showFAQ5, setShowFAQ5] = useState(false)


    return (
        <div className="classic-home">
            {/* Introduction */}
            <div className="pricingIntrosFlexContainer" >
                <div className="pricingIntros-Text">
                    <b className="pricingIntros-TextContainer">
                        <p className="textInPage">Pricing</p>
                    </b>
                    <div className="pricingIntros-TextContainer2">
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Our pricing is not expensive,
                        </p>
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            but it's not cheap either, it's exactly what it should be
                        </p>
                    </div>
                </div>
                <div className="pricingContainerRectangleBackground">

                    <div className="pricingContainerRectangleBackground1" >
                        <div>
                            <p className="textInPageh6 pricingTextBold">
                                BASIC
                            </p>
                        </div>
                        <div className="pricingContainerRectangleBackground2Price" >
                            <div style={{ marginTop: '5%' }}>
                                <p className="textInPageh6 pricingTextBold pricingTextSize10">
                                    $
                                </p>
                            </div>
                            <div>
                                <p className="textInPageh6 pricingTextBold pricingTextSize50">
                                    299
                                </p>
                            </div>
                            <div style={{ marginTop: '5%' }}>
                                <p className="textInPageh6 pricingTextBold pricingTextSize30">
                                    /month
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="textInPage h6 aboutIntros-TextContainerWidth">
                                For small practice clinics and
                                independent practitioners
                            </p>
                        </div>
                        <button className="btn btn-primary btnWidth">Get Started with Basic</button>

                    </div>
                    <div className="pricingContainerRectangleBackground2">
                        <div>
                            <p className="textInPageh6 pricingTextBold">
                                PRO
                            </p>
                        </div>
                        <div className="pricingContainerRectangleBackground2Price2" >
                            <div style={{ marginTop: '5%' }}>
                                <p className="textInPageh6 pricingTextBold pricingTextSize10">
                                    $
                                </p>
                            </div>
                            <div>
                                <p className="textInPageh6 pricingTextBold pricingTextSize50">
                                    599
                                </p>
                            </div>
                            <div style={{ marginTop: '5%' }}>
                                <p className="textInPageh6 pricingTextBold pricingTextSize30">
                                    /month
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="textInPage h6 aboutIntros-TextContainerWidth">
                                For growing clinics and businesses
                            </p>
                        </div>
                        <button className="btn btn-primary btnWidth">Get Started with Pro</button>
                    </div>
                    {/* </div> */}
                    <div className="pricingContainerRectangleBackground3">
                        <div>
                            <p className="textInPageh6 pricingTextBold">
                                BUSINESS
                            </p>
                        </div>
                        <div className="pricingContainerRectangleBackground2Price" >
                            <div style={{ marginTop: '5%' }}>
                                <p className="textInPageh6 pricingTextBold pricingTextSize10">
                                    $
                                </p>
                            </div>
                            <div>
                                <p className="textInPageh6 pricingTextBold pricingTextSize50">
                                    999
                                </p>
                            </div>
                            <div style={{ marginTop: '5%' }}>
                                <p className="textInPageh6 pricingTextBold pricingTextSize30">
                                    /month
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="textInPage h6 aboutIntros-TextContainerWidth">
                                For organizations with advanced needs
                            </p>
                        </div>
                        <button className="btn btn-primary btnWidth">Get Started with Pro</button>

                    </div>
                </div>
            </div>
            <div className="poehrIntros-InnerBackgroundText">
                <b>
                    <p className="textInPage">Compare Features</p>
                </b>
                <hr />
                <div style={{ justifyContent: 'center', display: 'flex', flexFlow: 'row', flexDirection: 'row' }}>
                    <div style={{ width: '15%' }} >
                        <p className="pricingTextSize30 ">BASIC</p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Schedule Management
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Time Tracking
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Retention Metrics
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Reports
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Email Integration
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}SMS Reminders
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Patient Self-scheduling Portal
                        </p>

                    </div>
                    <div style={{ width: '15%' }}>
                        <p className="pricingTextSize30 ">PRO</p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Schedule Management
                        </p>                  <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Time Tracking
                        </p>                  <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Retention Metrics
                        </p>                  <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Reports
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Email Integration
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}SMS Reminders
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Automated SMS and Email Reminders
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Real-time Collaboration Support
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Patient Self-scheduling Portal
                        </p>
                    </div>
                    <div style={{ width: '15%' }}>
                        <p className="pricingTextSize30 ">BUSINESS</p>

                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Schedule Management
                        </p>                  <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Time Tracking
                        </p>                  <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Retention Metrics
                        </p>                  <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Reports
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Email Integration
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}SMS Reminders
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Automated SMS and Email Reminders
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Real-time Collaboration Support
                        </p>
                        {/* <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Automated Workflows
                        </p> */}
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Analytics
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Process Analysis
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}SLA Management
                        </p>
                        <p className="pricingTextSize10">
                            <i className="fa fa-star fa-sm" aria-hidden="true" style={{ color: 'blue' }}></i>
                            {' '}Patient Self-scheduling Portal
                        </p>
                    </div>
                </div>
                <div className="pricingIntros-Image" />


            </div>
            <div className="pricingIntrosFlexContainer" >
                <div className="pricingIntros-Text">
                    <b className="pricingIntros-TextContainerFAQ">
                        <p className="textInPage">Frequently asked questions</p>
                    </b>
                    <div className="pricingIntros-TextContainer2FAQ">
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            How does this work?{' '}
                            <i className="fa fa-chevron-down fa-sm" onClick={x => setShowFAQ(!showFAQ)} aria-hidden="true"></i>
                        </p>
                        <label style={{ display: showFAQ === true ? 'inline-block' : 'none', width: '40vw' }} className="textInPage aboutIntros-TextContainerWidt pricingFAQTextArea" rows="15" cols="50">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                        </label>
                        <hr className="hrPricing" />
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            What are the benefits?{' '}
                            <i className="fa fa-chevron-down fa-sm" onClick={x => setShowFAQ1(!showFAQ1)} aria-hidden="true"></i>
                        </p>
                        <label style={{ display: showFAQ1 === true ? 'inline-block' : 'none', width: '40vw' }} className="textInPage aboutIntros-TextContainerWidt pricingFAQTextArea" rows="15" cols="50">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                        </label>
                        <hr className="hrPricing" />
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Is it difficult to use?{' '}
                            <i className="fa fa-chevron-down fa-sm" onClick={x => setShowFAQ2(!showFAQ2)} aria-hidden="true"></i>
                        </p>
                        <label style={{ display: showFAQ2 === true ? 'inline-block' : 'none', width: '40vw' }} className="textInPage aboutIntros-TextContainerWidt pricingFAQTextArea" rows="15" cols="50">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                        </label>
                        <hr className="hrPricing" />
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Can I have custom pricing?{' '}
                            <i className="fa fa-chevron-down fa-sm" onClick={x => setShowFAQ3(!showFAQ3)} aria-hidden="true"></i>
                        </p>
                        <label style={{ display: showFAQ3 === true ? 'inline-block' : 'none', width: '40vw' }} className="textInPage aboutIntros-TextContainerWidt pricingFAQTextArea" rows="15" cols="50">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                        </label>
                        <hr className="hrPricing" />
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Is there trial version available?{' '}
                            <i className="fa fa-chevron-down fa-sm" onClick={x => setShowFAQ4(!showFAQ4)} aria-hidden="true"></i>
                        </p>
                        <label style={{ display: showFAQ4 === true ? 'inline-block' : 'none', width: '40vw' }} className="textInPage aboutIntros-TextContainerWidt pricingFAQTextArea" rows="15" cols="50">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                        </label>
                        <hr className="hrPricing" />
                        <p className="textInPage aboutIntros-TextContainerWidth">
                            Where do I sign up?{' '}
                            <i className="fa fa-chevron-down fa-sm" onClick={x => setShowFAQ5(!showFAQ5)} aria-hidden="true"></i>
                        </p>
                        <label style={{ display: showFAQ5 === true ? 'inline-block' : 'none', width: '40vw' }} className="textInPage aboutIntros-TextContainerWidt pricingFAQTextArea" rows="15" cols="50">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim
                        </label>
                        <hr className="hrPricing" />
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
