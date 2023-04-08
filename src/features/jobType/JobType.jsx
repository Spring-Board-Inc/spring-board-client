import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const JobType = ({ jobType }) => {
  return (
    <Link to={`${jobType?.Id}`} className='DeLink'>
      <Card className="mb-2">
          <Card.Header className='JobCardHeader'>
              <Card.Title>{jobType?.JobType}</Card.Title>
              <Link to={`${jobType?.Id}`} style={{float: 'right'}}>Details</Link>
          </Card.Header>
      </Card>
    </Link>
  )
}

export default JobType