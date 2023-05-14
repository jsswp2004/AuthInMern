import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const UploadStaffSchedule = (props) => {
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
            .post('http://localhost:8081/api/schedules', formData, config)
            .then((res) => {
                console.log(res)

                // Push to /
                // navigate('/settingsPage')
                window.location.reload()
            })
            .catch((err) => {
                console.log('Error in uploading schedules!')
            })
        navigate('/settingsPage')
    }



    return (
        <div className="grid_containers">
            <div className="item3">
                {/* <h5 className="createPageHeader">Create Schedule</h5> */}
                <div className="createRoleModalBody">
                    {/* <label className="createPageHeader">Create Schedule</label> */}
                    <form noValidate onSubmit={onSubmit} className='formModal'>
                        <div className="form-group">
                            <input className="form-control roleInput" type="file" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadStaffSchedule
