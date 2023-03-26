import "./ClassicHome.css";
import "../../global.css";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom'

const ClassicHome = () => {

    const navigate = useNavigate()
    const toSignup = () => {
        localStorage.removeItem('token')
        navigate('/Signup')
    }
    return (
        <div className="classic-home">
            {/* Introduction */}
            <div className="homeIntrosContainer" >
                <div className="homeIntros">
                    <b className="homeIntro-containers">
                        <p className="textInPages">The scheduling system to efficiently manage patient appointments.</p>
                        <p className="textInPages">User-friendly, cloud-based.</p>
                    </b>
                    <div className="homeIntro-texts">
                        Features real-time scheduling, automated reminders, patient
                        self-scheduling, and reminder options with robust reporting
                        capabilities to enhance operational efficiency and patient experience.
                    </div>
                    <button className='btn  btn-info mainHeaderBtn' onClick={toSignup} style={{ padding: '5px', width: '100px' }}>
                        Try for free
                    </button>
                    <div className="btn btn-secondary mainHeaderBtn" style={{ width: 'auto', padding: '5px' }}>
                        See how it works
                    </div>
                    <div>
                        <b className="trusted-by-providerss">
                            Trusted by providers and patients alike.
                        </b>
                    </div>

                </div>
                <div className="images" />
            </div>
            {/* Introducing the poehr solution */}
            <div className="homeIntrosContainerPoehrSolution" >
                <div className="classic-home-item" />
                <div className="classic-home-inner">
                    <div className="h6-tagh4s">
                        <b>
                            <p className="textInPage">Introducing </p>
                            <p className="textInPage">the POEHR solution.</p>
                            <p className="textInPage h6">Join our community and experience</p>
                            <p className="textInPage h6">the benefits today!</p>
                        </b>
                        <button className='btn  btn-primary mainHeaderBtn' onClick={toSignup} >
                            Try for free
                        </button>
                    </div>

                </div>
                <div className="image-assetsmallsizedefau" />
            </div>


            {/* SMARTSAVE */}
            <div className="homeIntrosContainerPoehrSolution" >
                <div className="dataSafeImg" />
                <div className="smartsaveDiv">
                    <div className="smartsave">SMARTSAVE</div>
                    <div className="h61">We take your security seriously, which is why we use advanced encryption protocols to protect your files in the cloud. Your data is safe and secure with us.</div>
                    <div className="h6-tagh41">
                        <b>
                            <p className="textInPage">All your data is safe</p>
                            <p className="textInPage">with us</p>
                        </b>
                    </div>
                    <button className='btn  btn-primary mainHeaderBtn h6-tagh41' onClick={toSignup} >
                        Try now
                    </button>
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
            <div className="homeIntrosContainerPoehrSolution">
                <div className='costsaverDiv'>
                    <div className="costsaver">COSTSAVER</div>
                    <div className="h62">
                        POEHR scheduling solutions help you reduce costs and save money on your
                        patient management operations. We streamline scheduling workflows and
                        continually identify areas for improvement.
                    </div>

                    <div className="h6-tagh42">
                        <b>
                            <p className="textInPage">Cost saving in a</p>
                            <p className="textInPage">smart way</p>
                        </b>
                    </div>
                    <button className='btn  btn-primary mainHeaderBtn' onClick={toSignup} >
                        Try now
                    </button>
                </div>
                <div className="image2" />
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
            <div className="testimonialBackground1" />
            <div className="testimonialBackground2" />
            <div className="testimonialBackground3" />

            {/* <div className="background" /> */}
            <b className="newsletter-tagh4">Testimonials</b>
            <div className="duis-aute-irure">
                People love what we do and we want to let your know
            </div>
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
            <div className="testimonialContainer3">
                <StarIcon className="starIcon" />
                <StarIcon className="starIcon" />
                <StarIcon className="starIcon" />
                <StarIcon className="starIcon" />
                <StarIcon className="starIcon" />
                <p className="textInPage">"I can't imagine running</p>
                <p className="textInPage">our clinic without it."</p>
            </div>


            <div className="testimonyAuthorContainer0">
                <p className="kirk-diaz">Kirk Diaz</p>
                <p className="lead-manager-suny">Lead Manager, SUNY</p>
            </div>
            <div className="testimonyAuthorContainer1">
                <p className="kirk-diaz">Adele Muniz</p>
                <p className="lead-manager-suny">Project Leader, NYP</p>
            </div>
            <div className="testimonyAuthorContainer2">
                <p className="kirk-diaz">Charice Cramer</p>
                <p className="lead-manager-suny">CTO, Healthworks</p>
            </div>
            {/* end of testimonial */}

            {/* <div className="background-stylestyle3" /> */}
            <div style={{ display: "flex" }}>
                <b className="company-stylestyle3tagh4">POEHR</b>
                <div className="description-stylestyle3tag">Unleash possibilities...</div>
            </div>
            {/* <b className="company-stylestyle3tagh4">POEHR</b>
            <div className="description-stylestyle3tag">Unleash possibilities...</div> */}
            <div className="circle-button-sizemediumst">
                <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.038Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                <div className="icon-iconfeatherlinkedins">
                    <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/linkedin"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.031Z","nodeName":"Icon [ICON=feather/linkedin][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                    <img className="icon" alt="" src="/icon.svg" />
                </div>
            </div>
            <div className="circle-button-sizemediumst1">
                <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.060Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                <div className="icon-iconfeatherlinkedins">
                    <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/youtube"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.056Z","nodeName":"Icon [ICON=feather/youtube][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                    <img className="icon1" alt="" src="/icon1.svg" />
                </div>
            </div>
            <div className="circle-button-sizemediumst2">
                <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.089Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                <div className="icon-iconfeatherlinkedins">
                    <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/twitter"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.085Z","nodeName":"Icon [ICON=feather/twitter][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                    <img className="icon2" alt="" src="/icon2.svg" />
                </div>
            </div>
            <div className="circle-button-sizemediumst3">
                <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.107Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                <div className="icon-iconfeatherlinkedins">
                    <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/facebook"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.104Z","nodeName":"Icon [ICON=feather/facebook][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                    <img className="icon3" alt="" src="/icon3.svg" />
                </div>
            </div>
            <div className="circle-button-sizemediumst4">
                <div className="metadata2">{`{"config":{"STYLE":"STYLE3"},"type":"CircleButton","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.126Z","nodeName":"Circle Button [SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                <div className="icon-iconfeatherlinkedins">
                    <div className="metadata2">{`{"config":{"STYLE":"STYLE3","STATE":"DEFAULT","ICON":"feather/phone"},"type":"Icon","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:25.123Z","nodeName":"Icon [ICON=feather/phone][SIZE=MEDIUM][STATE=DEFAULT][STYLE=STYLE3]"}`}</div>
                    <img className="icon4" alt="" src="/icon4.svg" />
                </div>
            </div>




            <b className="services-stylestyle3tagh5">Services</b>
            <div className="service-stylestyle3tagui-3">Service 1</div>
            <div className="service-stylestyle3tagui-2">Service 2</div>
            <div className="service-stylestyle3tagui-1">Service 3</div>
            <div className="service-stylestyle3tagui-">Service 4</div>
            <b className="products-stylestyle3tagh5">Products</b>
            <div className="product-stylestyle3tagui-3">Product 1</div>
            <div className="product-stylestyle3tagui-2">Product 2</div>
            <div className="product-stylestyle3tagui-1">Product 3</div>
            <div className="product-stylestyle3tagui-">Product 4</div>
            <b className="resources-stylestyle3tagh">Resources</b>
            <div className="resource-stylestyle3tagui3">News</div>
            <div className="resource-stylestyle3tagui2">Blog</div>
            <div className="resource-stylestyle3tagui1">Videos</div>
            <div className="resource-stylestyle3tagui">FAQs</div>


            <div className="footer-strip" >
                {/* <div className="metadata1">{`{"config":{},"nodeName":"Footer Strip","type":"Group","__plugin":"Mockup","__version":"1.5.0","__lastUpdate":"2023-03-21T15:36:24.467Z"}`}</div> */}
                <b className="terms-of-services">Terms of Service</b>
                <b className="privacy-policy-stylestyle2s">Privacy Policy</b>
                <b className="copyright-stylestyle2tagus">
                    © 2023 POEHR. All Rights Reserved.
                </b>
            </div>
        </div>
    );
};

export default ClassicHome;
