import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import PatientDetail from '../Scheduling/PatientDetails'


function UpdateVisitInfo(props) {
    const [visit, setVisit] = useState({
        medicalRecordNumber: '',
        visitNumber: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        visitDate: '',
        provider: '',
        cellphone: '',
    })

    const { id } = useParams()
    const visitID = props.visitID

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/visits/${visitID}`)
            .then((res) => {
                setVisit({
                    medicalRecordNumber: res.data.medicalRecordNumber,
                    visitNumber: res.data.visitNumber,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    middleName: res.data.middleName,
                    email: res.data.email,
                    addedDate: res.data.addedDate,
                    visitDate: res.data.visitDate,
                    hourOfVisit: res.data.hourOfVisit,
                    provider: res.data.provider,
                    cellphone: res.data.cellphone,
                })
            })
            .catch((err) => {
                console.log('Error from UpdateVisitInfo')
            })
    }, [id])


    return (
        <div className="grid_containers">
            <div className="item3">
                <div className="App">
                    <PatientDetail visit={visit} key={visit._id} />
                </div>
            </div>
        </div>
    )
}

export default UpdateVisitInfo
