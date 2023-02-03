import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// const [show, setShow] = useState(false)
// const handleClose = () => setShow(false)
// const handleShow = () => setShow(true)
const RecordCard = (props) => (
    
    <tr>
      <td>{props.record.medicalRecordNumber}</td>
      <td>{props.record.visitNumber}</td>
      <td>{props.record.firstName}</td>
      <td>{props.record.middleName}</td>
      <td>{props.record.lastName}</td>
      <td>{props.record.dateOfBirth}</td>
      <td>{props.record.gender}</td>
      <td>{props.record.age}</td>
      <td>{props.record.race}</td>
      <td>{props.record.addedDate}</td>
      <td>
        {/* <Link
          className="btn btn-success btn-sm"
          to={`/createvisitmodal/${props.record._id}`}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </Link>{' '} */}
        <button
        
          className="btn btn-success btn-sm"
          onClick={props.handleShow}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        
        </button>
        <Link
          className="btn btn-info btn-sm"
          to={`/editPatient/${props.record._id}`}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </Link>{' '}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            props.deleteRecord(props.record._id)
          }}
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
      </td>
    </tr>
)
  
export default RecordCard