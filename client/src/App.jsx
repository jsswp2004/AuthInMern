import { createContext, useState, useEffect, useContext } from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Main from './components/Main/index'
import Signup from './components/Signup'
import Login from './components/Login'
import Account from './components/Main/Account'
import Payment from './components/Main/Payment'
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
import Applications from './components/Main/ApplicationPage'
import About from './components/Main/About'
import Contact from './components/Main/Contact'
import Pricing from './components/Main/Pricing'
import ClinicVisit from './components/ClinicVisits/clinicVisits'
import CreateRole from './components/Management/Roles/createRole'
import UploadRole from './components/Management/RoleUpload/roleUploadModal'
import EditRole from './components/Management/Roles/editRole'
import ManageSettings from './components/Management/Settings/settingsPage'
import CreateEvent from './components/Management/Events/createEvent'
import EditEvent from './components/Management/Events/editEvent'
import TestPage from './components/TestFolder/testPage'
import TestStaffTable from './components/TestFolder/testStaffTable01'
import CreateSchedule from './components/Management/StaffSchedules/createSchedule'
import EditSchedule from './components/Management/StaffSchedules/editSchedule'
import ShowPatientVisitList from './components/PatientVisit/showPatientVisitList'

//these contexts are created here  while user context is created in login page
export const RoleContext = createContext();
export const FirstNameContext = createContext();
export const FacilityContext = createContext();


function App() {
  const user = localStorage.getItem('token')
  return (

    < Routes >
      <Route path='/' exact element={<Main />} />
      <Route path='/about' exact element={<About />} />
      <Route path='/contact' exact element={<Contact />} />
      <Route path='/pricing' exact element={<Pricing />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Signup />} />
      <Route path='/account' exact element={<Account />} />
      <Route path='/payment' exact element={<Payment />} />
      {user && <Route path='/patientlist' exact element={<PatientList />} />}
      {user && <Route path='/applications' exact element={<Applications />} />}
      {user && <Route path='/createPatient' exact element={<CreatePatient />} />}
      {user && <Route path='/editPatient/:id' exact element={<EditPatient />} />}
      {user && <Route path='/visitlist' exact element={<VisitList />} />}
      {user && <Route path='/visitSchedule' exact element={<VisitSchedule />} />}
      {user && <Route path='/calendarSchedule' exact element={<CalendarSchedule />} />}
      {user && <Route path='/createVisit/:id' exact element={<CreateVisit />} />}
      {user && <Route path='/createvisitFromReg/:id' exact element={<CreateVisitFromReg />} />}
      {user && <Route path='/registrationDetails/:id' exact element={<RegistrationDetails />} />}
      {user && <Route path='/clinicVisit' exact element={<ClinicVisit />} />}
      {user && <Route path='/editVisit/:id' exact element={<EditVisit />} />}
      {user && <Route path='/detailsVisit/:id' exact element={<VisitDetails />} />}
      {user && <Route path='/createUser' exact element={<CreateUser />} />}
      {user && <Route path='/editUser/:id' exact element={<EditUser />} />}
      {user && <Route path='/createRole' exact element={<CreateRole />} />}
      {user && <Route path='/uploadRole' exact element={<UploadRole />} />}
      {user && <Route path='/editRole/:id' exact element={<EditRole />} />}
      {user && <Route path='/settingsPage' exact element={<ManageSettings />} />}
      {user && <Route path='/createPatientFromVisit/:id' exact element={<CreatePatientFromVisit />} />}
      {user && <Route path='/createEvent' exact element={<CreateEvent />} />}
      {user && <Route path='/editEvent/:id' exact element={<EditEvent />} />}
      {user && <Route path='/testPage' exact element={<TestPage />} />}
      {user && <Route path='/testStaffTable' exact element={<TestStaffTable />} />}
      {user && <Route path='/createSchedule' exact element={<CreateSchedule />} />}
      {user && <Route path='/editSchedule/:id' exact element={<EditSchedule />} />}
      {user && <Route path='/showPatientVisitList/:id' exact element={<ShowPatientVisitList />} />}
    </Routes >


  )
}

export default App
