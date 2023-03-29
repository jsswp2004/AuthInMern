import { createContext, useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import axios from 'axios'
import Main from './components/Main/index'
import Signup from './components/Signup'
import Login from './components/Login'
// import ShowUsersList from './components/Signup/showUserList'
import EditUser from './components/Signup/editUser'
import CreateUser from './components/Signup/createUser'
import CreatePatient from './components/PatientRegistration/createPatient'
import RegistrationDetails from './components/PatientRegistration/registrationDetails'
import EditPatient from './components/PatientRegistration/editPatient'
import PatientList from './components/PatientRegistration/ShowPatientList'
import CreatePatientFromVisit from './components/PatientRegistration/createPatientFromVisit'
import VisitList from './components/PatientVisit/showVisitList'
import VisitSchedule from './components/Scheduling/VisitScheduleList'
import CalendarSchedule from './components/Scheduling/calendarSchedule'
import CreateVisit from './components/Scheduling/createVisit'
import CreateVisitFromReg from './components/Scheduling/createVisitFromReg'
import EditVisit from './components/Scheduling/editVisit'
import VisitDetails from './components/Scheduling/detailsVisit'
import About from './components/Main/About'
import ClinicVisit from './components/ClinicVisits/clinicVisits'
// import RolesList from './components/Management/Roles/showRolesList'
import CreateRole from './components/Management/Roles/createRole'
import EditRole from './components/Management/Roles/editRole'
import ManageSettings from './components/Management/Settings/settingsPage'
import CreateEvent from './components/Management/Events/createEvent'
import EditEvent from './components/Management/Events/editEvent'
import TestPage from './components/TestFolder/testPage'
import TestStaffTable from './components/TestFolder/testStaffTable01'
import CreateSchedule from './components/Management/StaffSchedules/createSchedule'
import EditSchedule from './components/Management/StaffSchedules/editSchedule'
import ShowPatientVisitList from './components/PatientVisit/showPatientVisitList'

export const UserContext = createContext();
export const RoleContext = createContext();
export const FirstNameContext = createContext();

function App() {
  const user = localStorage.getItem('token')
  const useremail = localStorage.getItem('email')

  let userData = useremail

  const [currentUser, setCurrentUser] = useState([])
  const loggedUserRole = currentUser.map((user) => user.role)
  const loggedUserID = currentUser.map((user) => user._id)
  const loggedUserName = currentUser.map((user) => user.name)
  const loggedUserFirstName = currentUser.map((user) => user.firstName)
  const loggedUserlastName = currentUser.map((user) => user.lastName)

  console.log(loggedUserID[0], loggedUserRole[0], loggedUserName[0], loggedUserFirstName[0], loggedUserlastName[0])
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users`)
      .then((response) => {
        const data = response.data
        setCurrentUser(data.filter((user) => user.email === useremail))
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [useremail])

  // console.log(data)

  return (



    <UserContext.Provider value={userData}>
      <RoleContext.Provider value={loggedUserRole}>
        <FirstNameContext.Provider value={loggedUserFirstName}>
          <Routes>
            {/* <Route path="/" exact element={<Main />} /> */}
            {/* <Route path="/login" exact element={<Login />} /> */}
            {/*  */}
            <Route path="/" exact element={<Main />} />
            <Route path="/about" exact element={<About />} />
            {user && <Route path="/patientlist" exact element={<PatientList />} />}
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/createPatient" exact element={<CreatePatient />} />
            <Route path="/editPatient/:id" exact element={<EditPatient />} />

            <Route path="/visitlist" exact element={<VisitList />} />
            <Route path="/visitSchedule" exact element={<VisitSchedule />} />
            <Route path="/calendarSchedule" exact element={<CalendarSchedule />} />
            <Route path="/createVisit/:id" exact element={<CreateVisit />} />
            <Route path="/createvisitFromReg/:id" exact element={<CreateVisitFromReg />} />
            <Route path="/registrationDetails/:id" exact element={<RegistrationDetails />} />
            <Route path="/clinicVisit" exact element={<ClinicVisit />} />
            <Route path="/editVisit/:id" exact element={<EditVisit />} />
            <Route path="/detailsVisit/:id" exact element={<VisitDetails />} />
            <Route path="/createUser" exact element={<CreateUser />} />

            {/* <Route path="/usersList" exact element={<ShowUsersList />} /> */}
            <Route path="/editUser/:id" exact element={<EditUser />} />

            {/* <Route path="/rolesList" exact element={<RolesList />} /> */}
            <Route path="/" exact element={<Navigate replace to="/login" />} />
            <Route path="/createRole" exact element={<CreateRole />} />
            <Route path="/editRole/:id" exact element={<EditRole />} />
            <Route path="/settingsPage" exact element={<ManageSettings />} />
            <Route path="/createPatientFromVisit/:id" exact element={<CreatePatientFromVisit />} />
            <Route path="/createEvent" exact element={<CreateEvent />} />
            <Route path="/editEvent/:id" exact element={<EditEvent />} />
            <Route path="/testPage" exact element={<TestPage />} />
            <Route path="/testStaffTable" exact element={<TestStaffTable />} />
            <Route path="/createSchedule" exact element={<CreateSchedule />} />
            <Route path="/editSchedule/:id" exact element={<EditSchedule />} />
            <Route path="/showPatientVisitList/:id" exact element={<ShowPatientVisitList />} />

          </Routes>
        </FirstNameContext.Provider>
      </RoleContext.Provider>
    </UserContext.Provider>


  )
}

export default App
