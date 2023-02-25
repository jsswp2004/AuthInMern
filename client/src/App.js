import { Route, Routes, Navigate } from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import ShowUsersList from './components/Signup/showUserList'
import EditUser from './components/Signup/editUser'
import CreateUser from './components/Signup/createUser'
import CreatePatient from './components/PatientRegistration/createPatient'
import RegistrationDetails from './components/PatientRegistration/registrationDetails'
import EditPatient from './components/PatientRegistration/editPatient'
import PatientList from './components/PatientRegistration/ShowPatientList'
import CreatePatientFromVisit from './components/PatientRegistration/createPatientFromVisit'
import VisitList from './components/PatientVisit/ShowVisitList'
import VisitSchedule from './components/Scheduling/VisitScheduleList'
import CalendarSchedule from './components/Scheduling/calendarSchedule'
import CreateVisit from './components/Scheduling/createVisit'
import CreateVisitFromReg from './components/Scheduling/createVisitFromReg'
import EditVisit from './components/Scheduling/editVisit'
import VisitDetails from './components/Scheduling/detailsVisit'
import About from './components/Main/About'
import ClinicVisit from './components/ClinicVisits/clinicVisits'
import RolesList from './components/Management/Roles/showRolesList'
import CreateRole from './components/Management/Roles/createRole'
import EditRole from './components/Management/Roles/editRole'
import ManageSettings from './components/Management/Settings/settingsPage'
import CreateEvent from './components/Management/Events/createEvent'
import EditEvent from './components/Management/Events/editEvent'
import TestPage from './components/TestFolder/testPage'
import TestStaffTable from './components/TestFolder/testStaffTable01'
import CreateSchedule from './components/Management/StaffSchedules/createSchedule'
import EditSchedule from './components/Management/StaffSchedules/editSchedule'

function App() {
  const user = localStorage.getItem('token')

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/createPatient" exact element={<CreatePatient />} />
      <Route path="/editPatient/:id" exact element={<EditPatient />} />
      <Route path="/patientlist" exact element={<PatientList />} /> 
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
      <Route path="/login" exact element={<Login />} />
      <Route path="/usersList" exact element={<ShowUsersList />} />
      <Route path="/editUser/:id" exact element={<EditUser />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/rolesList" exact element={<RolesList />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/createRole" exact element={<CreateRole />} />
      <Route path="/editRole/:id" exact element={<EditRole />} />
      <Route path="/settingsPage" exact element={<ManageSettings />} />
      <Route path="/createPatientFromVisit/:id" exact element={<CreatePatientFromVisit/>}/>
      <Route path="/createEvent" exact element={<CreateEvent />} />
      <Route path="/editEvent/:id" exact element={<EditEvent />} />
      <Route path="/testPage" exact element={<TestPage />} />
      <Route path="/testStaffTable" exact element={<TestStaffTable />} />
      <Route path="/createSchedule" exact element={<CreateSchedule />} />
      <Route path="/editSchedule/:id" exact element={<EditSchedule />} />
    </Routes>
  )
}

export default App
