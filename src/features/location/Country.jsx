import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Country = ({ country }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Title>{country?.Name}</Card.Title>
            <Link to={`${country?.Id}`} style={{float: 'right'}}>Modify</Link>
        </Card.Header>
    </Card>
  )
}

export default Country