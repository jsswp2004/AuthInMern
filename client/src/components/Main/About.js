// import LogoutIcon from '@mui/icons-material/Logout'
// import { Link } from 'react-router-dom'
// import logo from '../../components/shared/images/logoPOWER.png'
// import Navbar from '../navigation/navbar'
// import Header from '../shared/Header'
import HeaderMain from '../shared/HeaderMain'

import ClassicAbout from './ClassicAbout'

const Main = () => {
    // const handleLogout = () => {
    //   localStorage.removeItem('token')
    //   window.location.reload()
    // }



    return (
        <div className="grid_container_home">
            <div className="item1_home">
                {/* <Header /> */}
                <HeaderMain />

            </div>

            {/* <div className="item2">
        <Navbar />
      </div> */}
            <div className="item3_home">
                <ClassicAbout />
                {/* <div className='HomeGreeting'>
          <h1 >Welcome to POEHR</h1>

        </div> */}

            </div>

        </div >
    )
}

export default Main
