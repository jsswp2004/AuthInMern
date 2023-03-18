//#region for imports and styling
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import CreateRole from './createRoleModal'
import EditRole from './editRoleModal'
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
import { ThemeProvider } from "@material-ui/styles";
import Box from '@mui/material/Box'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import * as XLSX from "xlsx"
import themeDesign from '../../Functions/theme'
//#endregion
//#region for main component 
export default function ShowRolesList() {
  //#region  Define the modal state with useState hook
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [editShow, setEditShow] = useState(false)
  const handleEditClose = () => setEditShow(false)
  const handleEditShow = () => setEditShow(true)

  //#endregion
  //#region for search input
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  //#endregion
  //#region for modal functions
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    setShow(false)
    navigate('/settingsPage')
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    setEditShow(false)
  }
  //#endregion
  //#region for for excel download
  const handleDownloadExcel = (e) => {
    const rows = roles.map((e) =>
    ({
      _id: e._id,
      name: e.name,
      addedDate: e.addedDate,
    }))
    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Role ID", "Name", 'Added Date'],
    ]);

    XLSX.writeFile(workbook, "Role_List_Report.xlsx", { compression: true });

  }

  //#endregion
  //#region to pull roles
  const [roles, setRoles] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/roles')
      .then((res) => {
        setRoles(res.data)
      })
      .catch((error) => {
        console.log('Error from roles list')
      })
  }, [])

  //Define role id for prop
  const [roleID, setRoleID] = useState('')

  //#endregion
  //#region for delete confirmation modal

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
          <Button variant="danger" onClick={() => deleteRecord(roleID)}>
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
      .delete(`http://localhost:8081/api/roles/${id}`)
      .then((res) => {
        setRoles(roles.filter((el) => el._id !== id))
        console.log('Role successfully deleted!')
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
  }
  //#endregion
  //#region  for role modal
  const RoleModal = () => (
    <>
      <Modal show={show} onHide={handleClose} size="med" centered>
        <Modal.Header>
          <Modal.Title>Add a Role</Modal.Title>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <CreateRole />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  function displayRoleModal() {
    return <RoleModal />
  }

  const EditRoleModal = () => (
    <>
      <Modal show={editShow} onHide={handleEditClose} size="med" centered>
        <Modal.Header>
          <Modal.Title>Edit Role</Modal.Title>
          <Button variant="secondary" onClick={handleEditClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EditRole roleID={roleID} />
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
    return <EditRoleModal />
  }
  //#endregion
  //#region for filtering data based on search input
  const filteredData = roles
    .filter((role) => {
      if (searchInput === '') {
        return role
      } else {
        return (
          role.name
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          role.addedDate
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        )
      }
    })
    .sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1)

    )

  //#endregion
  //#region  table functions
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: themeDesign.palette.primary.main,
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

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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
  //#endregion
  //#region setting the ID of the role for the prop
  const handleItemClick = item => {
    const roleID = item._id
    setRoleID(roleID)
  }
  //#endregion
  //#region for main return statement
  return (
    <div className="grid_containers">
      <div className="item3A">
        <h4 className="createPageHeader">Roles</h4>
        <div>{displayRoleModal()}</div>
        <div>{displayEditRoleModal()}</div>
        <div>{displayDeleteRegistrationModal()}</div>
        <label htmlFor="search" className="searchLabel">
          <Button
            className="btn btn-info btn-sm"
            onClick={handleShow}
          >
            <i
              className="fa fa-user-plus "
              aria-hidden="true"
              title="Add Role"
            />
          </Button>
          <button className='btn btn-success btn-sm'
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
            placeholder="Search roles"
            onChange={handleChange}
            value={searchInput}
          />
        </label>
      </div>

      <div className="roleItemContainerBox">
        <div className="card-body table-responsive p-0">
          <ThemeProvider theme={themeDesign}>
            <TableContainer sx={{ maxHeight: 850 }} component={Paper}>
              <Table stickyHeader
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Role</StyledTableCell>
                    <StyledTableCell align="left">Date Created</StyledTableCell>
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
                  ).map((role) => (
                    <StyledTableRow key={role._id}
                      onClick={() => handleItemClick(role)}>
                      <StyledTableCell align="left">{role.name}</StyledTableCell>
                      <StyledTableCell align="left">{role.addedDate}</StyledTableCell>

                      <StyledTableCell align="left" width='250px'>
                        <button className='btn btn-info btn-sm'
                          onClick={handleEditShow}
                        >
                          <i
                            className="fa fa-hospital-o "
                            aria-hidden="true"
                            title="Edit Role"
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
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      colSpan={12}
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