import { Container, Row, Spinner } from "react-bootstrap";

const Spinners = () => {
  return (
    <Container>
        <Row className="d-flex justify-content-center" style={{alignItems: 'center'}}>
            <Spinner animation="border" variant="light" />
        </Row>
    </Container>
  )
}

export default Spinners