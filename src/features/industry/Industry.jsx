import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Industry = ({ industry }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Title>{industry?.Industry}</Card.Title>
            <Link to={`${industry?.Id}`} style={{float: 'right'}}>Details</Link>
        </Card.Header>
    </Card>
  )
}

export default Industry