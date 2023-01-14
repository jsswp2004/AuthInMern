import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { textAlign } from '@mui/system'
const VisitWeekly = (props) => {
  return (
    <div>
      {/* visitDate={props.visit.visitDate} */}
      <tr
        className="trStyles"
        style={{ display: 'flex', paddingBottom: '0px', paddingTop: '0px'}}
      >
        {/* style={{ display: 'flex' }} */}
        {/* <td className="weeklytd">{props.visit.visitDate}</td> */}
        <div>
          {/* style={{ float: 'left' }} */}
          <td className="weeklytd">{props.visit.hourOfVisit}</td>
        </div>
        <div>
          <td className="weeklytd">{props.visit.firstName}</td>
        </div>
        <div>
          <td className="weeklytd">{props.visit.lastName}</td>
        </div>

        <div style={{ float: 'right' }}>
          {/* style={{ position: 'absolute', }} */}
          <Link
            // className="btn btn-info btn-sm"
            to={`/visit/editVisit/${props.visit._id}`}
          >
            <i
              className="fa fa-pencil-square-o fa-sm"
              aria-hidden="true"
              style={{ color: 'blue', paddingTop: '5px' }}
            />
          </Link>{' '}
          <td className="weeklytd">
            <i
              className="fa fa-trash fa-sm"
              aria-hidden="true"
              onClick={() => {
                props.deleteVisit(props.visit._id)
              }}
              style={{ color: 'red', paddingTop: '5px' }}
              title="Delete"
            />
          </td>
        </div>
      </tr>
    </div>
  )
}

export default VisitWeekly
