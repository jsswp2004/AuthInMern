import React, { useState } from 'react'
// import { useNavigate } from 'react-router'

import axios from 'axios'

const UploadEvent = (props) => {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const onChange = (e) => {
    setSelectedFile(e.target.files[0]);
    e.target.files[0] && setIsFilePicked(true);
  }

  // const navigate = useNavigate()
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
      .post('http://localhost:8081/api/events', formData, config
      ).then(res => {
        console.log(res);
        // window.location.reload()
      })
      .catch((err) => {
        console.log('Error in uploading events!')
      })
    // navigate('/settingsPage')
    // navigate('/')
    window.location.reload()

  };


  return (
    <div className="grid_containers">
      <div className="item3">
        <div className="createRoleModalBody">
          <div className="item2and3Conatainer">
            <form noValidate onSubmit={onSubmit} className='formModal'>
              <div className="form-group">
                <input className="form-control roleInput" type="file" onChange={onChange} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadEvent
