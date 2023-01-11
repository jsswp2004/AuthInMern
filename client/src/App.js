import { Route, Routes, Navigate } from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import ShowUsersList from './components/Signup/showUsersList'
import EditUser from './components/Signup/editUser'
import CreateUser from './components/Signup/createUser'
import CreatePatient from './components/PatientRegistration/createPatient'
import EditPatient from './components/PatientRegistration/editPatient'
import PatientList from './components/PatientRegistration/ShowPatientList'

function App() {
  const user = localStorage.getItem('token')

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/createPatient" exact element={<CreatePatient />} />
      <Route path="/editPatient/:id" exact element={<EditPatient />} />
      <Route path="/patientlist" exact element={<PatientList />} />      
      <Route path="/createUser" exact element={<CreateUser />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/usersList" exact element={<ShowUsersList />} />
      <Route path="/editUser/:id" exact element={<EditUser />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App
