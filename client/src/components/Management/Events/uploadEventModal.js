import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import axios from 'axios'

const UploadEvent = (props) => {

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
    // ALSO ADD RANDOM VALUE IF YOU WANT LIKE STRING , OBJECT OR      ARRAY
    // formData.append("roleDetail", {
    //   //needs to change to match the backend
    //   name: '',
    //   addedDate: '',
    // });
    // API CALL
    // fetch("http://localhost:8081/", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    // };
    axios
      .post('http://localhost:8081/api/events', formData, config
      ).then(res => {
        console.log(res);
        window.location.reload()
      })
      .catch((err) => {
        console.log('Error in uploading events!')
      })
    navigate('/settingsPage')
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
  };



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
          <div className="item2and3Conatainer">
            {/* <div className="row"> */}
            <form onSubmit={onSubmit}>
              {/* <h3>Events Upload</h3> */}
              <div className="form-group">
                <input className="form-control roleInput" type="file" onChange={onChange} />
              </div>
              {/* {console.log(setSelectedFile)} */}
              <div className="form-group">
                <button className="btn btn-primary" type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default UploadEvent
