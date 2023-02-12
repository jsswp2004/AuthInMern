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
import VisitList from './components/PatientVisit/ShowVisitList'
import VisitSchedule from './components/Scheduling/VisitScheduleList'
import CalendarSchedule from './components/Scheduling/calendarSchedule'
import CreateVisit from './components/Scheduling/createvisit'
import EditVisit from './components/Scheduling/editVisit'
import VisitDetails from './components/Scheduling/detailsVisit'
import About from './components/Main/About'
import ClinicVisit from './components/ClinicVisits/clinicVisits'
import RolesList from './components/Management/Roles/showRolesList'
import CreateRole from './components/Management/Roles/createRole'
import EditRole from './components/Management/Roles/editRole'
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
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/createRole" exact element={<CreateRole />} />
      <Route path="/editRole/:id" exact element={<EditRole />} />
    </Routes>
  )
}

export default App
