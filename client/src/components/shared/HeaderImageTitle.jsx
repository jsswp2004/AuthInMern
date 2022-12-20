import React from 'react'
import logo from './images/logoPOWER.png'
import { Link } from 'react-router-dom'

function HeaderImageTitle() {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 style={{color: 'white', paddingTop: '5px', paddingLeft:'5px'}}> POEHR</h3>
      </div>

      <div className="header-navbar">
        {' '}
        <ul style={{marginBottom:'0px', verticalAlign:'bottom'}}>
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
    </div>
  )
}

export default HeaderImageTitle
