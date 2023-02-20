import React, { useState } from 'react'
// import { useNavigate } from 'react-router' , useEffect
// import Role from '../Roles/rolesList'
// import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
// import { Modal, Button } from 'react-bootstrap'
// import CreateRole from '../Roles/createRoleModal'
// import { Link } from 'react-router-dom'
// import { styled } from '@mui/material/styles'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import TableCell, { tableCellClasses } from '@mui/material/TableCell'
// import PropTypes from 'prop-types'
// import { useTheme } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import TableFooter from '@mui/material/TableFooter'
// import TablePagination from '@mui/material/TablePagination'
// import IconButton from '@mui/material/IconButton'
// import FirstPageIcon from '@mui/icons-material/FirstPage'
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
// import LastPageIcon from '@mui/icons-material/LastPage'
import ShowUsers from '../../Signup/showUsers'
import ShowRoles from '../Roles/showRoles'
import ShowEvents from '../Events/showEvents'

const ShowSettings = () => {
  // Define the state with useState hook
  // const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  // const [roles, setRoles] = useState([])
  // const navigate = useNavigate()
  // console.log(roles)
  // const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  // const handleChange = (e) => {
  //   e.preventDefault()
  //   setSearchInput(e.target.value)
  // }

  // const navigate = useNavigate()

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   // setSearchInput(e.target.value)
  //   // alert('Create role button clicked')
  //   setShow(false)
  //   navigate('/settingsPage')
  // }

  // console.log(roles)
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8081/api/roles')
  //     .then((res) => {
  //       // const data = response.data
  //       setRoles(res.data)
  //     })
  //     .catch((error) => {
  //       console.log('Error from roles list')
  //     })
  // }, [])

  // const deleteRecord = (id) => {
  //   axios
  //     .delete(`http://localhost:8081/api/roles/${id}`)
  //     .then((res) => {
  //       setRoles(roles.filter((el) => el._id !== id))
  //       console.log('Role successfully deleted!')
  //     })
  //     .catch((error) => {
  //       console.log('Unable to delete visit')
  //     })
  // }
  // console.log('roles', roles)
  // const RoleModal = () => (
  //   <>
  //     <Modal show={show} onHide={handleClose} size="med" centered>
  //       <Modal.Header>
  //         <Modal.Title>Add a Role</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <CreateRole />
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClick}>
  //           Close
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // )
  // console.log(show)
  // function displayVisitModal() {
  //   return <RoleModal />
  // }

  //table functions
  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.gray,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }))

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   '&:last-child td, &:last-child th': {
  //     border: 0,
  //   },
  // }))

  //pagination
  // function TablePaginationActions(props) {
  //   const theme = useTheme()
  //   const { count, page, rowsPerPage, onPageChange } = props

  //   const handleFirstPageButtonClick = (event) => {
  //     onPageChange(event, 0)
  //   }

  //   const handleBackButtonClick = (event) => {
  //     onPageChange(event, page - 1)
  //   }

  //   const handleNextButtonClick = (event) => {
  //     onPageChange(event, page + 1)
  //   }

  //   const handleLastPageButtonClick = (event) => {
  //     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  //   }
  //   return (
  //     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
  //       <IconButton
  //         onClick={handleFirstPageButtonClick}
  //         disabled={page === 0}
  //         aria-label="first page"
  //       >
  //         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
  //       </IconButton>
  //       <IconButton
  //         onClick={handleBackButtonClick}
  //         disabled={page === 0}
  //         aria-label="previous page"
  //       >
  //         {theme.direction === 'rtl' ? (
  //           <KeyboardArrowRight />
  //         ) : (
  //           <KeyboardArrowLeft />
  //         )}
  //       </IconButton>
  //       <IconButton
  //         onClick={handleNextButtonClick}
  //         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
  //         aria-label="next page"
  //       >
  //         {theme.direction === 'rtl' ? (
  //           <KeyboardArrowLeft />
  //         ) : (
  //           <KeyboardArrowRight />
  //         )}
  //       </IconButton>
  //       <IconButton
  //         onClick={handleLastPageButtonClick}
  //         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
  //         aria-label="last page"
  //       >
  //         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
  //       </IconButton>
  //     </Box>
  //   )
  // }

  // TablePaginationActions.propTypes = {
  //   count: PropTypes.number.isRequired,
  //   onPageChange: PropTypes.func.isRequired,
  //   page: PropTypes.number.isRequired,
  //   rowsPerPage: PropTypes.number.isRequired,
  // }

  // const [page, setPage] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(10)

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roles.length) : 0

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
  // }

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
          <div className="roleItemContainerBox">
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
                  Four
                  <input
                    type="radio"
                    onClick={() => setSetting('role')}
                    name="radio"
                  />
                  <span className="settingCheckboxCheckmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="roleItemContainerBox">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSettings
