import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Navbar from '../navigation/navbar'
import Header from '../shared/Header'
import RegistrationDetail from './RegistrationDetail'
import {
  Race,
  Gender,
  Language,
  States,
} from '../listDictionaries/listData/listDictionariesData'

function RegistrationDetails(props) {
  const [record, setRecord] = useState({
    medicalRecordNumber: '',
    visitNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    race: '',
    dateOfBirth: '',
    age: '',
    language: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    email: '',
    addedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/records/${id}`)
      .then((res) => {
        setRecord({
          medicalRecordNumber: res.data.medicalRecordNumber,
          visitNumber: res.data.visitNumber,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          middleName: res.data.middleName,
          gender: res.data.gender,
          race: res.data.race,
          dateOfBirth: res.data.dateOfBirth,
          age: res.data.age,
          language: res.data.language,
          address: res.data.address,
          city: res.data.city,
          zipCode: res.data.zipCode,
          state: res.data.state,
          email: res.data.email,
          addedDate: res.data.addedDate,
        })
      })
      .catch((err) => {
        console.log('Error from UpdateRecordInfo')
      })
  }, [id])

  return (
    <div className="grid_container">
      <div className="item1">
        <Header />
      </div>
      <div className="item2">
        <Navbar />
      </div>
      <div className="item3">
      <div className="App">
          <RegistrationDetail visit={record} key={record._id} />
        </div>
      </div>
    </div>
  )
}

export default RegistrationDetails
