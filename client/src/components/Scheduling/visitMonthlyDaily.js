import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
// import { textAlign } from '@mui/system'
const VisitMonthDaily = (props) => {
  return (
    <div className="visitMonthDayContainer">
      <div className="visitMonthDayContainerItem">
        <span>
          {props.visit.hourOfVisit} {props.visit.firstName}{' '}
          {props.visit.lastName}
        </span>
      </div>
      <div className="visitMonthDayContainerItemAction">
        <Link to={`/editVisit/${props.visit._id}`}>
          <i
            className="fa fa-pencil-square-o fa-sm"
            aria-hidden="true"
            style={{ color: 'blue', paddingTop: '5px' }}
          />
        </Link>
        <Link to={`/detailsVisit/${props.visit._id}`}>
          <i
            className="fa fa-clipboard fa-sm"
            aria-hidden="true"
            style={{ color: 'green', paddingTop: '5px', paddingLeft: '3px' }}
          />
        </Link>{' '}
        <span>
          <i
            className="fa fa-trash fa-sm"
            aria-hidden="true"
            onClick={() => {
              props.deleteRecord(props.visit._id)
            }}
            style={{ color: 'red', paddingTop: '5px' }}
            title="Delete"
          />
        </span>
      </div>
    </div>
  )
}

export default VisitMonthDaily
