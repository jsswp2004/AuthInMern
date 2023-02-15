import React from 'react'
import { Link } from 'react-router-dom'

const VisitCard = (props) => (
  <tr>
    <td id='columntable'>{props.visit.medicalRecordNumber}</td>
    <td id='columntable'>{props.visit.visitNumber}</td>
      <td id='columntable'>{props.visit.firstName}</td>
      <td id='columntable'>{props.visit.middleName}</td>
      <td id='columntable'>{props.visit.lastName}</td>
      <td id='columntable'>{props.visit.visitDate}</td>
      <td id='columntable'>{props.visit.hourOfVisit}</td>
      <td id='columntable'>{props.visit.email}</td>
      <td id='columntable'>{props.visit.provider}</td>
      <td id='columntable'>{props.visit.addedDate}</td>
      <td id='columntable'>
        <Link
          className="btn btn-info btn-sm"
          to={`/editVisit/${props.visit._id}`}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </Link>
        <Link
          className="btn btn-success btn-sm"
          to={`/detailsVisit/${props.visit._id}`}
        >
          <i className="fa fa-clipboard" aria-hidden="true" />
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            props.deleteRecord(props.visit._id)
          }}
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
      </td>
    </tr>
)
  
export default VisitCard