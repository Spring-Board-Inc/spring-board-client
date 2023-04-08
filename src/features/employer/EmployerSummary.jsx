import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shortLocalTime } from "../../helpers/Helpers";
import '../../App.css';

const EmployerSummary = ({ employer }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Img src={employer?.LogoUrl} className='JobCardImage'/>
        </Card.Header>
        <Card.Body>
            <Card.Title>{employer?.Name}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Email: {employer?.Email}</ListGroup.Item>
                <ListGroup.Item className="text-muted">Created: {new Date(employer?.CreatedAt).toDateString()}, {shortLocalTime(employer?.CreatedAt)}</ListGroup.Item>
                <ListGroup.Item className="text-muted">Updated: {new Date(employer?.UpdatedAt).toDateString()}, {shortLocalTime(employer?.UpdatedAt)}</ListGroup.Item>
                <ListGroup.Item>
                    <Link to={`${employer.Id}`} style={{float: 'right'}}>Modify</Link>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

export default EmployerSummary