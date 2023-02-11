import React from 'react'
import { Link } from 'react-router-dom'

const RecordCard = (props) => (
  <tr>
    <td id="columntable">{props.record.medicalRecordNumber}</td>
    <td id="columntable">{props.record.visitNumber}</td>
    <td id="columntable">{props.record.firstName}</td>
    <td id="columntable">{props.record.middleName}</td>
    <td id="columntable">{props.record.lastName}</td>
    <td id="columntable">{props.record.dateOfBirth}</td>
    <td id="columntable">{props.record.gender}</td>
    <td id="columntable">{props.record.age}</td>
    <td id="columntable">{props.record.race}</td>
    <td id="columntable">{props.record.addedDate}</td>
    <td id="columntable">
      <Link
        className="btn btn-secondary btn-sm" title='View Patient Details'
        to={`/registrationDetails/${props.record._id}`}
      >
        <i className="fa fa-file-text-o" aria-hidden="true"></i>
      </Link>{' '}
      <Link
        className="btn btn-success btn-sm" title='Create Visit'
        to={`/createVisit/${props.record._id}`}
      >
        <i className="fa fa-user-md" aria-hidden="true"></i>
      </Link>{' '}
      <Link
        className="btn btn-info btn-sm" title='Edit Patient'
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
        <i className="fa fa-trash-o" aria-hidden="true" title='Delete' />
      </button>
    </td>
  </tr>
)


export default RecordCard
