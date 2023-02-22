import React, { useState } from 'react'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
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
          <div className="roleItemContainerBoxLeft">
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
          <div className="roleItemContainerBoxRight">
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
