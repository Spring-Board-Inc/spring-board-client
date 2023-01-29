import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSkill = ({ skill }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Title>{skill?.Description}.</Card.Title>
            <Link to={`${skill?.Id}`} style={{float: 'right'}}>Details</Link>
        </Card.Header>
    </Card>
  )
}

export default AdminSkill