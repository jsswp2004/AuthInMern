import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import EditVisitModal from '../Scheduling/editVisitModal'
import DetailVisitModal from '../PatientVisit/detailsPatientVisitModal'
const VisitMonthDaily = (props) => {
  //#region for setting the ID of the provider for the property
  const handleItemClick = item => {
    const patID = item._id
    setVisitID(patID)
    handleEditVisitShow()
  }
  //#endregion
  //#region Define patient ID for create visit from registration modal
  const [visitID, setVisitID] = useState('')
  //#endregion
  //#region Edit Visit Modal from Registration
  const ShowEditVisitModal = () => (
    <>
      <Modal show={showEditVisit} onHide={handleEditVisitClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Edit Visit</Modal.Title>
          <Button variant="secondary" onClick={handleEditVisitClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <EditVisitModal visitID={visitID} />
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleVisitClick}>
              Close
            </Button>
          </Modal.Footer> */}
      </Modal>
    </>
  )

  //Function to display create visit from registration modal
  function displayEditVisitModal() {
    return <ShowEditVisitModal />
  }
  //Define the state for edit visit from registration modal 
  const [showEditVisit, setEditVisitShow] = useState(false)
  const handleEditVisitClose = () => setEditVisitShow(false)
  const handleEditVisitShow = () => {
    setEditVisitShow(true)
  }

  const handleEditVisitClick = (e) => {
    e.preventDefault()
    setEditVisitShow(false)
  }


  //#endregion
  //#region for Visit Details Modal
  const ShowDetailVisitModal = () => (
    <>
      <Modal show={showDetailVisit} onHide={handleDetailVisitClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Visit Details</Modal.Title>
          <Button variant="secondary" onClick={handleDetailVisitClick}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <DetailVisitModal visitID={visitID} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleVisitClick}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )

  //Function to display create visit from registration modal
  function displayDetailVisitModal() {
    return <ShowDetailVisitModal />
  }

  //Define the state for edit visit from registration modal 
  const [showDetailVisit, setDetailVisitShow] = useState(false)
  const handleDetailVisitClose = () => setDetailVisitShow(false)
  const handleDetailVisitShow = () => {
    setDetailVisitShow(true)
  }

  const handleDetailVisitClick = (e) => {
    e.preventDefault()
    setDetailVisitShow(false)
  }

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
          <Button variant="danger" onClick={() => deleteRecord(visitID)}>

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
  //#region Pull all visits from the database
  const [visits, setVisits] = useState([])
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
  //#endregion
  //#region Delete visit function
  // const navigate = useNavigate()
  const deleteRecord = (id) => {
    id = visitID
    axios
      .delete(`http://localhost:8081/api/visits/${id}`)
      .then((response) => {
        setVisits(visits.filter((el) => el._id !== id))
        window.location.reload()
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
    // navigate('/clinicVisit')
  }
  //#endregion
  return (
    <div title='select to update' className="visitMonthDayContainer" >

      <div>{displayEditVisitModal()}</div>
      <div>{displayDeleteRegistrationModal()}</div>
      <div>{displayDetailVisitModal()}</div>
      <div className="visitMonthDayContainerItem" onClick={() => handleItemClick(props.visit)}>

        <span className="visitMonthDayContainerItemSpan">{props.visit.hourOfVisit} {props.visit.firstName}{' '}
          {props.visit.lastName}
        </span>
        {/* this is hidden and displays on hover */}
        <div className="visitMonthDayContainerItems" >
          <ul>
            <li>{props.visit.email}</li>
            <li>Provider: {props.visit.provider}</li>
            <li>Event: {props.visit.event}</li>
            <li>{'cellphone'}</li>

          </ul>
        </div>
      </div>

      <div className="visitMonthDayContainerItemAction" onClick={() => setVisitID(props.visit._id)}>
        <span>
          <i
            className="fa fa-pencil fa-sm "
            aria-hidden="true"
            title='edit visit'
            style={{ color: '#72bcd4', paddingTop: '5px', paddingLeft: '3px' }}
            onClick={() => { handleEditVisitShow(visitID) }}
          />
        </span>

        <span>
          <i
            className="fa fa-pencil-square-o fa-sm"
            aria-hidden="true"
            title='Visit details'
            onClick={() => { handleDetailVisitShow(props.visit._id) }}
            style={{ paddingTop: '5px', marginLeft: '5px' }}
          />
        </span>


        <span>
          <i
            className="fa fa-trash fa-sm"
            aria-hidden="true"
            onClick={
              // () => {
              // props.deleteRecord(props.visit._id)
              // }
              handleShowDelete
            }
            style={{ color: 'red', paddingTop: '5px' }}
            title="Delete"
          />
        </span>
      </div>


    </div>
  )
}

export default VisitMonthDaily
