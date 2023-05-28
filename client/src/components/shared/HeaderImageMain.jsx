import React from 'react'
// import logo from './images/logoPOWER.png'
import logo from './images/logoPOWER2.jpg'
import { Link, useNavigate } from 'react-router-dom'
function HeaderImageMain() {

  let navigate = useNavigate()
  const toLogin = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const toSignup = () => {
    localStorage.removeItem('token')
    navigate('/Signup')
  }

  return (
    <nav className="navbar1">
      <div className="headerItem">
        <img src={logo} className="App_logo" alt="logo" />{' '}
        <h3 className="h3header">
          POEHR
        </h3>

      </div>

      <ul className="navigation">
        <li id="link" className="navbar_list">
          <Link to="/">Home</Link>
        </li>

        <li id="link" className="navbar_list">
          <Link to="/pricing">Pricing</Link>
        </li>
        <li id="link" className="navbar_list">
          <Link to="/about">About us</Link>
        </li>

        <li id="link" className="navbar_list">
          <Link to="/contact">Contact</Link>
        </li>
        <button className='btn-info btn-sm btn' onClick={toLogin} style={{ padding: '0', margin: '5px' }}>
          {/* width: '100px' */}
          <i class="fa fa-sign-in" aria-hidden="true" title='Log in'></i>
        </button>
        <button className='btn btn-success btn-sm' onClick={toSignup} style={{ padding: '0', margin: '5px' }}>
          {/* Signup */}
          <i class="fa fa-user-plus" aria-hidden="true" title='Sign Up'></i>
        </button>
      </ul>
    </nav>
  )
}

export default HeaderImageMain
