import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Close = () => {
    const message = 'Registration successful. Please check your mailbox to confirm your email address.';

    const closeTab = () => {
        window.open("about:blank", "_self");
        window.close();
      };

    return (
        <Container>
            <Row className='mt-5 Main'>
                <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Text>{message}</Card.Text>
                            <Card.Text>
                                <Button className='Button' onClick={closeTab}>Close Tab</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={0} md={2} lg={4}></Col>
            </Row>
        </Container>
    )
}

export default Close