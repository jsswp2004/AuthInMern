import React from 'react'
import { Link } from 'react-router-dom'

const VisitCard = (props) => (
    <tr>
      <td>{props.visit.firstName}</td>
      <td>{props.visit.middleName}</td>
      <td>{props.visit.lastName}</td>
      <td>{props.visit.visitDate}</td>
      <td>{props.visit.hourOfVisit}</td>
      <td>{props.visit.email}</td>
      <td>{props.visit.provider}</td>
      <td>{props.visit.addedDate}</td>
      <td>
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