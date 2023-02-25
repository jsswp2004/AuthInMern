import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import RecordCard from './RecordCard'
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
import CreateRegistration from './createPatientModal'
import CreateVisitRegistration from '../Scheduling/createVisitFromRegModal'


export default function ShowRecordList() {
  // Define the state for create registration modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }
  // Define the state for create visit from registration modal 
  const [showVisit, setVisitShow] = useState(false)
  const handleVisitClose = () => setVisitShow(false)
  const handleVisitShow = () => {
    setVisitShow(true)
  }

  const [records, setRecords] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  // Method to set show for create modal to false
  const handleClick = (e) => {
    e.preventDefault()
    // alert('Create schedule button clicked')
    setShow(false)
    // navigate('/settingsPage')
  }

  // Method to set show for create modal to false
  const handleVisitClick = (e) => {
    e.preventDefault()
    setVisitShow(false)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/records')
      .then((res) => {
        setRecords(res.data)
      })
      .catch((err) => {
        console.log('Error from ShowRecordList')
      })
  }, [])

  //Define patient ID for create visit from registration modal
  const [patientID, setPatientID] = useState('')

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/records/${id}`)
      .then((response) => {
        setRecords(records.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete record')
      })
  }

  // Create Registration Modal
  const RegistrationModal = () => (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Register a client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateRegistration />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

  // Function to display create registration modal
  function displayRegistrationModal() {
    return <RegistrationModal />
  }


  // Create Visit Modal
  const VisitFromRegistrationModal = () => (
    <>
      <Modal show={showVisit} onHide={handleVisitClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Register a client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateVisitRegistration patientID={patientID} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVisitClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

  // Function to display create visit from registration modal
  function displayVisitFromRegistrationModal() {
    return <VisitFromRegistrationModal />
  }

  var filteredData = records.filter((record) => {
    if (searchInput === '') {
      return record
    } else {
      return (
        record.medicalRecordNumber
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.visitNumber
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.firstName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.middleName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.lastName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.dateOfBirth
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.addedDate
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.race
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.age
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        record.gender
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
    }
  })
    .sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1))

  //#region Table functions
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
  //#endregion
  //#region Pagination functions
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
  const [rowsPerPage, setRowsPerPage] = React.useState(15)

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

  function patientList() {
    return filteredData
      .sort((a, b) =>
        Date.parse(a.addedDate) > Date.parse(b.addedDate) ? -1 : 1,
      )
      .map((record) => {
        return (
          <RecordCard
            record={record}
            deleteRecord={deleteRecord}
            key={record._id}
          />
        )
      })
  }

  //setting the ID of the provider for the property
  const handleItemClick = item => {
    const patID = item._id
    setPatientID(patID)
  }

  console.log('patientID', patientID)
  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
        <div className="item3A">
          <h4 className='patientListHeader'>Patient List</h4>
          <div>{displayRegistrationModal()}</div>
          <div>{displayVisitFromRegistrationModal()}</div>
          <label htmlFor="search" className="searchLabel">
            <Button
              className="btn btn-info btn-sm registerBtn"
              onClick={handleShow}
            >
              <i className="fa fa-hospital-user fa-sm " aria-hidden="true" title='Add Patient' />
            </Button>
            {/* <Link className="btn btn-info btn-sm registerBtn " to={`/createPatient`}>
              <i className="fa fa-hospital-user fa-sm " aria-hidden="true" title='Add Patient' />

            </Link>{' '} */}
            Search :{' '}
            <input
              className="searchInput"
              id="search"
              type="text"
              placeholder="Search patients"
              onChange={handleChange}
              value={searchInput}
            />
          </label>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">MRN</StyledTableCell>
                {/* <StyledTableCell align="left">Visit Number</StyledTableCell> */}
                <StyledTableCell align="left">Firstname</StyledTableCell>
                <StyledTableCell align="left">Middlename</StyledTableCell>
                <StyledTableCell align="left">Lastname</StyledTableCell>
                <StyledTableCell align="left">DOB</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">Age</StyledTableCell>
                <StyledTableCell align="left">Race</StyledTableCell>
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
              ).map((pt) => (
                <StyledTableRow key={pt._id}
                  onClick={() => handleItemClick(pt)}
                >
                  <StyledTableCell align="left">
                    {pt.medicalRecordNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {pt.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {pt.middleName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{pt.lastName}</StyledTableCell>
                  <StyledTableCell align="left">{pt.dateOfBirth}</StyledTableCell>
                  <StyledTableCell align="left">
                    {pt.gender}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {pt.age}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {pt.race}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {pt.addedDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      className="btn btn-primary btn-sm"
                      onClick={handleVisitShow}
                    >
                                            <i
                        className="fa fa-stethoscope fa-sm"
                        aria-hidden="true" title='Create visit'
                      />
                    </Button>
                    {/* <Link
                      className="btn btn-success btn-sm "
                      to={`/createvisitFromReg/${pt._id}`}
                    >
                      <i
                        className="fa fa-stethoscope fa-sm"
                        aria-hidden="true" title='Create visit'
                      />
                    </Link>{' '} */}
                    <Link
                      className="btn btn-info btn-sm"
                      to={`/editPatient/${pt._id}`}
                    >
                      <i
                        className="fa fa-hospital-o fa-sm"
                        aria-hidden="true" title='Edit registration'
                      />
                    </Link>{' '}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteRecord(pt._id)
                      }}
                    >
                      <i title="delete patient" className="fa fa-trash-o fa-sm" aria-hidden="true" />
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
                  // style={{float:'right'}}
                  rowsPerPageOptions={[5, 15, 25, { label: 'All', value: -1 }]}
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

      </div>
    </div>
  )
}
