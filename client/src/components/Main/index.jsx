import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import ClassicHome from './ClassicHome'

const Main = () => {
  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   window.location.reload()
  // }



  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <div className='HomeGreeting'>
          <h1 >Welcome to POEHR</h1>
          <ClassicHome />
        </div>


      </div>
    </div>
  )
}

export default Main
