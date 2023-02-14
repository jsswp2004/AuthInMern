import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import AboutImg from '../shared/images/aboutPageDoc.jpg'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'

const Main = () => {
  //   const handleLogout = () => {
  //     localStorage.removeItem('token')
  //     window.location.reload()
  //   }

  return (
    <div className="about_grid_container">
      <div className="item1About">
        <Header />
      </div>
      {/* <div className="item2">
        <Navbar />
      </div> */}
      <div className="item2About">
        {/* <div className="HomepageGreeting"> */}
        <div className="wrapper">
          {/* style={{ backgroundImage: URL('./images/aboutPageDoc.jpg')}} */}
          <h3 className="headers">We Are POEHR.</h3>

          {/* <div className="main"> */}
            <p>
              {' '}
              Dedicated to revolutionizing the way healthcare providers store
              and access patient information.{' '}
            </p>
          {/* </div> */}
          {/* <p className="aboutPageDescription">
 
            </p> */}
          {/* <img src={AboutImg} className="About_img" alt="about" /> */}

          {/* <div className="aboutPage1"> */}
          <div className="aside aside-1">
                At POEHR, we understand the importance of accurate and up-to-date
            medical records, and our state-of-the-art electronic medical record
            system tools are designed to streamline the process for both medical
            professionals and patients. Our system is fully compliant with all
            relevant industry regulations, including HIPAA and HITECH. It allows
            for secure, electronic storage and sharing of patient information,
            reducing the need for paper records and minimizing errors. In
            addition to our electronic medical record system, we also offer
            training and support to ensure that healthcare providers are able to
            fully utilize our systems' features. We are constantly updating our
            software solutions to stay current with the latest advancements in
            technology, and we are committed to providing the best possible
            service to our clients. If you're ready to take the next step in
            improving the efficiency and accuracy of your medical record
            keeping, contact us today to learn more about how POEHR, Inc. can
            benefit your practice.
          </div>
          <div className="aside aside-2">
            <img src={AboutImg} className="About_img" alt="about" />
          </div>
          {/* </div> */}
        </div>

        {/* </div> */}
      </div>
    </div>
  )
}

export default Main
