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

  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()

    // HANDLING FILE AS SENDING FILE INTO BACKEND
    if (!isFilePicked) return;
    const formData = new FormData();
    formData.append("name", selectedFile);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios
      .post('http://localhost:8081/api/roles/', formData, config
      ).then(res => {
        console.log(res);
        window.location.close()
        window.location.reload()
      })
      .catch((err) => {
        console.log('Error in uploading roles!')
      })
    navigate('/settingsPage')

  };

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
          {/* <div className="container"> */}
          <div className="item2and3Conatainer">
            {/* added action 5/5*/}
            <form action='uploadRole' noValidate onSubmit={onSubmit} className='formModal' >
              {/* method='post'<h3>Roles Upload</h3> encType="multipart/form-data"*/}
              <div className="form-group">
                <input className="form-control roleInput" type="file" onChange={onChange} />

              </div>
              {/* {console.log(setSelectedFile)} */}
              <div className="form-group">
                <button className="btn btn-primary" type="submit">Upload</button>
              </div>
            </form>
          </div>
          {/* </div> */}

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
