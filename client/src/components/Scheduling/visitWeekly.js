import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { textAlign } from '@mui/system'
const VisitWeekly = (props) => {
  return (
    <>
      <tr
        className="trStyles"       
      >
        {/* style={{ display: 'flex', paddingBottom: '0px', paddingTop: '0px' }} */}
        <td style={{ width:'15%',paddingLeft: '2px', paddingRight: '2px', paddingBottom: '0px', paddingTop: '2px' }} className="weeklytd">{props.visit.hourOfVisit}</td>
        <td style={{width:'35%', paddingLeft: '2px', paddingRight: '2px',  paddingBottom: '0px', paddingTop: '2px' }} className="weeklytd">{props.visit.firstName}</td>
        <td style={{ width:'35%', paddingLeft: '2px', paddingRight: '2px',  paddingBottom: '0px', paddingTop: '2px' }} className="weeklytd">{props.visit.lastName}</td>
        <td style={{  width:'15%', paddingLeft: '4px', paddingRight: '2px',  paddingBottom: '0px', paddingTop: '0px' }} className="weeklytd">
          <Link to={`/editVisit/${props.visit._id}`}>
            <i
              className="fa fa-pencil-square-o fa-sm"
              aria-hidden="true"
              style={{ color: 'blue', paddingTop: '5px' }}
            />
          </Link>{' '}
          <i
            className="fa fa-trash fa-sm"
            aria-hidden="true"
            onClick={() => {
              props.deleteRecord(props.visit._id)
            }}
            style={{ color: 'red', paddingTop: '5px' }}
            title="Delete"
          />
        </td>
      </tr>
    </>
  )
}

export default VisitWeekly
