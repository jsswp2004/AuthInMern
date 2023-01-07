import React from 'react'
import { Link } from 'react-router-dom'


const User = (props) => (
    <tr>
      <td>{props.user.firstName}</td>
      <td>{props.user.middleName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.email}</td>
      <td>{props.user.role}</td>
      <td>{props.user.addedDate}</td>
      <td>
        <Link className="btn btn-info btn-sm" to={`/edit/${props.user._id}`}>
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </Link>{' '}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            props.deleteRecord(props.user._id)
          }}
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
        </button>
      </td>
    </tr>
  )
    

export default User