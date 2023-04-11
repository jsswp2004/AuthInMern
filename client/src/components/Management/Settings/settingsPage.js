import React, { useState } from 'react'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
import ShowUsers from '../../Signup/showUsers'
import ShowRoles from '../Roles/showRoles'
import ShowEvents from '../Events/showEvents'
import ShowStaffSchedules from '../StaffSchedules/showStaffSchedules'
import ShowStaffExceptions from '../StaffExceptions/showStaffExceptions'


const ShowSettings = () => {
  //#region to hide navbar
  const [showNav, setShowNav] = useState(false);
  function toggleNav() {
    setShowNav(!showNav);
  }

  //#endregion
  const [setting, setSetting] = useState('')

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

  const displayStaffExceptionSetting = {
    display: setting === 'Staff Exception' ? '' : 'none',
  }
  return (
    <div className="grid_containerx" >
      {/* style={{ display: 'flex', flexDirection: 'column', position: 'sticky' }} */}
      <div className="item1x">
        <Header />
      </div>
      <div className='item2and3Conatainer'>
        <div className="item2" style={{ display: showNav === true ? 'inline' : 'none', height: '100dvh' }}>
          <Navbar />
        </div>
        <div className="item2" style={{ height: '100dvh' }} >
          <button className='btn-sm btn'> <i className="fa fa-exchange fa-sm fawhite" aria-hidden="true" onClick={toggleNav} title='Toggle navigation' ></i>
          </button>
        </div>
        <div className="item3">
          <div className="roleItemContainer">
            <div className="roleItemContainerBoxLeft">
              <div className="item3A settingsPage">
                <div className="form-control">
                  <h5 className="createPageHeader settingsTitle">Settings</h5>

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
                    Staff Schedules
                    <input
                      type="radio"
                      onClick={() => setSetting('Staff Schedule')}
                      name="radio"
                    />
                    <span className="settingCheckboxCheckmark"></span>
                  </label>
                  <label className="settingCheckboxContainer">
                    Staff Exceptions
                    <input
                      type="radio"
                      onClick={() => setSetting('Staff Exception')}
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
              <div style={displayStaffExceptionSetting}>
                <div className="card-body table-responsive p-0">
                  <ShowStaffExceptions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSettings
