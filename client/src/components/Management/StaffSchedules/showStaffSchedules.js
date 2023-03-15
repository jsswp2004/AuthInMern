import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import CreateSchedule from '../StaffSchedules/createSchedule'
import EditSchedule from '../StaffSchedules/editScheduleModal'
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
import * as XLSX from "xlsx"

const ShowSchedulesList = () => {
  // Define the Create Modal state
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }

  // Define the Edit Modal state
  const [editShow, setEditShow] = useState(false)
  const handleEditClose = () => setEditShow(false)
  const handleEditShow = () => {
    setEditShow(true)
  }
  // Define the Schedule state
  const [schedules, setSchedules] = useState([])
  // Define the Search state
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  // Navigation
  // const navigate = useNavigate()

  // Method to set show for create modal to false
  const handleClick = (e) => {
    e.preventDefault()
    // alert('Create schedule button clicked')
    setShow(false)
    // navigate('/settingsPage')
  }

  // Method to set show for edit modal to false
  const handleEditClick = (e) => {
    e.preventDefault()
    setEditShow(false)
    // navigate('/settingsPage')
    // window.location.reload()
  }

  const handleDownloadExcel = () => {
    const rows = schedules.map((schedule) => ({
      _id: schedule._id,
      providerID: schedule.providerID,
      provider: schedule.provider,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      amStartTime: schedule.amStartTime,
      amEndTime: schedule.amEndTime,
      pmStartTime: schedule.pmStartTime,
      pmEndTime: schedule.pmEndTime,
      scheduledMon: schedule.scheduledMon,
      scheduledTues: schedule.scheduledTues,
      scheduledWed: schedule.scheduledWed,
      scheduledThurs: schedule.scheduledThurs,
      scheduledFri: schedule.scheduledFri,
      addedDate: schedule.addedDate,

    }))
    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Schedules");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Schedule ID", "Provider ID", "Provider", 'Start Date', 'End Date', 'AM Start Time', 'AM End Time', 'PM Start Time', 'PM End Time', 'Schedule Monday', 'Schedule Tuesday', 'Schedule Wednesday', 'Schedule Thursday', 'Schedule Friday', 'Added Date'],
    ]);

    XLSX.writeFile(workbook, "Providers_Schedule_List_Report.xlsx", { compression: true });

  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/schedules')
      .then((res) => {
        setSchedules(res.data)
      })
      .catch((error) => {
        console.log('Error from schedules list')
      })
  }, [])

  // Define mdID state for prop
  const [mdID, setMdID] = useState('')

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
          <Button variant="danger" onClick={() => deleteRecord(mdID)}>
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

  //#endregion

  // delete record
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


  // Create Schedule Modal
  const ScheduleModal = () => (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Add a Schedule</Modal.Title>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <CreateSchedule />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  // Function to display create schedule modal
  function displayVisitModal() {
    return <ScheduleModal />
  }

  // Edit Schedule Modal
  const EditScheduleModal = () => (
    <>
      <Modal
        show={editShow}
        onHide={handleEditClose}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Edit Schedule</Modal.Title>
          <Button variant="secondary" onClick={handleEditClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EditSchedule providerID={mdID} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  // Function to display edit schedule modal
  function displayEditScheduleModal() {
    return <EditScheduleModal />
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

  //page pagination
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

  //setting the ID of the provider for the property
  const handleItemClick = item => {
    const providerID = item._id
    setMdID(providerID)
  }

  return (
    <div className="scheduleItemContainerBox">
      <div className="item3A">
        <h4 className="createScheduleHeader">Add Schedule</h4>
        <div>{displayVisitModal()}</div>
        <div>{displayEditScheduleModal()}</div>
        <div>{displayDeleteRegistrationModal()}</div>
        <label htmlFor="search" className="searchLabel">
          {/* create schedule button */}
          <Button
            className="btn btn-info  btn-sm"
            onClick={handleShow}
          >
            <i
              className="fa fa-calendar-plus-o"
              aria-hidden="true"
              title="Add Schedule"
            />
          </Button>
          {/* export to excel button */}
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
            // className="searchLabel"
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
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {(rowsPerPage > 0
                  ? schedules.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                  : schedules
                ).map((schedule) => (
                  <StyledTableRow key={schedule._id}
                    onClick={() => handleItemClick(schedule)}
                  >
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
                      {schedule.scheduledMon + ' '}{' '}
                      {schedule.scheduledTues + ' '}
                      {schedule.scheduledWed + ' '}{' '}
                      {schedule.scheduledThurs + ' '}
                      {schedule.scheduledFri + ' '}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <button className='btn btn-info  btn-sm'
                        onClick={handleEditShow}
                      >
                        <i
                          className="fa fa-hospital-o "
                          aria-hidden="true"
                          title="Edit Schedule"
                        />
                      </button>
                      <button
                        className="btn btn-danger  btn-sm"
                        onClick={handleShowDelete}
                      >
                        <i
                          title="delete visit"
                          className="fa fa-trash-o"
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
