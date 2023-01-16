import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { format } from 'date-fns'
// import moment from 'moment'

// export default function Visit(props) {

const Visit = (props) => (
  <tr>
    <td>
      {/* {moment(props.visit.visitDate).utc().format('MM/DD/YYYY')} */}
      {format(props.visit.visitDate, 'MM/dd/yyyy')}
    </td>
    {/* <td>
      {props.visit.visitDate}
    </td> */}
    <td>{props.visit.hourOfVisit}</td>
    <td>{props.visit.firstName}</td>
    <td>{props.visit.middleName}</td>
    <td>{props.visit.lastName}</td>
    <td>{props.visit.email}</td>
    <td>{props.visit.provider}</td>
    <td>
      {/* {props.visit.addedDate */}
    {format(props.visit.addedDate, 'MM/dd/yyyy')}
  </td>
    <td>
      <Link
        className="btn btn-info btn-sm"
        to={`/editVisit/${props.visit._id}`}
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true" />
      </Link>{' '}
      <Button
        size="sm"
        className="btn btn-danger btn-sm"
        onClick={() => {
          props.deleteRecord(props.visit._id)
        }}
      >
        <i className="fa fa-trash-o " aria-hidden="true" />
      </Button>
    </td>
  </tr>
)

// }
export default Visit
