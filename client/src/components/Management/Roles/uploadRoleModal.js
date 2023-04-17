import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'

import axios from 'axios'

const UploadRole = (props) => {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const onChange = (e) => {
    setSelectedFile(e.target.files[0]);
    e.target.files[0] && setIsFilePicked(true);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // HANDLING FILE AS SENDING FILE INTO BACKEND
    if (!isFilePicked) return;
    const formData = new FormData();
    formData.append("File", selectedFile);
    // ALSO ADD RANDOM VALUE IF YOU WANT LIKE STRING , OBJECT OR      ARRAY
    formData.append("roleDetail", {
      //needs to change to match the backend
      name: '',
      addedDate: '',
    });
    // API CALL
    fetch("http://localhost:8081/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // axios
  //   .post('http://localhost:8081/api/roles', role)
  //   .then((res) => {
  //     setRole({
  //       name: '',
  //       addedDate: format(new Date(), 'yyyy-MM-dd'),
  //     })
  //     // window.location.reload()
  //     // setShow(false)
  //     // Push to /
  //     // navigate('/settingsPage')
  //   })
  //   .then((result) => {
  //     console.log("Success:", result);
  //   })
  //   .catch((err) => {
  //     // console.log('Error in CreateRole!')
  //     console.error("Error:", err);
  //   })
  // }

  //
  // const navigate = useNavigate()
  // const [role, setRole] = useState({
  //   name: '',
  //   addedDate: format(new Date(), 'yyyy-MM-dd'),
  // })



  // const onChange = (e) => {
  //   setRole({ ...role, [e.target.name]: e.target.value })
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   axios
  //     .post('http://localhost:8081/api/roles', role)
  //     .then((res) => {
  //       setRole({
  //         name: '',
  //         addedDate: '',
  //       })
  //       window.location.reload()
  //       // setShow(false)
  //       // Push to /
  //       navigate('/settingsPage')
  //     })
  //     .catch((err) => {
  //       console.log('Error in CreateRole!')
  //     })
  // }

  return (
    <div className="grid_containers">
      <div className="item3">

        <div className="createRoleModalBody">
          {/* <div className="App">
            <input type="file" name="file" onChange={onChange} />
            <div>
              <button onClick={onSubmit}>Submit</button>
            </div>
            {isFilePicked ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div>
                <p>Select a file</p>
              </div>
            )}
          </div> */}
          <div className="container">
            <div className="row">
              <form>
                <h3>React File Upload</h3>
                <div className="form-group">
                  <input type="file" />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">Upload</button>
                </div>
              </form>
            </div>
          </div>

          {/* <p>Use the form below to upload a list of roles.
            Click <a href="/template">here</a> for an example template.</p> */}
          {/* <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Role
                <input
                  type="text"
                  className="form-control roleInput"
                  name="name"
                  value={role.name}
                  onChange={onChange}
                />
              </label>
              <div className="form-group">
                <label htmlFor="addedDate">Date Created
                  <input
                    type="text"
                    className="form-control roleInput"
                    name="addedDate"
                    value={role.addedDate}
                    onChange={onChange}
                  />
                  <input value="Add" type="submit" className="btn btn-success updateRegistrationBtn" />
                </label>
              </div>
            </div>
          </form> */}
          {/* <form action="/" method="POST" encType="multipart/form-data">

            <label for="roleName">
              <input className="form-control roleInput" type="file" id="roleName" name="file" accept="*.csv" />
            </label>
            <br /><br />
            <input className='btn btn-info' type="submit" value="Upload Authors" />
          </form> */}
        </div>
      </div>
    </div>
  )
}

export default UploadRole
