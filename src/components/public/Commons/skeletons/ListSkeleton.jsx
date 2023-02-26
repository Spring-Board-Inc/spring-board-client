import './Skeleton.css';
import { Row, Container, Col, Card } from 'react-bootstrap';

const ListSkeleton = ({ height }) => {
  return (
    <Container className='mt-3'>
        <Row>
            <Col md={12} lg={6} className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
            <Col md={12} lg={6} className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ListSkeleton