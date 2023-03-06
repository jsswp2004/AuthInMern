import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
// import Role from './rolesList'
import axios from 'axios'
// import Navbar from '../../navigation/navbar'
// import Header from '../../shared/Header'
import { Modal, Button } from 'react-bootstrap'
import CreateSchedule from '../Management/Roles/createRoleModal'
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

const ShowSchedulesList = () => {
  // Define the state with useState hook
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [schedules, setSchedules] = useState([])
  // const navigate = useNavigate()
  // console.log(schedules)
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    // setSearchInput(e.target.value)
    // alert('Create schedule button clicked')
    setShow(false)
    navigate('/settingsPage')
  }

  // console.log(schedules)
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/schedules')
      .then((res) => {
        // const data = response.data
        setSchedules(res.data)
      })
      .catch((error) => {
        console.log('Error from schedules list')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/schedules/${id}`)
      .then((res) => {
        setSchedules(schedules.filter((el) => el._id !== id))
        console.log('Schedule successfully deleted!')
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
  }
  //create an hour grid using css
  // console.log('schedules', schedules)
  const ScheduleModal = () => (
    <>
      <Modal show={show} onHide={handleClose} size="med" centered>
        <Modal.Header>
          <Modal.Title>Add a Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateSchedule />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
  // console.log(show)
  function displayVisitModal() {
    return <ScheduleModal />
  }

  //table functions
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - schedules.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className="scheduleItemContainerBox">
      <div className="item3A">
        <h4 className="createScheduleHeader">Add Schedule</h4>

        <div>{displayVisitModal()}</div>
        <label htmlFor="search" className="searchLabel">
          {/* create schedule button */}
          <Link
            style={{
              fontSize: '14px',
              marginTop: '2px',
              paddingBottom: '2px',
              borderRadius: '5px',
              height: '30px',
              marginRight: '5px',
            }}
            className="btn btn-info btn-sm"
            // onClick={handleClick}
            // title="Click to add visit"
            to={'/createSchedule'}
          >
            <i
              className="fa fa-calendar-plus-o fa-sm"
              aria-hidden="true"
              title="Create Schedule"
            />
          </Link>
          Search :{' '}
          <input
            className="searchLabel"
            id="search"
            type="text"
            placeholder="Search schedules"
            onChange={handleChange}
            value={searchInput}
          />
        </label>
      </div>

      <div className="scheduleItemContainerBox">
        <div className="card-body table-responsive p-0">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Provider</StyledTableCell>
                  <StyledTableCell align="left">Start Date</StyledTableCell>
                  <StyledTableCell align="left">End Date</StyledTableCell>
                  <StyledTableCell align="left">AM Start</StyledTableCell>
                  <StyledTableCell align="left">AM End</StyledTableCell>
                  <StyledTableCell align="left">PM Start</StyledTableCell>
                  <StyledTableCell align="left">PM End</StyledTableCell>
                  <StyledTableCell align="left">Scheduled Days</StyledTableCell>
                  <StyledTableCell align="left">Date Created</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? schedules.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : schedules
                ).map((schedule) => (
                  <StyledTableRow key={schedule._id}>
                    <StyledTableCell align="left">
                      {schedule.provider}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.startDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.endDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.amStartTime}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.amEndTime}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.pmStartTime}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.pmEndTime}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.scheduledMon};{schedule.scheduledTues};
                      {schedule.scheduledWed};{schedule.scheduledThurs};
                      {schedule.scheduledFri}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {schedule.addedDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Link
                        className="btn btn-info btn-sm"
                        to={`/editSchedule/${schedule._id}`}
                      >
                        <i
                          className="fa fa-hospital-o fa-sm"
                          aria-hidden="true"
                          title="Edit registration"
                        />
                      </Link>{' '}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteRecord(schedule._id)
                        }}
                      >
                        <i
                          title="delete patient"
                          className="fa fa-trash-o fa-sm"
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
                    count={schedules.length}
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
    </div>
  )
}

export default ShowSchedulesList