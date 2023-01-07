import React from 'react'
import { Link } from 'react-router-dom'


const User = (props) => (
    <tr>
      <td id="columntable">{props.user.firstName}</td>
      {/* <td id="columntable">{props.user.middleName}</td> */}
      <td id="columntable">{props.user.lastName}</td>
      <td id="columntable">{props.user.email}</td>
      <td id="columntable">{props.user.role}</td>
      <td id="columntable">{props.user.addedDate}</td>
      <td id="columntable">
        <Link className="btn btn-info btn-sm" to={`/editUser/${props.user._id}`}>
          <i className="fa fa-pencil-square-o fa-sm" aria-hidden="true" />
        </Link>{' '}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            props.deleteRecord(props.user._id)
          }}
        >
          <i className="fa fa-trash-o fa-sm" aria-hidden="true" />
        </button>
      </td>
    </tr>
  )


export default User