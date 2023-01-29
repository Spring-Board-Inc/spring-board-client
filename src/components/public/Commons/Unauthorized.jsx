import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

  return (
    <Container>
        <Row className='py-5'>
            <Col sm={0} md={2} lg={4}></Col>
            <Col sm={12} md={8} lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Text className="centered"><FaBan color="red" size={26}/><span className="h3 p-1">Unauthorized.</span><FaBan color="red" size={26}/></Card.Text>
                        <Card.Text>
                            <Button className='Button' onClick={goBack}>Go Back</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={0} md={2} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default Unauthorized