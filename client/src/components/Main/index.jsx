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

        {/* </div> */}
        <div className={styles.header}>
          <div className={styles.headerItem}>
            <img src={logo} className={styles.App_logo} alt="logo" />{' '}
            <h3 style={{ color: 'white', marginTop: '0px', marginBottom:'0px', paddingTop: '5px' }}> POEHR</h3>
          </div>

          <ul className={styles.navigation}>
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
            <li className={styles.navbar_list_exit}>
              <LogoutIcon onClick={handleLogout}>Log Out</LogoutIcon>
            </li>
          </ul>

          {/* <button className={styles.white_btn} onClick={handleLogout}>
            <LogoutIcon onClick={handleLogout}>Log Out</LogoutIcon>
          </button> */}
        </div>
      </nav>
    </div>
  )
}

export default Main
