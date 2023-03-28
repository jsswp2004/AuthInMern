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
        // alert('Create schedule button clicked')
        setShowPrivacy(false)
        // navigate('/settingsPage')
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
        // alert('Create schedule button clicked')
        setShow(false)
        // navigate('/settingsPage')
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
            {/* <div className="homeIntrosContainer" > */}
            <div className="homeIntrosFlexContainer" >
                <div className="homeIntros-Text">
                    <b className="homeIntros-TextContainer">
                        {/* <b className="homeIntro-containers">*/}
                        <p className="textInPage">The scheduling system to efficiently manage patient appointments.</p>
                        <p className="textInPage">User-friendly, cloud-based.</p>
                    </b>
                    {/* <div className="homeIntro-texts"> */}
                    <div className="homeIntros-TextContainer2">
                        <p className="textInPage">
                            Features real-time scheduling, automated reminders, patient
                            self-scheduling, and reminder options with robust reporting
                            capabilities to enhance operational efficiency and patient experience.
                        </p>
                    </div>
                    <div className="homeIntros-TextContainerBtns">
                        <button className='btn  btn-primary btnMaxWidth ' onClick={toSignup} >
                            Try for free
                        </button>
                        <button className="btn btn-secondary btnMaxWidth" >
                            See how it works
                        </button>
                    </div>
                    {/* <div className="trusted-by-providerss"> */}
                    <div className="homeIntros-TextContainerTrusted">
                        <b >
                            Trusted by providers and patients alike.
                        </b>
                    </div>

                </div>
                <div className="homeIntros-Image"></div>
                {/* <div className="images" /> */}
            </div>
            {/* Introducing the poehr solution */}
            {/* <div className="homeIntrosContainerPoehrSolution" > */}
            <div className="poehrIntrosFlexContainer" >

                <div className="poehrIntros-Text">
                    {/* <div className="classic-home-item" /> */}
                    {/* <div className="poehrIntros-InnerBackground2" /> */}
                    {/* <div className="classic-home-inner"> */}
                    <div className="poehrIntros-InnerBackground" >

                        <div className="poehrIntros-InnerBackgroundText">
                            {/* <div className="h6-tagh4s"> */}
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
                {/* <div className="homeIntros-Text"></div> */}

                <div className="poehrIntros-Image">
                    {/* <div className="image-assetsmallsizedefau" /> */}
                </div>
            </div>


            {/* SMARTSAVE */}

            {/* <div className="homeIntrosContainerPoehrSolution" > */}
            <div className="poehrIntrosFlexContainer" >
                {/* <div className="dataSafeImg" /> */}
                {/* <div className="alignContentCenter"> */}
                <div className="poehrdataSafe-Image">
                    {/* <div className="alignContentCenter"></div> */}
                </div>

                {/* </div> */}

                {/* <div className="smartsaveDivs"> */}
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
                {/* 
                <div className="button-display-elementslabel5">
                    <div className="metadata2">{`{"config":{},"type":"Button","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:26.374Z","nodeName":"Button [DISPLAY_ELEMENTS=Label][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE1]"}`}</div>
                    <b className="label10">Try now</b>

                    <div className="icon-display-elementslabel4">
                        <div className="metadata2">{`{"config":{"STATE":"DEFAULT"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:26.369Z","nodeName":"Icon [DISPLAY_ELEMENTS=Label][ICON=feather/heart][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE1]"}`}</div>
                        <img className="icon9" alt="" src="/icon6.svg" />
                    </div>

                </div> */}


                {/* <div className="metadata2">{`{"config":{"ASSET_ID":"92521fabe5e6290cd8c5657c26290ecc"},"type":"Image","nodeName":"Image","children":["f0196fad-49c2-470a-a4fd-0a9f11940ac9","81df152a-bfea-40fe-92a9-89702325acbe"],"__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T17:35:41.081Z"}`}</div> */}
                {/* </div> */}
            </div>
            {/* END SMARTSAVE */}
            {/* cost saving */}
            {/* <div className="homeIntrosContainerPoehrSolution"> */}
            <div className="poehrIntrosFlexContainer" >
                <div className="poehrcostsaver-TextContainer">
                    {/* <div className='costsaverDiv'> */}
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
                                {/* <p className="textInPage">smart way</p> */}
                            </b>
                        </div>
                        <button className='btn  btn-primary' onClick={toSignup} >
                            Try now
                        </button>
                    </div>
                </div>
                {/* <div className="image2" /> */}
                <div className="poehrcostsaver-Image" />

            </div>
            {/* end of cost saving */}
            {/* join our community */}
            <div className="homeIntrosContainerPoehrSolution">
                <div className="image3" />
                <div className="classic-home-child" />
                <div className="rectangle-div" >
                    <div className="joinCommunityContainerDiv">
                        <div className="joinCommunityContainer">
                            <p className="textInPage">How to join our</p>
                            <p className="textInPage">community</p>
                        </div>
                        <div className="joinCommunityContainerText">
                            <p className="textInPage">Just 3 simple steps to optimize your</p>
                            <p className="textInPage">scheduling operations.</p>
                        </div>
                        <div>
                            <button className='btn  btn-primary mainHeaderBtn btnleft' onClick={toSignup} >
                                Try for free
                            </button>
                        </div>
                    </div>
                    <div className="joinCommunityContainerDiv">
                        <div className="joinCommunityContainerStep0">Step 1</div>
                        <div className="joinCommunityContainerStep0Text">Create an account. You only need to provide your email address and choose a password.</div>
                        <div className="joinCommunityContainerStep1">Step 2</div>
                        <div className="joinCommunityContainerStep1Text">
                            Set up your profile and provide a way for us to contact you.
                        </div>
                        <div className="joinCommunityContainerStep2">Step 3</div>
                        <div className="joinCommunityContainerStep2Text">
                            Poof! you are now ready to schedule smart with optimized operations
                        </div>
                    </div>
                </div>
            </div>
            {/* end of join our community community */}
            {/* testimonial */}
            <div className="homeIntrosContainerPoehrSolution">
                <div className="testimonialHeader">
                    <div className="testimonial-tagh4"> <b>Testimonials</b></div>
                    <div className="testimonial-tagText">
                        People love what we do and we want to let your know
                    </div>

                    <div className="testimonialHeaderText" >
                        <div className="testimonialBackground1" >
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
                                <p className="kirk-diaz">Kirk Diaz</p>
                                <p className="lead-manager-suny">Lead Manager, SUNY</p>
                            </div>
                        </div>
                        <div className="testimonialBackground2">
                            <div className="testimonialContainer2">
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
                                <p className="kirk-diaz">Adele Muniz</p>
                                <p className="lead-manager-suny">Project Leader, NYP</p>
                            </div>
                        </div>
                        <div className="testimonialBackground3">
                            <div className="testimonialContainer3">
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <StarIcon className="starIcon" />
                                <p className="textInPage">"I can't imagine running</p>
                                <p className="textInPage">our clinic without it."</p>
                            </div>

                            <div className="testimonyAuthorContainer2">
                                <p className="kirk-diaz">Charice Cramer</p>
                                <p className="lead-manager-suny">CTO, Healthworks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end of testimonial */}

            {/* <div className="background-stylestyle3" /> */}

            {/* products and services section */}
            {/* <div className="homeIntrosContainerPoehrSolution"> */}
            <div className="homeIntrosFlexContainer" >
                <div className="homeIntros-TextUnleash">

                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <div className="company-stylestyle3tagh4"><b >POEHR</b></div>
                        <div className="description-stylestyle3tag">Unleash possibilities...</div>
                        <div className='iconContainer' >
                            <div className="circle-button-sizemediumst">
                                {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.038Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                <div className="icon-iconfeatherlinkedins">
                                    {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/linkedin"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.031Z","nodeName":"Icon [ICON=feather/linkedin][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                    <img className="icon" alt="" src="/icon.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst1">
                                {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.060Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                <div className="icon-iconfeatherlinkedins">
                                    {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/youtube"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.056Z","nodeName":"Icon [ICON=feather/youtube][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                    <img className="icon1" alt="" src="/icon1.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst2">
                                {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.089Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                <div className="icon-iconfeatherlinkedins">
                                    {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/twitter"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.085Z","nodeName":"Icon [ICON=feather/twitter][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                    <img className="icon2" alt="" src="/icon2.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst3">
                                {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.107Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                <div className="icon-iconfeatherlinkedins">
                                    {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/facebook"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.104Z","nodeName":"Icon [ICON=feather/facebook][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                    <img className="icon3" alt="" src="/icon3.svg" />
                                </div>
                            </div>
                            <div className="circle-button-sizemediumst4">
                                {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.126Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
                                <div className="icon-iconfeatherlinkedins">
                                    {/* <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/phone"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.123Z","nodeName":"Icon [ICON=feather/phone][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div> */}
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
                        <div className="service-stylestyle3taguis-2">Service 2</div>
                        <div className="service-stylestyle3taguis-1">Service 3</div>
                        <div className="service-stylestyle3taguis-">Service 4</div>
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
                {/* <div className="metadata1">{`{"config":{},"nodeName":"Footer Strip","type":"Group","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:24.467Z"}`}</div> */}
                <b className="terms-of-services"><button className="btn" onClick={handleShow}>Terms of Service</button></b>
                <b className="privacy-policy-stylestyle2s"><button className="btn" onClick={handleShowPrivacy}>Privacy Policy</button></b>
                <b className="copyright-stylestyle2tagus"><button className="btn" >© 2023 POEHR. All Rights Reserved.</button></b>

            </div>
        </div>
    );
};

export default ClassicHome;
