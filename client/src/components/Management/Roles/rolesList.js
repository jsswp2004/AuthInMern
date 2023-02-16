import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import EditRole from './editRole'

const Role = (props) => {

  return (
    <>
      <tr>
        <td id="columntable">{props.role.name}</td>
        <td id="columntable">
          <Link
            className="btn btn-info btn-sm"
            to={`/editRole/${props.role._id}`}
          >
            <i className="fa fa-pencil-square-o fa-sm" aria-hidden="true" />
          </Link>{' '}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              props.deleteRecord(props.role._id)
            }}
          >
            <i className="fa fa-trash-o fa-sm" aria-hidden="true" />
          </button>
        </td>
      </tr>
    </>
  )
}
export default Role
