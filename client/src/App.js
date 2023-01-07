import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import ShowUsersList from './components/Signup/showUsersList'
import EditUser from './components/Signup/edit'

function App() {
  const user = localStorage.getItem('token')

  return (
    
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/usersList" exact element={<ShowUsersList />} />
        <Route path="/editUser" exact element={<EditUser />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
 
  )
}

export default App
