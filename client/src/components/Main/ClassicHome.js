import "./ClassicHome.css";
import "../../global.css";
import { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
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
            <div className="homeIntrosFlexContainer" >
                <div className="homeIntros-Text">
                    <b className="homeIntros-TextContainer">
                        <p className="textInPage">The scheduling system to efficiently manage patient appointments.</p>
                        <p className="textInPage">User-friendly, cloud-based.</p>
                    </b>
                    <div className="homeIntros-TextContainer2">
                        <p className="textInPage">
                            Our system features real-time scheduling, automated reminders, and patient self-scheduling options. With robust reporting capabilities, it enhances both operational efficiency and the patient experience.
                        </p>
                        <br />
                        <p className="textInPage">
                            Getting started with POEHR Scheduling is as easy as 1-2-3.
                            <br />
                            <br />
                            <span> First, register and create an account to start your 7-day free trial. After the trial period ends, you’ll automatically be enrolled in our basic subscription package, but you can change your subscription at any time. </span>
                            <br />
                            <br />
                            <span> Second, add your patients to the system by easily uploading your existing data. </span>
                            <br />
                            <br />
                            <span> Finally, schedule appointments with ease. It’s that simple!</span>
                        </p>
                    </div>
                    <div className="homeIntros-TextContainerBtns">
                        <button className='btn  btn-primary btnMaxWidth ' onClick={toSignup} >
                            Try for free
                        </button>
                        {/* <button className="btn btn-secondary btnMaxWidth" >
                            See how it works
                        </button> */}
                    </div>
                    <div className="homeIntros-TextContainerTrusted">
                        <b >
                            Trusted by providers and patients alike.
                        </b>
                    </div>

                </div>
                <div className="homeIntros-Image"></div>
            </div>
            {/* Introducing the poehr solution */}
            <div className="poehrIntrosFlexContainer" >
                <div className="poehrIntros-Text">
                    <div className="poehrIntros-InnerBackground" >
                        <div className="poehrIntros-InnerBackgroundText">
                            <b>
                                <p className="textInPage">Introducing </p>
                                <p className="textInPage">the POEHR solution.</p>
                                <p className="textInPageh6">Join our community and experience the benefits today!</p>

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
            {/* SMARTSAVE */}
            <div className="poehrIntrosFlexContainer" >
                <div className="poehrdataSafe-Image">
                </div>
                <div className="poehrdataSafe-TextContainer">
                    <div className="poehrdataSafe-Text">
                        <div className="smartsave">SMARTSAVE</div>
                        <div className="textInPageh6">We take your security seriously, which is why we use advanced encryption protocols to protect your files in the cloud. Your data is safe and secure with POEHR.</div>
                        <div className="textInPage">
                            <b>
                                <p className="textInPage">All your data is safe</p>
                                <p className="textInPage">with us</p>
                            </b>
                        </div>
                        <button className='btn  btn-primary' onClick={toSignup} >
                            Try now
                        </button>
                    </div>
                </div>

            </div>
            {/* END SMARTSAVE */}
            {/* cost saving */}
            <div className="poehrIntrosFlexContainer" >
                <div className="poehrcostsaver-TextContainer">
                    <div className='poehrcostsaver-Text'>

                        <div className="costsaver">COSTSAVER</div>
                        <div className="textInPageh6">
                            POEHR scheduling solutions help you reduce costs and save money on your
                            patient management operations.
                        </div>
                        <div className="textInPageh6">
                            We streamline scheduling workflows and
                            continually identify areas for improvement.
                        </div>
                        <div className="textInPage">
                            <b>
                                <p className="textInPage">Cost saving in a smart way</p>
                            </b>
                        </div>
                        <button className='btn  btn-primary' onClick={toSignup} >
                            Try now
                        </button>
                    </div>
                </div>
                <div className="poehrcostsaver-Image" />

            </div>
            {/* end of cost saving */}
            {/* join our community */}
            <div className="poehrIntrosFlexContainerCommunity">
                <div className="joinCommunityContainerRectangleBackground" >
                    <div className="joinCommunity-TextContainer">
                        <div> <div className="joinCommunityContainer-image" /></div>
                        <div className="textInPage">
                            <b>
                                <p className="textInPage">How to join our</p>
                                <p className="textInPage">community</p>
                            </b>
                        </div>
                        <div className="joinCommunityContainerText">
                            <p className="textInPageh6">Just 3 simple steps to optimize your</p>
                            <p className="textInPageh6">scheduling operations.</p>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <button className='btn  btn-primary' onClick={toSignup} >
                                Try for free
                            </button>
                        </div>
                    </div>
                    <div className="joinCommunity-TextContainer2">
                        <div className="joinCommunityContainerText">
                            <div className="textInPageh6"><h4>Step 1</h4></div>
                            <div className="textInPageh6">First, register and create an account to start your 7-day free trial. </div>
                            <div className="textInPageh6">After the trial period ends, you’ll automatically be enrolled in our basic subscription package, but you can change your subscription at any time.</div>

                            <div className="textInPageh6"><h4>Step 2</h4></div>
                            <div className="textInPageh6">
                                Second, add your patients to the system by easily uploading your existing data.
                            </div>
                            <div className="textInPageh6"><h4>Step 3</h4></div>
                            <div className="textInPageh6">
                                Finally, schedule appointments with ease. It’s that simple!

                            </div>
                            <div className="textInPageh6">
                                with optimized operations
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end of join our community community */}
            {/* testimonial */}
            <div className="homeIntrosContainerPoehrSolution">
                <div className="testimonialHeader">
                    <div className="testimonial-tagh4"><b>Testimonials</b></div>
                    <div className="testimonial-tagText">
                        People love what we do and we want to let your know
                    </div>

                    <div className="testimonialHeaderText" >
                        <div className="testimonialBackground" >
                            <div className="testimonialContainer1">
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <p className="textInPage">"I recommend POEHR to</p>
                                <p className="textInPage">any business looking for</p>
                                <p className="textInPage">improvement."</p>
                            </div>
                            <div className="testimonyAuthorContainer0">
                                <p className="testimonialAuthor">Kirk Diaz</p>
                                <p className="testimonialAuthorJob">Lead Manager, SUNY</p>
                            </div>
                        </div>
                        <div className="testimonialBackground">
                            <div className="testimonialContainer1">
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <p className="textInPage">"Since implementing</p>
                                <p className="textInPage">POEHR our business has</p>
                                <p className="textInPage">seen significant growth."</p>
                            </div>
                            <div className="testimonyAuthorContainer1">
                                <p className="testimonialAuthor">Adele Muniz</p>
                                <p className="testimonialAuthorJob">Project Leader, NYP</p>
                            </div>
                        </div>
                        <div className="testimonialBackground">
                            <div className="testimonialContainer1">
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <p className="textInPage">"I can't imagine running</p>
                                <p className="textInPage">our clinic without it."</p>
                            </div>

                            <div className="testimonyAuthorContainer2">
                                <p className="testimonialAuthor">Charice Cramer</p>
                                <p className="testimonialAuthorJob">CTO, Healthworks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end of testimonial */}
            {/* products and services section */}
            <div className="homeIntrosFlexContainer" >
                <div className="homeIntros-TextUnleash">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <div className="company-bottomTag"><b >POEHR</b></div>
                        <div className="company-bottomTagDescription">Unleash possibilities...</div>
                        <div className='iconSocialMediaContainer' >
                            <div className="circle-button-sizemediumst">
                                <div className="icon-iconfeatherlinkedins">
                                    <img className="icon" alt="" src="/icon.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst1">
                                <div className="icon-iconfeatherlinkedins">
                                    <img className="icon1" alt="" src="/icon1.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst2">
                                <div className="icon-iconfeatherlinkedins">
                                    <img className="icon2" alt="" src="/icon2.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst3">
                                <div className="icon-iconfeatherlinkedins">
                                    <img className="icon3" alt="" src="/icon3.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst4">
                                <div className="icon-iconfeatherlinkedins">
                                    <img className="icon4" alt="" src="/icon4.svg" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="homeIntros-TextUnleash2">
                    <div>
                        <b className="services-stylestyle3tagh5">Services</b>
                        <div className="service-stylestyle3taguis-3">Patient Management</div>
                        <div className="service-stylestyle3taguis-2">Time Tracking</div>
                        <div className="service-stylestyle3taguis-1">Retention Metrics</div>
                        <div className="service-stylestyle3taguis-">Reports</div>
                        <div className="service-stylestyle3taguis-">Email Integration</div>
                        <div className="service-stylestyle3taguis-">SMS Reminders</div>
                        <div className="service-stylestyle3taguis-">Reports</div>
                        <div className="service-stylestyle3taguis-">Automated SMS and Email Reminders</div>
                        <div className="service-stylestyle3taguis-">Real - time Collaboration Support</div>
                        <div className="service-stylestyle3taguis-">Patient Self - scheduling Portal</div>
                        <div className="service-stylestyle3taguis-">Process Analysis</div>
                        <div className="service-stylestyle3taguis-">SLA Management</div>
                    </div>
                    <div>
                        <b className="products-stylestyle3tagh5">Products</b>
                        <div className="product-stylestyle3taguis-3">POEHR Scheduling</div>
                        <div className="product-stylestyle3taguis-2">Product 2</div>
                        <div className="product-stylestyle3taguis-1">Product 3</div>
                        <div className="product-stylestyle3taguis-">Product 4</div>
                    </div>
                    <div>
                        <b className="resources-stylestyle3tagh">Resources</b>
                        <div className="resource-stylestyle3taguis-3">News</div>
                        <div className="resource-stylestyle3taguis-2">Blog</div>
                        <div className="resource-stylestyle3taguis-1">Videos</div>
                        <div className="resource-stylestyle3taguis-">FAQs</div>
                    </div>
                </div>
            </div>
            {/* end of products and services section */}
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

