import React, { useState } from 'react'
// import { useNavigate } from 'react-router' , useEffect
// import Role from '../Roles/rolesList'
// import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
// import { Modal, Button } from 'react-bootstrap'
// import CreateRole from '../Roles/createRoleModal'
// import { Link } from 'react-router-dom'
// import { styled } from '@mui/material/styles'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import TableCell, { tableCellClasses } from '@mui/material/TableCell'
// import PropTypes from 'prop-types'
// import { useTheme } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import TableFooter from '@mui/material/TableFooter'
// import TablePagination from '@mui/material/TablePagination'
// import IconButton from '@mui/material/IconButton'
// import FirstPageIcon from '@mui/icons-material/FirstPage'
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
// import LastPageIcon from '@mui/icons-material/LastPage'
import ShowUsers from '../../Signup/showUsers'
import ShowRoles from '../Roles/showRoles'
import ShowEvents from '../Events/showEvents'
import ShowStaffSchedules from '../StaffSchedules/showStaffSchedules'

const ShowSettings = () => {

  const [setting, setSetting] = useState('')

  //   console.log(setting)
  const displayRolesSetting = {
    display: setting === 'Roles' ? '' : 'none',
  }

  const displayUserProfileSetting = {
    display: setting === 'User Profiles' ? '' : 'none',
  }

  const displayCliniEventsSetting = {
    display: setting === 'Clinic Events' ? '' : 'none',
  }

  const displayStaffScheduleSetting = {
    display: setting === 'Staff Schedule' ? '' : 'none',
  }

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>

      <div className="item3">
        <div className="roleItemContainer">
          <div className="roleItemContainerBox">
            <div className="item3A settingsPage">
              <div className="form-control">
                <h5 className="createPageHeader">Settings</h5>
                <span>Select settings:</span>
                <label className="settingCheckboxContainer">
                  User Profiles
                  <input
                    type="radio"
                    onClick={() => setSetting('User Profiles')}
                    name="radio"
                  />
                  <span className="settingCheckboxCheckmark"></span>
                </label>
                <label className="settingCheckboxContainer">
                  Roles
                  <input
                    type="radio"
                    onClick={() => setSetting('Roles')}
                    name="radio"
                  />
                  <span className="settingCheckboxCheckmark"></span>
                </label>
                <label className="settingCheckboxContainer">
                  Clinic Events
                  <input
                    type="radio"
                    onClick={() => setSetting('Clinic Events')}
                    name="radio"
                  />
                  <span className="settingCheckboxCheckmark"></span>
                </label>
                <label className="settingCheckboxContainer">
                  Staff Schedule
                  <input
                    type="radio"
                    onClick={() => setSetting('Staff Schedule')}
                    name="radio"
                  />
                  <span className="settingCheckboxCheckmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="roleItemContainerBox">
            <div style={displayRolesSetting}>
              <div className="card-body table-responsive p-0">
                <ShowRoles />
              </div>
            </div>

            <div style={displayUserProfileSetting}>
              <div className="card-body table-responsive p-0">
                <ShowUsers />
              </div>
            </div>
            <div style={displayCliniEventsSetting}>
              <div className="card-body table-responsive p-0">
              <ShowEvents />
              </div>
            </div>
            <div style={displayStaffScheduleSetting}>
              <div className="card-body table-responsive p-0">
              <ShowStaffSchedules />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSettings
