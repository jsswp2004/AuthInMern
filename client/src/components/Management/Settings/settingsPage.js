import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
import ShowUsers from '../../Signup/showUsers'
import ShowRoles from '../Roles/showRoles'
import ShowEvents from '../Events/showEvents'
import ShowStaffSchedules from '../StaffSchedules/showStaffSchedules'
import ShowStaffExceptions from '../StaffExceptions/showStaffExceptions'
import { Modal, Button } from 'react-bootstrap'
import UploadRole from '../Roles/uploadRoleModal'
import UploadEvent from '../Events/uploadEventModal'
import UploadSchedule from '../StaffSchedules/uploadScheduleModal'
import UploadException from '../StaffExceptions/uploadExceptionModal'

const ShowSettings = () => {
  //#region for navigate
  const navigate = useNavigate()
  //#endregion
  //#region for modal functions

  const handleClick = (e) => {
    e.preventDefault()
    setShowRole(false)
    setShowEvent(false)
    setShowSchedule(false)
    setShowException(false)
    navigate('/settingsPage')
  }

  //#endregion
  //#region  Define the modal state with useState hook
  //role modal
  const [showRole, setShowRole] = useState(false)
  const handleCloseRole = () => setShowRole(false)
  const handleShowRole = () => setShowRole(true)
  //event modal
  const [showEvent, setShowEvent] = useState(false)
  const handleCloseEvent = () => setShowEvent(false)
  const handleShowEvent = () => setShowEvent(true)
  //schedule modal
  const [showSchedule, setShowSchedule] = useState(false)
  const handleCloseSchedule = () => setShowSchedule(false)
  const handleShowSchedule = () => setShowSchedule(true)
  //exception modal
  const [showException, setShowException] = useState(false)
  const handleCloseException = () => setShowException(false)
  const handleShowException = () => setShowException(true)


  //#endregion

  //#region for role upload modal
  const UploadRoleModal = () => (
    <>
      <Modal show={showRole} onHide={handleCloseRole} size="med" centered>
        <Modal.Header>
          <Modal.Title>Upload Roles</Modal.Title>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <UploadRole />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  function displayUploadRoleModal() {
    return <UploadRoleModal />
  }

  //#endregion

  //#region for event upload modal
  const UploadEventModal = () => (
    <>
      <Modal show={showEvent} onHide={handleCloseEvent} size="med" centered>
        <Modal.Header>
          <Modal.Title>Upload Events</Modal.Title>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <UploadEvent />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  function displayUploadEventModal() {
    return <UploadEventModal />
  }

  //#endregion

  //#region for schedule upload modal
  const UploadScheduleModal = () => (
    <>
      <Modal show={showSchedule} onHide={handleCloseSchedule} size="med" centered>
        <Modal.Header>
          <Modal.Title>Upload Schedules</Modal.Title>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <UploadSchedule />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  function displayUploadScheduleModal() {
    return <UploadScheduleModal />
  }

  //#endregion

  //#region for exception upload modal
  const UploadExceptionModal = () => (
    <>
      <Modal show={showException} onHide={handleCloseException} size="med" centered>
        <Modal.Header>
          <Modal.Title>Upload Exceptions</Modal.Title>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <UploadException />
        </Modal.Body>
      </Modal>
    </>
  )

  function displayUploadExceptionModal() {
    return <UploadExceptionModal />
  }

  //#endregion


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
  // const displayUploadRoleSetting = {
  //   display: setting === 'Upload Roles' ? '' : 'none',
  // }
  // const displayUploadEventSetting = {
  //   display: setting === 'Upload Events' ? '' : 'none',
  // }
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
                  {/* upload section  */}
                  <div className='form-control'>
                    <h5 className="createPageHeader settingsTitle">Upload Dictionaries</h5>
                    <label className="settingCheckboxContainer">
                      Roles
                      <input
                        type="radio"
                        onClick={() => handleShowRole()}
                        name="radio"
                      />
                      <span className="settingCheckboxCheckmark"></span>
                    </label>
                    <label className="settingCheckboxContainer">
                      Events
                      <input
                        type="radio"
                        onClick={() => handleShowEvent()}
                        name="radio"
                      />
                      <span className="settingCheckboxCheckmark"></span>
                    </label>
                    <label className="settingCheckboxContainer">
                      Schedules
                      <input
                        type="radio"
                        onClick={() => handleShowSchedule()}
                        name="radio"
                      />
                      <span className="settingCheckboxCheckmark"></span>
                    </label>
                    <label className="settingCheckboxContainer">
                      Exceptions
                      <input
                        type="radio"
                        onClick={() => handleShowException()}
                        name="radio"
                      />
                      <span className="settingCheckboxCheckmark"></span>
                    </label>
                    {/* <a href='/uploadRole'>Roles</a>
                    <label className="settingCheckboxContainer">
                      Roles
                      <input
                        type="radio"
                        onClick={() => setSetting('Upload Roles')}
                        name="radio"
                      />
                      <span className="settingCheckboxCheckmark"></span>
                    </label>
                    <label className="settingCheckboxContainer">
                      Events
                      <input
                        type="radio"
                        onClick={() => setSetting('Upload Events')}
                        name="radio"
                      />
                      <span className="settingCheckboxCheckmark"></span>
                    </label> */}

                  </div>
                </div>

              </div>
              <div>{displayUploadRoleModal()}</div>
              <div>{displayUploadEventModal()}</div>
              <div>{displayUploadScheduleModal()}</div>
              <div>{displayUploadExceptionModal()}</div>
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
              {/* // code below is not used */}
              {/* <div style={displayUploadRoleSetting}>
                <div className="card-body table-responsive p-0">
                  <UploadRole />
                </div>
              </div>
              <div style={displayUploadEventSetting}>
                <div className="card-body table-responsive p-0">
                  <UploadEvent />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSettings
