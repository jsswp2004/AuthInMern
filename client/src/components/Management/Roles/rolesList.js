import React from 'react'
import { Link } from 'react-router-dom'

const Role = (props) => (
  <div>
    <div>{props.role._id} {props.role.name}</div>
    <div>{props.role.name}</div>
  </div>
  // <tr>
  //   <td id="columntable">{props.role.name}</td>
  //   <td id="columntable">
  //     <Link className="btn btn-info btn-sm" to={`/editrole/${props.role._id}`}>
  //       <i className="fa fa-pencil-square-o fa-sm" aria-hidden="true" />
  //     </Link>{' '}
  //     <button
  //       className="btn btn-danger btn-sm"
  //       onClick={() => {
  //         props.deleteRecord(props.role._id)
  //       }}
  //     >
  //       <i className="fa fa-trash-o fa-sm" aria-hidden="true" />
  //     </button>
  //   </td>
  // </tr>
)

export default Role
