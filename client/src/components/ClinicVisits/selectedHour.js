import axios from 'axios'
import React, { useState, useEffect } from 'react'

const ShowHourlySchedule = (props) => {
  const [visit, setVisits] = useState([])
  const selectedMD = props.selectedProvider
  const selectedDate = props.visitDate
//   const selectedHour = props.hourOfVisit
  const filteredVisitsWithMD = visit.filter((visit) => {
    return visit.provider === selectedMD && visit.visitDate === selectedDate //selectedDate props.visitDate selectedMD
    //&& visit.hourOfVisit === selectedHour
  })
console.log(visit)
  const filteredVisitsWithMDAndDate = filteredVisitsWithMD.map((doc) => doc.hourOfVisit)

//   const checkedValueInArray = filteredVisitsWithMDAndDate.includes(selectedHour)

console.log(filteredVisitsWithMDAndDate)
  useEffect(() => {
    axios
      .get('http://localhost:8081/api/visits')
      .then((response) => {
        const data = response.data
        setVisits(data)
      })
      .catch((error) => {
        console.log('Error from visit list')
      })
  }, [])

  return (
    <div>
      <div>
        <span>Visit date: {props.visitDate} </span>
      </div>
      <div className='hour-flex'>

        <div className='hour-flex_Item' style={{backgroundColor: filteredVisitsWithMDAndDate.includes('09:00') ? '#90EE90' : 'white'}}>9:00</div>
        <div className='hour-flex_Item' style={{backgroundColor: filteredVisitsWithMDAndDate.includes('09:15') ? '#90EE90' : 'white'}}>9:15</div>
        <div className='hour-flex_Item'>9:30</div>
        <div className='hour-flex_Item'>9:45</div>
        <div className='hour-flex_Item'>10:00</div>
        <div className='hour-flex_Item'>10:15</div>
        <div className='hour-flex_Item'>10:30</div>
        <div className='hour-flex_Item'>10:45</div>
        <div className='hour-flex_Item'>11:00</div>
        <div className='hour-flex_Item'>11:15</div>
        <div className='hour-flex_Item'>11:30</div>
        <div className='hour-flex_Item'>11:45</div>
        <div className='hour-flex_Item'>12:00</div>
        <div className='hour-flex_Item'>12:15</div>
        <div className='hour-flex_Item'>12:30</div>
        <div className='hour-flex_Item'>12:45</div>
        <div className='hour-flex_Item'>13:00</div>
        <div className='hour-flex_Item'>13:15</div>
        <div className='hour-flex_Item'>13:30</div>
        <div className='hour-flex_Item'>13:45</div>
        <div className='hour-flex_Item'>14:00</div>
        <div className='hour-flex_Item'>14:15</div>
        <div className='hour-flex_Item'>14:30</div>
        <div className='hour-flex_Item'>14:45</div>
        <div className='hour-flex_Item'>15:00</div>
        <div className='hour-flex_Item'>15:15</div>
        <div className='hour-flex_Item'>15:30</div>
        <div className='hour-flex_Item'>15:45</div>
        <div className='hour-flex_Item'>16:00</div>
        <div className='hour-flex_Item'>16:15</div>
        <div className='hour-flex_Item'>16:30</div>
        <div className='hour-flex_Item'>16:45</div>
        <div className='hour-flex_Item'>17:00</div>
        <div className='hour-flex_Item'>17:15</div>
        <div className='hour-flex_Item'>17:30</div>
        <div className='hour-flex_Item'>17:45</div>
      </div>
    </div>

  )
}

export default ShowHourlySchedule

//create react code to check value in array and if it is in array then change color of div
