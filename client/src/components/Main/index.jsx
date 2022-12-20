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
        {/* <div > */}
        <img src={logo} className="App-logo" alt="logo" />
        {/* <h3 style={{ color: 'white', paddingTop: '5px', paddingLeft: '5px' }}>
            {' '}
            POEHR
          </h3> */}
        <h3>POEHR</h3>
        {/* </div> */}

        <div className={styles.header_navbar_container}>
          {/* <div> */}{' '}
          <ul>
            {/* style={{ marginBottom: '0px', verticalAlign: 'bottom' }} */}
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
          {/* </div>{' '} */}
        </div>
        <div className={styles.white_btn}>
          
          <button  onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Main
