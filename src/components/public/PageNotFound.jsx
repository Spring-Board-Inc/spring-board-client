import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    const goHome = () => navigate('/');
  return (
    <Container>
            <Row className='py-5'>
                <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4}>
                    <Card className="ConfirmEmail">
                        <Card.Body>
                            <Card.Text className='text-danger fw-bold text-center'>404</Card.Text>
                            <Card.Text className="text-muted fw-bold text-center">Page Not Found</Card.Text>
                            <Card.Text>
                                <Button className='Button' onClick={goHome}>Go Home</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={0} md={2} lg={4}></Col>
            </Row>
    </Container>
  )
}

export default PageNotFound