import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ShowDeleteModal() { 

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
            {/* <Button variant="danger" onClick={() => deleteRecord(props.visitID)}>
              Delete
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    )
  
    //Function to display delete registration modal
    function displayDeleteModal() {
      return <DeleteVisitModal />
    }
}
