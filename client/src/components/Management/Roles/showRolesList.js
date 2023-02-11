import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Role from './rolesList'
import axios from 'axios'
import Navbar from '../../navigation/navbar'
import Header from '../../shared/Header'
import { Modal, Button } from 'react-bootstrap'
import CreateRole from './createRoleModal'

const ShowRolesList = () => {
  // Define the state with useState hook
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [roles, setRoles] = useState([])
  // const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')
  //captures and sets value of the search input text
  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    // setSearchInput(e.target.value)
    // alert('Create role button clicked')
    setShow(false)
    navigate('/rolesList')
  }

  // console.log(roles)
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/roles')
      .then((res) => {
        // const data = response.data
        setRoles(res.data)
      })
      .catch((error) => {
        console.log('Error from roles list')
      })
  }, [])

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:8081/api/roles/${id}`)
      .then((res) => {
        setRoles(roles.filter((el) => el._id !== id))
        console.log('Role successfully deleted!')
      })
      .catch((error) => {
        console.log('Unable to delete visit')
      })
  }
  // console.log('roles', roles)
  const RoleModal = () => (
    <>
      <Modal show={show} onHide={handleClose} size="med" centered>
        <Modal.Header>
          <Modal.Title>Add a Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateRole />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
  // console.log(show)
  function displayVisitModal() {
    return <RoleModal />
  }

  function roleList() {
    return roles
      .filter((role) => {
        if (searchInput === '') {
          return role
        } else if (
          role.role.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return role
        }
      })
      .map((currentrole, i) => {
        return <Role role={currentrole} deleteRecord={deleteRecord} key={i} />
      })
  }

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>

      <div className="item3">
        <div className="roleItemContainer">
          <div className="roleItemContainerBox">
            <div className="item3A">
              <h5 className="createPageHeader">Roles</h5>

              <div>{displayVisitModal()}</div>
              <Button
                className="btn btn-info btn-sm roleCreateBtn"
                variant="primary"
                onClick={handleShow}
              >
                {/* <i
                  className="fa fa-plus"
                  aria-hidden="true"
                  title="Add role"
                ></i> */}
                Add Role
              </Button>
              <label htmlFor="search" className="searchLabel">
                Search :{' '}
                <input
                  id="search"
                  type="text"
                  placeholder="Search roles"
                  onChange={handleChange}
                  value={searchInput}
                />
              </label>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{roleList()}</tbody>
              </table>

            </div>
          </div>
        </div>
        <div className="roleItemContainerBox"></div>
      </div>
    </div>
  )
}

export default ShowRolesList
