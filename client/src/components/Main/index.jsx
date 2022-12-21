import styles from './styles.module.css'
import logo from '../shared/images/logoPOWER.png'
import { Link } from 'react-router-dom'

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <img src={logo} className="App-logo" alt="logo" />
        <h3>POEHR</h3>

        <div className={styles.header_navbar_container}>
          <ul>
            <li className="navbar-list">
              <Link to="/create">Registration</Link>
            </li>
            <li className="navbar-list">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-list">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="navbar-list">
              <a href="#about">About </a>
            </li>
          </ul>
        </div>
        <div className={styles.navbar}>
          <button className={styles.white_btn} onClick={handleLogout} >
					  
					  <i className="fa fa-sign-out-alt fa-lg" title="Log out" style={{ color: "red" }} aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Main
