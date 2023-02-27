import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import User from './userlist'
import axios from 'axios'
// import logo from '../../components/shared/images/logoPOWER.png'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import { Link } from 'react-router-dom'
// import LogoutIcon from '@mui/icons-material/Logout'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
// import { alpha } from '@mui/material/styles';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

export default function ShowUsersList() {
  // let navigate = useNavigate()
  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   navigate('/login')
  // }

  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/users/${id}`)
      .then((response) => {
        setUsers(users.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete record')
      })
  }

  const filteredData = users
    .filter((user) => {
      if (searchInput === '') {
        return user
      } else {
        return (
          user.firstName
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          user.lastName
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          user.email
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          user.role
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          user.addedDate
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        )
      }
    })
    .sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1))
  // const [sortedField, setSortedField] = useState(null)
  // const [sortedDirection, setSortedDirection] = useState(null)

  // function userList() {
  //   if (sortedField === 'firstName' && sortedDirection === 'asc') {
  //     return filteredData
  //       .sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'firstName' && sortedDirection === 'dsc') {
  //     return filteredData
  //       .sort((a, b) => (a.firstName > b.firstName ? -1 : 1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'lastName' && sortedDirection === 'asc') {
  //     return filteredData
  //       .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'lastName' && sortedDirection === 'dsc') {
  //     return filteredData
  //       .sort((a, b) => (a.lastName > b.lastName ? -1 : 1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'email' && sortedDirection === 'asc') {
  //     return filteredData
  //       .sort((a, b) => (a.email > b.email ? 1 : -1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'email' && sortedDirection === 'dsc') {
  //     return filteredData
  //       .sort((a, b) => (a.email > b.email ? -1 : 1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'role' && sortedDirection === 'asc') {
  //     return filteredData
  //       .sort((a, b) => (a.role > b.role ? 1 : -1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'role' && sortedDirection === 'dsc') {
  //     return filteredData
  //       .sort((a, b) => (a.role > b.role ? -1 : 1))
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'addedDate' && sortedDirection === 'asc') {
  //     return filteredData
  //       .sort((a, b) =>
  //         Date.parse(a.addedDate) > Date.parse(b.addedDate) ? 1 : -1,
  //       )
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else if (sortedField === 'addedDate' && sortedDirection === 'dsc') {
  //     return filteredData
  //       .sort((a, b) =>
  //         Date.parse(a.addedDate) > Date.parse(b.addedDate) ? -1 : 1,
  //       )
  //       .map((user) => {
  //         return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //       })
  //   } else {
  //     return filteredData.map((user) => {
  //       return <User user={user} deleteRecord={deleteRecord} key={user._id} />
  //     })
  //   }
  // }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.gray,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  //   const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  //     '&:td': {
  //           backgroundColor: theme.palette.common.white,
  //           color: theme.palette.common.black,
  //           marginBottom: 0,
  //           marginTop: 10,
  //     },
  //     // hide last border
  //     // '&:last-child td, &:last-child th': {
  //     //   border: 0,
  //     // },
  //     // [`&.${tableCellClasses.body}`]: {
  //     //       fontSize: 14,
  //     //     // fontColor: theme.palette.common.white,
  //     //     marginBottom: 0,
  //     //   },
  //   }))

  //pagination
  function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0)
    }

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    )
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className="grid_containers">
      {/* <div className="item1">
        <Header />
      </div> */}
      {/* <div className="item2">
        <Navbar />
      </div> */}
      <div className="item3">
        <div className="item3A">
          <h4 className='createPageHeader'>Registered Users</h4>
          
          <label htmlFor="search" className="searchLabel" >
          <Link className="btn btn-info btn-sm registerBtn" to={`/signup`}>
            <i className="fa fa-user fa-sm" aria-hidden="true" title='Add User'/>
          </Link>{' '}
            Search :{' '}
              <input
                // className="searchInput"
              id="search"
              type="text"
              placeholder="Search users"
              onChange={handleChange}
              value={searchInput}
            />
            </label>
            
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">First Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Role</StyledTableCell>
                <StyledTableCell align="left">Date Added</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : filteredData
              ).map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell align="left">
                    {user.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  <StyledTableCell align="left">{user.role}</StyledTableCell>
                  <StyledTableCell align="left">
                    {user.addedDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link
                      className="btn btn-info btn-sm registerBtn"
                      to={`/editUser/${user._id}`}
                    >
                      <i
                        className="fa fa-pencil-square-o fa-sm"
                        aria-hidden="true"
                        title='Edit User'
                      />
                    </Link>{' '}
                    <button
                      className="btn btn-danger btn-sm registerBtn"
                      onClick={() => {
                        deleteRecord(user._id)
                      }}
                    >
                      <i className="fa fa-trash-o fa-sm" aria-hidden="true" />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
