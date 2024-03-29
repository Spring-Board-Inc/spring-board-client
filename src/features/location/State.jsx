import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const State = ({ state }) => {
  return (
    <Link to={`/admin/location/state/${state?.Id}`} className='DeLink'>
      <Card className="mb-2">
          <Card.Header className='JobCardHeader'>
              <Card.Title>{state?.AdminArea}.</Card.Title>
              <Link to={`/admin/location/state/${state?.Id}`} style={{float: 'right'}}>Modify</Link>
          </Card.Header>
      </Card>
    </Link>
  )
}

export default State