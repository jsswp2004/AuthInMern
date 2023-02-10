import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import EditRole from './editRole'

const Role = (props) => {
  // Define the state with useState hook
  // const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)


  // const navigate = useNavigate()
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   // setSearchInput(e.target.value)
  //   // alert('Create role button clicked')
  //   setShow(false)
  //   navigate('/rolesList')
  // }

  // function displayEditModal(id) {
  //   return <EditRoleModal />
  // }
  return (
    <>
      {/* <div>{displayEditModal()}</div> */}
      <tr>
        <td id="columntable">{props.role.name}</td>
        <td id="columntable">
          {/* <Link
              className="btn btn-success btn-sm" title='Create Visit'
              to={`/createRole/${props.record._id}`}
            >
              <i className="fa fa-user-md" aria-hidden="true"></i>
            </Link>{' '} */}
          {/* <Button
            className="btn btn-info btn-sm roleCreateBtn"
            variant="primary"
            onClick={handleShow}
          >
            <i className="fa fa-plus" aria-hidden="true" title="Add role"></i>
          </Button> */}
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
