import React from 'react'
import logo from './images/logoPOWER.png'
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
          <Link to="/">Pricing</Link>
        </li>
        <li id="link" className="navbar_list">
          <Link to="/about">About us</Link>
        </li>

        <li id="link" className="navbar_list">
          <Link to="/contact">Contact</Link>
        </li>
        <button className='mainHeaderBtn btn-primary btn navbar_list' onClick={toLogin} style={{ padding: '0', width: '100px', margin: '5px' }}>
          Login
        </button>
        <button className='btn btn-success mainHeaderBtn' onClick={toSignup} style={{ padding: '0', width: '100px', margin: '5px' }}>
          Signup
        </button>
      </ul>
    </nav>
  )
}

export default HeaderImageMain
