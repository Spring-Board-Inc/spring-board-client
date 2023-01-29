import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shortDateTime, shortLocalTime } from "../../helpers/Helpers";
import '../../App.css';

const EmployerSummary = ({ employer }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Img src={employer?.LogoUrl} className='JobCardImage'/>
            <Card.Title>{employer?.Name}</Card.Title>
        </Card.Header>
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>Email: {employer?.Email}</ListGroup.Item>
                <ListGroup.Item className="text-muted">Created: {shortDateTime(employer?.CreatedAt)}, {shortLocalTime(employer?.CreatedAt)}</ListGroup.Item>
                <ListGroup.Item className="text-muted">Updated: {shortDateTime(employer?.UpdatedAt)}, {shortLocalTime(employer?.UpdatedAt)}</ListGroup.Item>
                <ListGroup.Item>
                    <Link to={`${employer.Id}`} style={{float: 'right'}}>Modify</Link>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

export default EmployerSummary