import styles from './styles.module.css'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import logo from '../../components/shared/images/logoPOWER.png'

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        {/* <div className={styles.header_logo}> */}
          <img src={logo} className={styles.App_logo} alt="logo" />
          <h3 style={{ color: 'white'}}>
            {' '}
            POEHR
          </h3>
        {/* </div> */}
        <div className={styles.header_navbar}>
          {' '}
          <ul style={{ marginBottom: '0px', verticalAlign: 'bottom' }}>
            <li className={styles.navbar_list}>
              <Link to="/create">Registration</Link>
            </li>
            <li className={styles.navbar_list}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.navbar_list}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={styles.navbar_list}>
              <a href="#about">About </a>
            </li>
          </ul>
        </div>

        <button className={styles.white_btn} onClick={handleLogout}>
          <LogoutIcon onClick={handleLogout}>Log Out</LogoutIcon>
        </button>
      </nav>
    </div>
  )
}

export default Main
