import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const JobType = ({ jobType }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Title>{jobType?.JobType}</Card.Title>
            <Link to={`${jobType?.Id}`} style={{float: 'right'}}>Details</Link>
        </Card.Header>
    </Card>
  )
}

export default JobType