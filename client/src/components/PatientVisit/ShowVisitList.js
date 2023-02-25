import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import VisitCard from '../Scheduling/VisitCard'
// import RecordCard from './RecordCard'
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



export default function ShowVisitList() {
  const [regDate, setRegFilterDate] = useState('')
  const [selectMD, setSelectMD] = useState('')
  const [visits, setVisits] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/visits')
      .then((res) => {
        setVisits(res.data)
      })
      .catch((err) => {
        console.log('Error from ShowVisitList')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/visits/${id}`)
      .then((response) => {
        setVisits(visits.filter((el) => el._id !== id))
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
  }

  const dateRegister = regDate //format(regDate, 'yyyy-MM-dd')
  const dateRegistered = dateRegister
  // console.log(selectMD.toLowerCase())
  var filteredMD = visits.filter((visit) => {
    if (selectMD === '') {
      return visit
    } else {
      return visit.provider.toString().includes(selectMD)
    }
  })

  // console.log(filteredMD)
  var filteredDat = filteredMD.filter((visit) => {
    if (dateRegistered === '') {
      return visit
    } else {
      return visit.visitDate.toString().toLowerCase().includes(dateRegistered)
    }
  })

  var filteredData = filteredDat
    .filter((visit) => {
      if (searchInput === '') {
        return visit
      } else {
        return (
          visit.medicalRecordNumber
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.visitNumber
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.firstName
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.middleName
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.lastName
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.hourOfVisit
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.email
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.provider
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          visit.addedDate
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        )
      }
    })
    .sort((a, b) => (a.visitDate + a.hourOfVisit  < b.visitDate + b.hourOfVisit  ? 1 : -1))
    // .sort((a, b) => (a.hourOfVisit < b.hourOfVisit ? 1 : -1))

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


  const [userMD, setUserMD] = useState([])
  const attendings = userMD.filter((user) => {
    return user.role.toString().toLowerCase().includes('attending')
  })

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        const data = response.data
        setUserMD(data)
      })
      .catch((error) => {
        console.log('Error from user list')
      })
  }, [])

  const providerMD = attendings.map((doc) => doc.firstName + ' ' + doc.lastName)
  return (
    <div className="grid_container" style={{ height: '100px' }}>
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>

      <div className="item3">
        <div className="item3A">
          <div className="filter_navbarLeft">
            <h4>Visit List</h4>
          </div>
          <div className=".filter_navbarlist">
            <span className="filter__search-label">Filter: </span>
            <label className="filter__search-label">
              Visit Date:
              <input
                type="date"
                className="filter__search-input"
                id="registrationDateFilter"
                value={regDate}
                onChange={(newValue) => {
                  setRegFilterDate(newValue.target.value)
                }}
              />
            </label>
            <label className="filter__search-label">
              {' '}
              Provider:
              <select
                key={visits.provider}
                className="filter__search-input"
                name="provider"
                value={visits.provider}
                onChange={(e) => {
                  setSelectMD(e.target.value)
                }}
              >
                {' '}
                <option key="Select" value="">
                  Select Provider
                </option>
                {providerMD.map((doc) => (
                  <option key={doc._id} value={doc.value}>
                    {doc}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* .filter_navbar */}
          <div className="filter_navbarRight">
            <label htmlFor="search" className="searchLabel">
              Search :{' '}
              <input
                className="searchInput"
                id="search"
                type="text"
                placeholder="Type here to search"
                onChange={handleChange}
                value={searchInput}
              />
            </label>
          </div>
        </div>
        <div className="item3B" style={{ overflowY: 'auto' }}>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">MRN</StyledTableCell>
                  <StyledTableCell align="left">Visit Number</StyledTableCell>
                  <StyledTableCell align="left">Firstname</StyledTableCell>
                  <StyledTableCell align="left">Middlename</StyledTableCell>
                  <StyledTableCell align="left">Lastname</StyledTableCell>
                  <StyledTableCell align="left">Visit Date</StyledTableCell>
                  <StyledTableCell align="left">Hour of visit</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Provider</StyledTableCell>
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
                  <StyledTableRow key={pt._id}>
                    <StyledTableCell align="left">
                      {pt.medicalRecordNumber}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.visitNumber}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.middleName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.lastName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.visitDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.hourOfVisit}
                    </StyledTableCell>
                    <StyledTableCell align="left">{pt.email}</StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.provider}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {pt.addedDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Link
                        className="btn btn-info btn-sm"
                        to={`/editVisit/${pt._id}`}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        />
                      </Link>{' '}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteRecord(pt._id)
                        }}
                      >
                        <i
                          title="delete visit"
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
                    // style={{float:'right'}}
                    rowsPerPageOptions={[
                      5,
                      15,
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
        </div>
      </div>
    </div>
  )
}
