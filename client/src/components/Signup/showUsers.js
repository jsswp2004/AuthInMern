//#region for imports and styling 
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, ThemeProvider } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
import EditUser from './editUserModal'
import * as XLSX from "xlsx"
import themeDesign from '../Functions/theme'
//#endregion
//#region fro main component
export default function ShowUsersList() {
  //#region for state and edit button 
  const [editShow, setEditShow] = useState(false)
  const handleEditClose = () => setEditShow(false)
  const handleEditShow = () => setEditShow(true)
  //#endregion
  //#region for role ID to define role id for prop
  const [userID, setUserID] = useState('')
  const handleEditClick = (e) => {
    e.preventDefault()
    setEditShow(false)
    // window.location.close()
  }

  //setting the ID of the user for the property
  const handleItemClick = item => {
    const userID = item._id
    setUserID(userID)
  }
  //#endregion for main component
  //#region for edit modal
  const EditUserModal = () => (
    <>
      <Modal show={editShow} onHide={handleEditClose} size="med" centered>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
          <Button variant="secondary" onClick={handleEditClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EditUser userID={userID} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  function displayEditRoleModal() {
    return <EditUserModal />
  }
  //#endregion
  //#region for for excel download
  const handleDownloadExcel = (e) => {
    const rows = users.map((e) =>
    ({
      _id: e._id,
      name: e.name,
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      role: e.role,
      addedDate: e.addedDate,
    }))
    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["User ID", "Name", 'firstName', 'lastName', 'Email', 'Role', 'Added Date'],
    ]);

    XLSX.writeFile(workbook, "User_List_Report.xlsx", { compression: true });

  }

  //#endregion
  //#region for pulling users from the database
  const [users, setUsers] = useState([])
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
  //#endregion
  //#region for delete confirmation modal
  // const [staffSchedID, setStaffSchedID] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = () => setShowDelete(true)
  const DeleteVisitModal = (props) => (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete} size="sm" centered>
        <Modal.Header>
          <Modal.Title>Delete Visit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Are you sure you want to delete this data item?</b></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteRecord(userID)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
  //Function to display delete registration modal
  function displayDeleteRegistrationModal() {
    return <DeleteVisitModal />
  }



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
  //#endregion
  //#region for search input
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  //#endregion
  //#region for filtering data based on search input
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
    .sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1)

    )
  //#endregion
  //#region for table styling
  //table cell
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: themeDesign.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  //table row
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  })

  )

  //table pagination
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
  //#endregion
  //#region for avoiding a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  //#endregion
  //#region for main return statement
  return (
    <div className="grid_containers">
      <div className="item3A">
        <h4 className='createPageHeader'>Users</h4>
        <div>{displayEditRoleModal()}</div>
        <div>{displayDeleteRegistrationModal()}</div>
        <label htmlFor="search" className="searchLabel" >
          <Link className="btn btn-info  btn-sm" to={`/signup`}>
            <i className="fa fa-user" aria-hidden="true" title='Add User' />
          </Link>
          <button className='btn btn-success  btn-sm'
            onClick={handleDownloadExcel}
          >
            <i
              className="fa fa-file-excel-o"
              aria-hidden="true"
              title="Export to Excel"
            />
          </button>
          Search :{' '}
          <input
            id="search"
            type="text"
            placeholder="Search users"
            onChange={handleChange}
            value={searchInput}
          />
        </label>

      </div>

      <div className="roleItemContainerBox">
        <div className="card-body table-responsive p-0">
          <ThemeProvider theme={themeDesign}>
            <TableContainer sx={{ maxHeight: 850 }} component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Firsts Name</StyledTableCell>
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
                    <StyledTableRow key={user._id}
                      onClick={() => handleItemClick(user)}
                    >
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
                      <StyledTableCell align="left" width='250px'>
                        <button className='btn btn-info  btn-sm'
                          onClick={handleEditShow}
                        >
                          <i
                            className="fa fa-pencil-square-o "
                            aria-hidden="true"
                            title="Edit User"
                          />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={handleShowDelete}
                        >
                          <i
                            title="delete role"
                            className="fa fa-trash-o "
                            aria-hidden="true"
                          />
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
          </ThemeProvider>
        </div>
      </div>

    </div>
  )
  //#endregion 
}
//#endregion