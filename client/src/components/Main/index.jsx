import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../navigation/navbar'

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }



  return (
    <div className="grid_container">
      <div className="item1">
        <nav className="navbar1">
          <div className="header">
            <div className="headerItem">
              <img src={logo} className="App_logo" alt="logo" />{' '}
              <h3 id="#header_logotext" className="h3">
                {' '}
                POEHR
              </h3>
            </div>

            <ul className="navigation">
              <li className="navbar_list" style={{color: "white"}}>
                <Link to="/create">Registration</Link>
              </li>
              <li className="navbar_list">
                <Link to="/">Home</Link>
              </li>
              <li className="navbar_list">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="navbar_list">
                <a href="#about">About </a>
              </li>
              <li className="navbar_list_exit">
                <LogoutIcon onClick={handleLogout}>Log Out</LogoutIcon>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        TEST

      </div>
    </div>
  )
}

export default Main
