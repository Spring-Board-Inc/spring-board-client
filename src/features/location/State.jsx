import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const State = ({ state }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Title>{state?.AdminArea}, {state?.Country}.</Card.Title>
            <Link to={`${state?.Id}`} style={{float: 'right'}}>Modify</Link>
        </Card.Header>
    </Card>
  )
}

export default State